// Does GitHub actually enforce what .github/rulesets/master.json says it does?
//
//   node scripts/verify-branch-protection.cjs
//
// Why this exists. Branch protection is the one part of this project's setup
// that lives ENTIRELY outside the repository. The JSON file in .github/rulesets
// is a description of a setting held on github.com, and nothing stops the two
// from disagreeing: the file can be edited and never applied, or the ruleset can
// be switched to "evaluate", given a bypass actor, or deleted outright, and the
// repo would look exactly the same. It is the same class of hazard as the
// Cloudflare build command that CLAUDE.md warns about, for the same reason -- a
// setting nobody can see from here, whose failure mode is silence.
//
// So this compares INTENT (the committed file) against STATE (the live API) and
// fails when they differ. It reads the public rulesets endpoint, which needs no
// credentials on a public repository; it uses GITHUB_TOKEN when one is in the
// environment, purely to avoid the 60-per-hour unauthenticated rate limit that
// shared CI runners bump into.
//
// WHAT COUNTS AS WHICH OUTCOME
//   ruleset missing, inactive, weakened or drifted  -> exit 1. A real defect.
//   network unreachable, rate limited, API 5xx      -> exit 0, loudly. That is
//     not a statement about the ruleset, and failing every run because GitHub
//     had a bad minute is how a gate gets switched off. Same rule as the
//     missing bundle in measure-content.cjs.
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const SPEC = path.join(ROOT, '.github/rulesets/master.json');
const OWNER = 'HarshitRawat11';
const REPO = 'Procedo';

const spec = JSON.parse(fs.readFileSync(SPEC, 'utf8'));
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';

/* -- OFFLINE FIXTURE, for testing this script itself. --------------------------
   Every branch below reports on a setting held somewhere else, so the only way
   to exercise "enforcement is evaluate", "a bypass actor was added" or "the
   required context was renamed" is to feed it those answers. Four measurement
   scripts in this repo have shipped confidently wrong, so the comparison logic
   gets tested rather than trusted.

   PROCEDO_RULESET_FIXTURE=<file> makes api() read from a JSON object keyed by
   request path instead of the network. It is a test seam and nothing else --
   CI does not set it, and a fixture cannot make a real run pass. */
const FIXTURE = process.env.PROCEDO_RULESET_FIXTURE
  ? JSON.parse(fs.readFileSync(process.env.PROCEDO_RULESET_FIXTURE, 'utf8'))
  : null;

function api(p) {
  if (FIXTURE) {
    const hit = FIXTURE[p];
    if (!hit) return Promise.resolve({ status: 404, body: '{}' });
    return Promise.resolve({ status: hit.status, body: JSON.stringify(hit.body) });
  }
  return new Promise((resolve) => {
    const headers = {
      'User-Agent': 'procedo-verify-branch-protection',
      Accept: 'application/vnd.github+json',
    };
    if (token) headers.Authorization = 'Bearer ' + token;
    const req = https.get({ host: 'api.github.com', path: p, headers }, (res) => {
      let body = '';
      res.on('data', (d) => (body += d));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', (e) => resolve({ status: 0, body: String(e.message) }));
    req.setTimeout(15000, () => {
      req.destroy();
      resolve({ status: 0, body: 'timed out after 15s' });
    });
  });
}

function skip(why) {
  console.log('\nBRANCH PROTECTION -- NOT CHECKED. This run proves nothing either way.\n');
  console.log('  ' + why);
  console.log('\n  The ruleset may be correct, missing or weakened; this run did not');
  console.log('  reach github.com to find out. Check it by hand at:');
  console.log('  https://github.com/' + OWNER + '/' + REPO + '/settings/rules\n');
  process.exit(0);
}

const fails = [];
const notes = [];

(async () => {
  const repo = await api('/repos/' + OWNER + '/' + REPO);
  if (repo.status === 0) skip('Could not reach api.github.com: ' + repo.body);
  if (repo.status === 403 || repo.status === 429) skip('Rate limited by the API (HTTP ' + repo.status + ').');
  if (repo.status >= 500) skip('The API returned HTTP ' + repo.status + '.');
  if (repo.status !== 200) {
    console.error('\nFAIL: GET /repos/' + OWNER + '/' + REPO + ' returned HTTP ' + repo.status + '.');
    console.error('The repository is private, renamed or gone. Nothing below could be checked.\n');
    process.exit(1);
  }
  const defaultBranch = JSON.parse(repo.body).default_branch;

  const list = await api('/repos/' + OWNER + '/' + REPO + '/rulesets');
  if (list.status === 0 || list.status === 403 || list.status === 429 || list.status >= 500) {
    skip('The rulesets endpoint returned HTTP ' + list.status + '.');
  }
  if (list.status !== 200) {
    console.error('\nFAIL: GET .../rulesets returned HTTP ' + list.status + '.\n');
    process.exit(1);
  }

  const summaries = JSON.parse(list.body).filter((r) => r.target === 'branch');
  const named = summaries.filter((r) => r.name === spec.name);

  if (!named.length) {
    console.error('\nFAIL -- BRANCH PROTECTION IS NOT APPLIED.\n');
    console.error('  No branch ruleset named "' + spec.name + '" exists on ' + OWNER + '/' + REPO + '.');
    if (summaries.length) {
      console.error('  Branch rulesets that DO exist: ' + summaries.map((r) => r.name).join(', '));
      console.error('  If one of those replaced it, rename it or update the committed spec.');
    } else {
      console.error('  There are no branch rulesets at all. Pushes to ' + defaultBranch + ' are unrestricted.');
    }
    console.error('\n  Apply it with:');
    console.error('    gh api --method POST /repos/' + OWNER + '/' + REPO + '/rulesets --input .github/rulesets/master.json\n');
    process.exit(1);
  }

  const detail = await api('/repos/' + OWNER + '/' + REPO + '/rulesets/' + named[0].id);
  if (detail.status !== 200) skip('Could not read the ruleset detail (HTTP ' + detail.status + ').');
  const live = JSON.parse(detail.body);

  // -- enforcement. "evaluate" is the trap: the UI shows a configured ruleset,
  //    the API reports every rule, and nothing at all is blocked.
  if (live.enforcement !== 'active') {
    fails.push('enforcement is "' + live.enforcement + '", not "active" -- the rules are recorded but NOT enforced');
  }

  // -- coverage. ~DEFAULT_BRANCH and refs/heads/<default> are both correct.
  const inc = ((live.conditions || {}).ref_name || {}).include || [];
  const covers =
    inc.includes('~ALL') || inc.includes('~DEFAULT_BRANCH') || inc.includes('refs/heads/' + defaultBranch);
  if (!covers) {
    fails.push('the ruleset does not cover ' + defaultBranch + ' (include: ' + JSON.stringify(inc) + ')');
  }

  // -- bypass. A single bypass actor on a repo with one contributor makes the
  //    whole thing advisory, which is the outcome this was set up to avoid.
  const bypass = live.bypass_actors || [];
  const wantBypass = spec.bypass_actors || [];
  if (bypass.length !== wantBypass.length) {
    fails.push(
      bypass.length +
        ' bypass actor(s) configured, the committed spec expects ' +
        wantBypass.length +
        ' -- anyone listed can push straight past every rule below',
    );
  }

  const liveRules = new Map((live.rules || []).map((r) => [r.type, r.parameters || {}]));
  for (const want of spec.rules) {
    if (!liveRules.has(want.type)) fails.push('rule "' + want.type + '" is in the spec but not on GitHub');
  }

  // -- the status check. Getting this wrong does not weaken protection, it
  //    DEADLOCKS it: a context nobody ever reports leaves every PR waiting.
  const rsc = liveRules.get('required_status_checks');
  if (rsc) {
    const want = (spec.rules.find((r) => r.type === 'required_status_checks') || {}).parameters
      .required_status_checks;
    const got = rsc.required_status_checks || [];
    for (const w of want) {
      const hit = got.find((g) => g.context === w.context);
      if (!hit) fails.push('required check "' + w.context + '" is not required on GitHub');
      else if (hit.integration_id !== w.integration_id) {
        fails.push(
          'required check "' + w.context + '" is bound to app ' + hit.integration_id + ', expected ' + w.integration_id,
        );
      }
    }
    const extra = got.filter((g) => !want.some((w) => w.context === g.context));
    for (const e of extra) notes.push('also requires "' + e.context + '", which the committed spec does not list');
  }

  const pr = liveRules.get('pull_request');
  if (pr && pr.required_approving_review_count > 0) {
    notes.push(
      pr.required_approving_review_count +
        ' approving review(s) required. On a single-contributor repo you cannot approve your own pull request, so this blocks every merge.',
    );
  }

  console.log('\nBRANCH PROTECTION -- ' + OWNER + '/' + REPO + ', branch ' + defaultBranch + '\n');
  console.log('  ruleset      : ' + live.name + ' (id ' + live.id + ')');
  console.log('  enforcement  : ' + live.enforcement);
  console.log('  covers       : ' + inc.join(', '));
  console.log('  bypass actors: ' + (bypass.length ? bypass.length : 'none'));
  console.log('  rules        : ' + [...liveRules.keys()].sort().join(', '));
  if (rsc) {
    console.log(
      '  required     : ' +
        (rsc.required_status_checks || []).map((c) => c.context).join(', ') +
        (rsc.strict_required_status_checks_policy ? '  (branch must be up to date)' : ''),
    );
  }

  for (const n of notes) console.log('\n  note: ' + n);

  if (fails.length) {
    console.error('\nFAIL -- the live ruleset does not match the committed spec:');
    for (const f of fails) console.error('   x ' + f);
    console.error('\n  Fix whichever side is wrong. If the change on GitHub was deliberate,');
    console.error('  update .github/rulesets/master.json in the same sitting -- a record');
    console.error('  that drifts is worse than no record.\n');
    process.exit(1);
  }

  console.log('\n  Matches the committed spec. A push straight to ' + defaultBranch + ' is refused,');
  console.log('  and a pull request cannot merge until "verify" is green.\n');
})();
