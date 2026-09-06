import type { FrIconClassName } from "@codegouvaor/react-ads/fr";

/**
 * Content configuration of the Ministry of Economy and Finance homepage.
 *
 * The page is entirely driven by this configuration: titles and descriptions
 * resolve from the message catalogs through a message key (`key`/`titleKey`),
 * hrefs are locale-agnostic pathnames (next-intl Link prefixes the active
 * locale). Updating the homepage means editing this file (and the message
 * catalogs), never rewriting the interface — the same architecture can be
 * reused for another ministry with a different configuration.
 *
 * The homepage tells one story — find, do, manage, get oriented, explore,
 * understand, get informed, discover — through nine sections:
 *
 *   01 Hero / Accès immédiat      → popularSearches
 *   02 Que souhaitez-vous faire ? → actions
 *   03 Mon espace                 → monEspace
 *   04 Selon votre situation      → audiences
 *   05 Explorer les domaines      → domains
 *   06 L'économie en chiffres     → indicators
 *   07 Actualités                 → news
 *   08 Le ministère               → ministry
 *   09 Rester en contact          → social
 */
export type HomeLink = {
  /** Message key (namespace `home`) of the entry label. */
  key: string;
  href: string;
};

export type HomeAction = HomeLink & {
  /** Message key (namespace `home`) of the one-line description. */
  descKey: string;
  iconId: FrIconClassName;
};

export type HomeDomain = HomeLink & {
  iconId: FrIconClassName;
};

export type HomeIndicator = HomeLink & {
  /**
   * Displayed value. Values are provisional/mocked until real data is
   * published by the statistical office of the ministry; the config is the
   * seam where a future API or data source plugs in.
   */
  value: string;
};

export type HomeNewsItem = {
  /** Message keys (namespace `home`) of the article fields. */
  titleKey: string;
  tagKey: string;
  dateKey: string;
  textKey?: string;
  href: string;
};

export const ministryHome = {
  /**
   * Quick suggestions under the hero search. Labels resolve under
   * `home.search.popular.<key>`.
   */
  popularSearches: [
    { key: "declarer", href: "/fiscalite/declaration-fiscale" },
    { key: "payer", href: "/fiscalite/payer" },
    { key: "creerEntreprise", href: "/entreprises/creer-une-entreprise" },
    { key: "budget", href: "/finances-publiques/budget-annuel" },
    { key: "reglementation", href: "/donnees-et-ressources/reglementation" },
  ] satisfies ReadonlyArray<HomeLink>,
  /**
   * Section 02 — “Que souhaitez-vous faire ?” : user intentions, each mapped
   * to a real destination (never decorative cards).
   */
  actions: [
    {
      key: "declarer",
      descKey: "actions.items.declarer.desc",
      href: "/fiscalite/declarer",
      iconId: "fr-icon-file-text-line",
    },
    {
      key: "payer",
      descKey: "actions.items.payer.desc",
      href: "/fiscalite/payer",
      iconId: "fr-icon-bank-card-line",
    },
    {
      key: "gererEntreprise",
      descKey: "actions.items.gererEntreprise.desc",
      href: "/entreprises/gestion",
      iconId: "fr-icon-settings-5-line",
    },
    {
      key: "documents",
      descKey: "actions.items.documents.desc",
      href: "/mon-espace/documents",
      iconId: "fr-icon-folder-2-line",
    },
    {
      key: "obligations",
      descKey: "actions.items.obligations.desc",
      href: "/fiscalite/obligations-fiscales",
      iconId: "fr-icon-book-2-line",
    },
    {
      key: "information",
      descKey: "actions.items.information.desc",
      href: "/donnees-et-ressources",
      iconId: "fr-icon-bar-chart-2-line",
    },
  ] satisfies ReadonlyArray<HomeAction>,
  monEspace: {
    /**
     * Entries of the personal space, shown to an authenticated user. Each
     * leads to a dedicated space page.
     */
    items: [
      { key: "demarches", href: "/mon-espace/demarches" },
      { key: "obligations", href: "/mon-espace/obligations" },
      { key: "paiements", href: "/mon-espace/paiements" },
      { key: "documents", href: "/mon-espace/documents" },
      { key: "notifications", href: "/mon-espace/notifications" },
      { key: "entreprises", href: "/mon-espace/entreprises" },
    ] satisfies ReadonlyArray<HomeLink>,
    /**
     * Main benefits presented to an unauthenticated user. Labels reuse the
     * `monEspace.items.*` messages; the hrefs are intentionally unused in
     * that state (the space requires signing in through MyGouv).
     */
    benefits: [
      { key: "demarches", iconId: "fr-icon-file-text-line" },
      { key: "documents", iconId: "fr-icon-folder-2-line" },
      { key: "paiements", iconId: "fr-icon-bank-card-line" },
      { key: "notifications", iconId: "fr-icon-notification-3-line" },
    ] satisfies ReadonlyArray<{ key: string; iconId: FrIconClassName }>,
  },
  /**
   * Section 04 — “Selon votre situation” : audience orientation towards the
   * right parcours of the same platform (no separate sites per audience).
   */
  audiences: [
    {
      key: "particulier",
      descKey: "audiences.items.particulier.desc",
      href: "/fiscalite",
      iconId: "fr-icon-user-line",
    },
    {
      key: "entreprise",
      descKey: "audiences.items.entreprise.desc",
      href: "/entreprises",
      iconId: "fr-icon-building-line",
    },
    {
      key: "professionnel",
      descKey: "audiences.items.professionnel.desc",
      href: "/commerce-et-douanes",
      iconId: "fr-icon-suitcase-2-line",
    },
    {
      key: "administration",
      descKey: "audiences.items.administration.desc",
      href: "/finances-publiques",
      iconId: "fr-icon-government-line",
    },
  ] satisfies ReadonlyArray<HomeAction>,
  /**
   * The six functional domains of the ministry — same hrefs as the header.
   */
  domains: [
    { key: "economie", href: "/economie", iconId: "fr-icon-line-chart-line" },
    { key: "fiscalite", href: "/fiscalite", iconId: "fr-icon-money-euro-circle-line" },
    { key: "entreprises", href: "/entreprises", iconId: "fr-icon-building-line" },
    { key: "financesPubliques", href: "/finances-publiques", iconId: "fr-icon-bank-line" },
    { key: "commerceDouanes", href: "/commerce-et-douanes", iconId: "fr-icon-global-line" },
    { key: "donneesRessources", href: "/donnees-et-ressources", iconId: "fr-icon-database-line" },
  ] satisfies ReadonlyArray<HomeDomain>,
  /**
   * Key economic indicators. Values are provisional/mocked until real data is
   * published; the config is the seam where a future API or data source
   * plugs in (labels resolve under `home.stats.items.<key>.label`).
   */
  indicators: [
    { key: "pib", value: "XXX Md A$", href: "/donnees-et-ressources/pib" },
    { key: "inflation", value: "X,X %", href: "/donnees-et-ressources/inflation" },
    { key: "emploi", value: "XX %", href: "/donnees-et-ressources/emploi" },
    { key: "dette", value: "XX % du PIB", href: "/finances-publiques/dette-publique" },
    { key: "deficit", value: "−XX Md A$", href: "/finances-publiques/comptes-publics" },
    { key: "commerceExterieur", value: "XXX Md A$", href: "/donnees-et-ressources/commerce-exterieur" },
  ] satisfies ReadonlyArray<HomeIndicator>,
  news: {
    featured: {
      titleKey: "news.featured.title",
      tagKey: "news.featured.tag",
      dateKey: "news.featured.date",
      textKey: "news.featured.text",
      href: "/news/reforme-fiscale-2027",
    },
    secondary: [
      {
        titleKey: "news.items.budget2027.title",
        tagKey: "news.items.budget2027.tag",
        dateKey: "news.items.budget2027.date",
        href: "/news/projet-de-budget-2027",
      },
      {
        titleKey: "news.items.entreprises.title",
        tagKey: "news.items.entreprises.tag",
        dateKey: "news.items.entreprises.date",
        href: "/news/aides-innovation-entreprises",
      },
      {
        titleKey: "news.items.commerce.title",
        tagKey: "news.items.commerce.tag",
        dateKey: "news.items.commerce.date",
        href: "/news/accord-commercial",
      },
    ] satisfies ReadonlyArray<HomeNewsItem>,
  },
  /**
   * Section 08 — institutional links of the closing section. Labels resolve
   * under `home.ministry.links.<key>`.
   */
  ministry: [
    { key: "discover", href: "/presse" },
    { key: "publications", href: "/donnees-et-ressources/publications" },
    { key: "organisation", href: "/government/composition" },
    { key: "contact", href: "/contact" },
  ] satisfies ReadonlyArray<HomeLink>,
  /**
   * Section 09 — “Rester en contact” : newsletter subscription and the
   * ministry's social accounts. The hrefs below are placeholders (the
   * ministry's real accounts do not exist yet); the social labels resolve
   * under `home.social.follow.items.<key>`. The icon for each key is mapped
   * in the homepage (social icons are components, not DSFR icon ids).
   */
  social: {
    follow: [
      { key: "x", href: "https://x.com" },
      { key: "facebook", href: "https://www.facebook.com" },
      { key: "linkedin", href: "https://www.linkedin.com" },
      { key: "instagram", href: "https://www.instagram.com" },
      { key: "threads", href: "https://www.threads.net" },
    ] satisfies ReadonlyArray<HomeLink>,
  },
};