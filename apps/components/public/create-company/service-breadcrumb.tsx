"use client";

import { Breadcrumb } from "@codegouvaor/react-ads/Breadcrumb";

/**
 * Position breadcrumb of the « Créer une entreprise » service page:
 *
 *   Accueil / Entreprises / Créer une entreprise
 *
 * A thin serializable wrapper around the ADS `Breadcrumb` (server-rendered
 * page content cannot pass elements to client components, so only strings
 * and hrefs cross the boundary). The home link label comes from the ADS
 * breadcrumb translations; the domain and current labels are resolved from
 * the message catalogs by the page. The breadcrumb never replaces the main
 * navigation: it only explains the current position.
 */
export function ServiceBreadcrumb({
  domainLabel,
  domainHref,
  currentLabel,
}: {
  domainLabel: string;
  domainHref: string;
  currentLabel: string;
}) {
  return (
    <Breadcrumb
      homeLinkProps={{ href: "/" }}
      segments={[{ label: domainLabel, linkProps: { href: domainHref } }]}
      currentPageLabel={currentLabel}
    />
  );
}