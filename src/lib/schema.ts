/* ============================================================================
 *  Structured data (JSON-LD) builders.
 *
 *  Every value here comes from src/data/site.ts — nothing about Procedo is
 *  stated in this file that is not already stated on the site itself. That
 *  matters more than usual for schema: search engines treat it as a claim.
 *
 *  Usage, in a page's frontmatter:
 *
 *      import { graph, organization, website, breadcrumbs } from '../lib/schema';
 *      const schema = graph(organization, website);
 *
 *  …then in the template:
 *
 *      <script type="application/ld+json" slot="head" is:inline
 *              set:html={JSON.stringify(schema)} />
 *
 *  The `slot="head"` puts it inside <head> via BaseLayout's named slot.
 * ========================================================================== */
import { site, contact, competencies } from '../data/site';

/** Stable @id values, so nodes across pages refer to one another. */
export const ORG_ID = `${site.url}/#organization`;
export const SITE_ID = `${site.url}/#website`;

/** An absolute URL for a site-relative path. */
const abs = (path: string) => new URL(path, site.url).href;

/**
 * The Organization. `areaServed` says India rather than Delhi: confirmed by
 * Harshit on 2026-09-10, and shown on the Contact page as "Working with
 * clients across India".
 */
export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: abs('/assets/procedo-logo.png'),
  image: abs('/og-default.png'),
  description: site.description,
  email: contact.email,
  telephone: contact.phone,
  areaServed: { '@type': 'Country', name: 'India' },
  ...(contact.address
    ? {
        address: {
          '@type': 'PostalAddress',
          streetAddress: contact.address,
          addressCountry: 'IN',
        },
      }
    : {}),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: contact.email,
      telephone: contact.phone,
      areaServed: 'IN',
      availableLanguage: 'en',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: contact.salesEmail,
      areaServed: 'IN',
      availableLanguage: 'en',
    },
  ],
  makesOffer: competencies.map((c) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: c.title, description: c.tagline },
  })),
};

/**
 * A minimal stand-in for the Organization, so that a page referring to it by
 * @id (the Service nodes name it as their provider) resolves the reference
 * inside its own document rather than relying on a validator following the
 * @id to the home page.
 */
export const organizationRef = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: site.legalName,
  url: site.url,
};

export const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-IN',
};

/**
 * A breadcrumb trail. Home is prepended, so pass only what follows it:
 *
 *     breadcrumbs([{ name: 'Services', path: '/services' }])
 */
export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/**
 * The five competencies as Service nodes, in the order they appear on the
 * Services page, each anchored to its own section. `serviceType` repeats the
 * title rather than inventing a category name.
 */
export function services() {
  return {
    '@type': 'ItemList',
    name: 'Core competencies',
    itemListElement: competencies.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        '@id': `${abs('/services')}#${c.slug}`,
        name: c.title,
        serviceType: c.title,
        description: c.intro,
        url: `${abs('/services')}#${c.slug}`,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'Country', name: 'India' },
      },
    })),
  };
}

/** Wrap nodes in a @graph document. */
export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
