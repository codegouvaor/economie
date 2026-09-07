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
 * The homepage is the *functional front door* of the ministry, distinct from
 * the header (which allows exploring the six domains): it lets the visitor
 * act now. It tells one story through nine sections:
 *
 *   01 Hero / Recherche             → popularSearches
 *   02 Que souhaitez-vous faire ?   → actions
 *   03 Mon espace                   → monEspace
 *   04 Informations importantes     → importantInfo
 *   05 L'économie d'Astoria         → indicators
 *   06 Budget de l'État             → budget
 *   07 Actualités                   → news
 *   08 Ressources                   → resources
 *   09 Le ministère                 → ministry
 *
 * The six functional domains are intentionally absent from this page: the
 * header navigation is their home. Newsletter and social accounts live in
 * the footer (see the stay-in-touch zone of GovernmentFooter).
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

/**
 * One operational alert of the “Informations importantes” section. Alerts
 * carry a real operational importance (échéance, changement réglementaire,
 * mesure, réforme…) and therefore come before general news.
 */
export type HomeAlert = HomeLink & {
  iconId: FrIconClassName;
};

/**
 * One key figure of the State budget section. Figures are provisional/mocked
 * until the official budget data is published; labels resolve under
 * `home.budget.figures.<key>`.
 */
export type HomeBudgetFigure = HomeLink & {
  value: string;
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
   * Section 02 — “Que souhaitez-vous faire ?” : concrete, frequent actions,
   * each mapped to a real destination (never decorative cards). Six to eight
   * entries — selected by real importance, not to fill the section.
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
      key: "creerEntreprise",
      descKey: "actions.items.creerEntreprise.desc",
      href: "/entreprises/creer-une-entreprise",
      iconId: "fr-icon-building-line",
    },
    {
      key: "gererEntreprise",
      descKey: "actions.items.gererEntreprise.desc",
      href: "/entreprises/gestion",
      iconId: "fr-icon-settings-5-line",
    },
    {
      key: "obligations",
      descKey: "actions.items.obligations.desc",
      href: "/fiscalite/obligations-fiscales",
      iconId: "fr-icon-book-2-line",
    },
    {
      key: "aides",
      descKey: "actions.items.aides.desc",
      href: "/entreprises/aides-publiques",
      iconId: "fr-icon-gift-line",
    },
    {
      key: "budget",
      descKey: "actions.items.budget.desc",
      href: "/finances-publiques/budget-annuel",
      iconId: "fr-icon-bank-line",
    },
    {
      key: "donnees",
      descKey: "actions.items.donnees.desc",
      href: "/donnees-et-ressources/donnees-economiques",
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
   * Section 04 — “Informations importantes” : operational alerts needing the
   * public's attention (échéance fiscale, changement réglementaire, mesure,
   * réforme, service). They take precedence over general news. Labels resolve
   * under `home.alerts.items.<key>`.
   */
  importantInfo: [
    {
      key: "echeance",
      href: "/fiscalite/echeances",
      iconId: "fr-icon-calendar-line",
    },
    {
      key: "reglementation",
      href: "/donnees-et-ressources/reglementation",
      iconId: "fr-icon-article-line",
    },
    {
      key: "comptes",
      href: "/finances-publiques/comptes-publics",
      iconId: "fr-icon-bank-line",
    },
  ] satisfies ReadonlyArray<HomeAlert>,
  /**
   * Section 05 — key economic indicators. Values are provisional/mocked until
   * real data is published; the config is the seam where a future API or data
   * source plugs in (labels resolve under `home.stats.items.<key>.label`).
   */
  indicators: [
    { key: "pib", value: "XXX Md A$", href: "/donnees-et-ressources/pib" },
    { key: "inflation", value: "X,X %", href: "/donnees-et-ressources/inflation" },
    { key: "emploi", value: "XX %", href: "/donnees-et-ressources/emploi" },
    { key: "dette", value: "XX % du PIB", href: "/finances-publiques/dette-publique" },
    { key: "deficit", value: "−XX Md A$", href: "/finances-publiques/comptes-publics" },
    {
      key: "commerceExterieur",
      value: "XXX Md A$",
      href: "/donnees-et-ressources/commerce-exterieur",
    },
  ] satisfies ReadonlyArray<HomeIndicator>,
  /**
   * Section 06 — the State budget, made understandable. The headline total
   * leads to the annual budget page; each key figure links to its dedicated
   * page. Values are provisional/mocked — this config is the seam where the
   * real budget data (and later a richer visualisation) plugs in.
   */
  budget: {
    total: {
      value: "XXX Md A$",
      href: "/finances-publiques/budget-annuel",
    },
    figures: [
      {
        key: "recettes",
        value: "XXX Md A$",
        href: "/finances-publiques/recettes-publiques",
      },
      {
        key: "depenses",
        value: "XXX Md A$",
        href: "/finances-publiques/depenses-publiques",
      },
      {
        key: "solde",
        value: "−XX Md A$",
        href: "/finances-publiques/comptes-publics",
      },
      {
        key: "dette",
        value: "XX % du PIB",
        href: "/finances-publiques/dette-publique",
      },
    ] satisfies ReadonlyArray<HomeBudgetFigure>,
  },
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
   * Section 08 — frequent documentary resources: a compact shortcut to the
   * “Données & Ressources” domain content (no sixth domain, no second
   * navigation). Labels intentionally reuse the `nav.panel` vocabulary of the
   * header so the whole ecosystem speaks the same language.
   */
  resources: [
    { key: "donneesEconomiques", href: "/donnees-et-ressources/donnees-economiques" },
    { key: "donneesStatistiquesCategory", href: "/donnees-et-ressources/indicateurs" },
    { key: "donneesEtudes", href: "/donnees-et-ressources/etudes" },
    { key: "donneesPublications", href: "/donnees-et-ressources/publications" },
    { key: "donneesLoisCategory", href: "/donnees-et-ressources/reglementation" },
  ] satisfies ReadonlyArray<HomeLink>,
  /**
   * Section 09 — institutional links of the closing section. Labels resolve
   * under `home.ministry.links.<key>`.
   */
  ministry: [
    { key: "discover", href: "/presse" },
    { key: "publications", href: "/donnees-et-ressources/publications" },
    { key: "organisation", href: "/government/composition" },
    { key: "contact", href: "/contact" },
  ] satisfies ReadonlyArray<HomeLink>,
};
