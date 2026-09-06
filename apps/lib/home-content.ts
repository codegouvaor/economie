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
 */
export type HomeLink = {
  /** Message key (namespace `home`) of the entry label. */
  key: string;
  href: string;
};

export type HomeService = HomeLink & {
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
   * published by the statistical office of the ministry.
   */
  value: string;
};

export type HomeBudgetItem = {
  /** Message key (namespace `home`) of the label. */
  key: string;
  value: string;
  /** Relative weight (0–100) driving the accessible bar graphic. */
  ratio: number;
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
  hero: {
    /** MyGouv — the first action is oriented towards services. */
    primaryCta: { key: "hero.servicesCta", href: "/mon-espace" },
    secondaryCta: { key: "hero.economyCta", href: "/economie" },
  },
  popularSearches: [
    { key: "impots", href: "/fiscalite/declaration-fiscale" },
    { key: "creerEntreprise", href: "/entreprises/creer-une-entreprise" },
    { key: "tva", href: "/fiscalite/tva" },
    { key: "budget", href: "/finances-publiques/budget-annuel" },
    { key: "importer", href: "/commerce-et-douanes/importation" },
    { key: "inflation", href: "/donnees-et-ressources/inflation" },
  ] satisfies ReadonlyArray<HomeLink>,
  services: [
    {
      key: "declarerRevenus",
      descKey: "services.items.declarerRevenus.desc",
      href: "/fiscalite/declaration-fiscale",
      iconId: "fr-icon-file-text-line",
    },
    {
      key: "situationFiscale",
      descKey: "services.items.situationFiscale.desc",
      href: "/fiscalite/situation-fiscale",
      iconId: "fr-icon-account-line",
    },
    {
      key: "payerImpot",
      descKey: "services.items.payerImpot.desc",
      href: "/fiscalite/payer",
      iconId: "fr-icon-bank-line",
    },
    {
      key: "creerEntreprise",
      descKey: "services.items.creerEntreprise.desc",
      href: "/entreprises/creer-une-entreprise",
      iconId: "fr-icon-add-circle-line",
    },
    {
      key: "gererEntreprise",
      descKey: "services.items.gererEntreprise.desc",
      href: "/entreprises/gestion",
      iconId: "fr-icon-settings-5-line",
    },
    {
      key: "demarcheDouaniere",
      descKey: "services.items.demarcheDouaniere.desc",
      href: "/commerce-et-douanes/declarations",
      iconId: "fr-icon-ship-2-line",
    },
  ] satisfies ReadonlyArray<HomeService>,
  /** The six functional domains of the ministry — same hrefs as the header. */
  domains: [
    { key: "economie", href: "/economie", iconId: "fr-icon-line-chart-line" },
    { key: "fiscalite", href: "/fiscalite", iconId: "fr-icon-money-euro-circle-line" },
    { key: "entreprises", href: "/entreprises", iconId: "fr-icon-building-line" },
    { key: "financesPubliques", href: "/finances-publiques", iconId: "fr-icon-bank-line" },
    { key: "commerceDouanes", href: "/commerce-et-douanes", iconId: "fr-icon-global-line" },
    { key: "donneesRessources", href: "/donnees-et-ressources", iconId: "fr-icon-database-line" },
  ] satisfies ReadonlyArray<HomeDomain>,
  monEspace: {
    items: [
      { key: "demarches", href: "/mon-espace/demarches" },
      { key: "obligations", href: "/mon-espace/obligations" },
      { key: "paiements", href: "/mon-espace/paiements" },
      { key: "documents", href: "/mon-espace/documents" },
      { key: "notifications", href: "/mon-espace/notifications" },
      { key: "entreprises", href: "/mon-espace/entreprises" },
    ] satisfies ReadonlyArray<HomeLink>,
  },
  indicators: [
    { key: "pib", value: "XXX Md A$", href: "/donnees-et-ressources/pib" },
    { key: "inflation", value: "X,X %", href: "/donnees-et-ressources/inflation" },
    { key: "emploi", value: "XX %", href: "/donnees-et-ressources/emploi" },
    { key: "dette", value: "XX % du PIB", href: "/finances-publiques/dette-publique" },
  ] satisfies ReadonlyArray<HomeIndicator>,
  budget: {
    items: [
      { key: "recettes", value: "XXX Md A$", ratio: 62 },
      { key: "depenses", value: "XXX Md A$", ratio: 66 },
      { key: "solde", value: "−XX Md A$", ratio: 8 },
      { key: "dette", value: "XX % du PIB", ratio: 100 },
    ] satisfies ReadonlyArray<HomeBudgetItem>,
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
  enterprise: [
    { key: "creer", href: "/entreprises/creer-une-entreprise" },
    { key: "gerer", href: "/entreprises/gestion" },
    { key: "financer", href: "/entreprises/financement" },
    { key: "international", href: "/entreprises/exportation" },
  ] satisfies ReadonlyArray<HomeLink>,
  resources: [
    { key: "rapports", href: "/donnees-et-ressources/rapports" },
    { key: "etudes", href: "/donnees-et-ressources/etudes" },
    { key: "textes", href: "/donnees-et-ressources/textes-officiels" },
    { key: "donnees", href: "/donnees-et-ressources/donnees-ouvertes" },
  ] satisfies ReadonlyArray<HomeLink>,
  help: [
    { key: "contact", href: "/contact" },
    { key: "service", href: "/services" },
    { key: "faq", href: "/liens-utiles/faq" },
    { key: "signalement", href: "/contact" },
    { key: "aide", href: "/liens-utiles" },
  ] satisfies ReadonlyArray<HomeLink>,
};