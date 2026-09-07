import type { FrIconClassName } from "@codegouvaor/react-ads/fr";

/**
 * URL structure of the « Créer une entreprise » service page and of the
 * destinations it points to. Hrefs are locale-agnostic pathnames (the
 * next-intl Link prefixes the active locale) and reuse the existing URL plan
 * of the portal — no artificial routes are created.
 */
export const CREATE_COMPANY_PATH = "/entreprises/creer-une-entreprise";
export const ENTREPRISES_PATH = "/entreprises";
export const CHOISIR_STRUCTURE_PATH = "/entreprises/choisir-une-structure";
export const ENREGISTRER_ACTIVITE_PATH = "/entreprises/enregistrer-une-activite";
export const MODIFIER_ENTREPRISE_PATH = "/entreprises/modifier-une-entreprise";
export const OBLIGATIONS_ADMINISTRATIVES_PATH = "/entreprises/obligations-administratives";
export const ACCOMPAGNEMENT_PATH = "/entreprises/accompagnement";
export const FISCALITE_ENTREPRISES_PATH = "/fiscalite/fiscalite-des-entreprises";
export const OBLIGATIONS_FISCALES_PATH = "/fiscalite/obligations-fiscales";
export const DECLARER_PATH = "/fiscalite/declarer";
export const PAYER_PATH = "/fiscalite/payer";
export const REGLEMENTATION_PATH = "/donnees-et-ressources/reglementation";
export const CONTACT_PATH = "/contact";
export const MON_ESPACE_PATH = "/mon-espace";

/**
 * One step of the creation parcours. `href` is optional: a step only links
 * to a real destination of the portal when one exists (e.g. the dedicated
 * “Enregistrer une activité” page); otherwise the step stays informational
 * until the service it describes is published.
 */
export type CreateCompanyStep = {
  /** Message key (namespace `createCompany`) of the step label. */
  key: string;
  href?: string;
};

export type CreateCompanyLink = {
  /** Message key (namespace `createCompany`) of the entry label. */
  key: string;
  href: string;
};

export type CreateCompanyTile = CreateCompanyLink & {
  iconId: FrIconClassName;
};

export type CreateCompanyCost = {
  /** Message key (namespace `createCompany`) of the cost label. */
  key: string;
};

/**
 * Content configuration of the « Créer une entreprise » service page.
 *
 * The page is a *parcours* entry point, not an editorial article: it must let
 * a future entrepreneur understand what to do, what to prepare, which steps
 * to follow, what the costs are and where to find the services. Every visible
 * label resolves from the message catalogs through a message key; the
 * structure is designed to evolve from an informative page into a real
 * service (registration flow, authenticated parcours through MyGouv, official
 * cost figures) without rewriting the interface:
 *
 *   - `requirements` → “Avant de commencer” checklist (to be completed with
 *     the official eligibility requirements),
 *   - `steps`        → the five steps of the creation parcours (each step can
 *     grow a dedicated page later),
 *   - `structures`   → orientation tiles toward the future structure-picker
 *     tool (never definitive legal information),
 *   - `situations`   → short orientation by situation (never a second
 *     navigation),
 *   - `costs`        → cost rows, ready to receive the official amounts,
 *   - `obligations`  → what follows the creation, pointing to real sections,
 *   - `services`     → related services that actually exist on the portal,
 *   - `resources`    → secondary documentary shortcuts serving the parcours,
 *   - `faq`          → the compact frequently-asked-questions block.
 *
 * Official data (amounts, deadlines, legal requirements, documents) is NOT
 * invented: when it does not exist yet, the corresponding structure stays
 * empty/extensible and the interface says so transparently.
 */
export const createCompanyContent = {
  /**
   * Section “Avant de commencer” — what the user will typically need.
   * Labels resolve under `createCompany.beforeStart.items.<key>`.
   */
  requirements: [
    { key: "structure" },
    { key: "activity" },
    { key: "address" },
    { key: "informations" },
    { key: "taxes" },
  ] satisfies ReadonlyArray<{ key: string }>,
  /**
   * Section “Les étapes” — the parcours itself, in order. Each step is a
   * numbered entry; `href` links to the real destination when one exists.
   * Labels resolve under `createCompany.steps.items.<key>`.
   */
  steps: [
    { key: "prepare", href: CHOISIR_STRUCTURE_PATH },
    { key: "informations" },
    { key: "register", href: ENREGISTRER_ACTIVITE_PATH },
    { key: "taxesSocial", href: FISCALITE_ENTREPRISES_PATH },
    { key: "start" },
  ] satisfies ReadonlyArray<CreateCompanyStep>,
  /**
   * Section “Choisir sa structure” — orientation tiles toward the future
   * structure-picker tool. Generic families only: no definitive legal
   * information. Labels resolve under `createCompany.structures.items.<key>`.
   */
  structures: [
    { key: "individual", href: CHOISIR_STRUCTURE_PATH, iconId: "fr-icon-user-line" },
    { key: "company", href: CHOISIR_STRUCTURE_PATH, iconId: "fr-icon-building-line" },
    { key: "other", href: CHOISIR_STRUCTURE_PATH, iconId: "fr-icon-group-line" },
  ] satisfies ReadonlyArray<CreateCompanyTile>,
  /**
   * Section “Selon votre situation” — short orientation chips helping each
   * visitor identify their own parcours. Labels resolve under
   * `createCompany.situations.items.<key>`.
   */
  situations: [
    { key: "individual", href: CHOISIR_STRUCTURE_PATH },
    { key: "company", href: CHOISIR_STRUCTURE_PATH },
    { key: "foreign", href: ACCOMPAGNEMENT_PATH },
    { key: "alreadyDirector", href: MODIFIER_ENTREPRISE_PATH },
  ] satisfies ReadonlyArray<CreateCompanyLink>,
  /**
   * Section “Coûts à prévoir” — cost rows in display order. Official amounts
   * are NOT invented: while no official figure exists the row shows its
   * pending label (message `createCompany.costs.pending`). When the official
   * data is published, the amount can be added here or resolved from a data
   * source. Labels resolve under `createCompany.costs.items.<key>`.
   */
  costs: [
    { key: "registration" },
    { key: "formalities" },
    { key: "other" },
  ] satisfies ReadonlyArray<CreateCompanyCost>,
  /**
   * Section “Vos obligations après la création” — what follows the creation,
   * each pointing to a real section of the portal. Labels resolve under
   * `createCompany.obligations.items.<key>`.
   */
  obligations: [
    { key: "taxes", href: OBLIGATIONS_FISCALES_PATH },
    { key: "declarations", href: DECLARER_PATH },
    { key: "payments", href: PAYER_PATH },
    { key: "administrative", href: OBLIGATIONS_ADMINISTRATIVES_PATH },
    { key: "companyInfo", href: MODIFIER_ENTREPRISE_PATH },
  ] satisfies ReadonlyArray<CreateCompanyLink>,
  /**
   * Section “Services associés” — related services that actually exist on the
   * portal (no fictitious services). Labels resolve under
   * `createCompany.services.items.<key>`.
   */
  services: [
    { key: "register", href: ENREGISTRER_ACTIVITE_PATH, iconId: "fr-icon-building-line" },
    { key: "modify", href: MODIFIER_ENTREPRISE_PATH, iconId: "fr-icon-edit-line" },
    { key: "structure", href: CHOISIR_STRUCTURE_PATH, iconId: "fr-icon-scales-3-line" },
    { key: "dossier", href: MON_ESPACE_PATH, iconId: "fr-icon-folder-2-line" },
  ] satisfies ReadonlyArray<CreateCompanyTile>,
  /**
   * Section “Documents et ressources” — secondary shortcuts that serve the
   * parcours without replacing it. The FAQ entry links to the in-page anchor.
   * Labels resolve under `createCompany.resources.items.<key>`.
   */
  resources: [
    { key: "guideStructure", href: CHOISIR_STRUCTURE_PATH },
    { key: "regulation", href: REGLEMENTATION_PATH },
    { key: "obligations", href: OBLIGATIONS_ADMINISTRATIVES_PATH },
    { key: "faq", href: `${CREATE_COMPANY_PATH}#faq` },
  ] satisfies ReadonlyArray<CreateCompanyLink>,
  /**
   * Section “Votre parcours” — capabilities anticipated in the personal
   * space once the creation journey is tracked (progression sauvegardée,
   * démarches en cours, documents, notifications, prochaines étapes). No
   * fake persistence is implemented: this is the honest preview of what the
   * connected space will offer. Labels resolve under
   * `createCompany.progress.upcoming.<key>`.
   */
  progressUpcoming: [
    { key: "progress" },
    { key: "demarches" },
    { key: "documents" },
    { key: "notifications" },
    { key: "nextSteps" },
  ] satisfies ReadonlyArray<{ key: string }>,
  /**
   * Section “Questions fréquentes” — compact FAQ. Keys resolve under
   * `createCompany.faq.items.<key>` (`question` / `answer`).
   */
  faq: [
    { key: "beforeActivity" },
    { key: "documents" },
    { key: "duration" },
    { key: "online" },
    { key: "followUp" },
  ] satisfies ReadonlyArray<{ key: string }>,
} as const;