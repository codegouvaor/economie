import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { localizedAlternates, resolveLocaleParam } from "@/lib/localized-metadata";
import { getDomainUrl } from "@/lib/domains";
import {
  createCompanyContent,
  CREATE_COMPANY_PATH,
  CONTACT_PATH,
} from "@/lib/create-company-content";
import { CtaButtonsGroup, LinkTile, NoticeCallout } from "@/components/public/content/ads-fragments";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);

  const t = await getTranslations({ locale, namespace: "createCompany" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    ...localizedAlternates(locale, CREATE_COMPANY_PATH),
  };
}

/* ------------------------------------------------------------------------- *
 * Ministry-specific arrangement of this service page.
 *
 * Everything below the `gov-section*` primitives comes from
 * `@codegouvaor/react-ads/main.css` (single global CSS source). The blocks
 * that are specific to the « créer une entreprise » parcours are expressed
 * with the ADS tokens (`var(--ads-*)`) and the DSFR grid/icon classes, inline
 * — there is no local stylesheet.
 * ------------------------------------------------------------------------- */

const anchorSectionStyle: CSSProperties = { scrollMarginTop: "6.5rem" };

const numberedListStyle: CSSProperties = {
  listStyle: "none",
  margin: "0",
  padding: "0",
  maxWidth: "60rem",
  borderTop: "1px solid var(--ads-color-border)",
};

const chipListStyle: CSSProperties = {
  listStyle: "none",
  margin: "0",
  padding: "0",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.625rem",
  maxWidth: "60rem",
};

const chipStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.625rem 1rem",
  fontSize: "0.9375rem",
  fontWeight: 600,
  lineHeight: 1.5,
  color: "var(--ads-color-text)",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  textDecoration: "none",
};

const borderedListStyle: CSSProperties = {
  listStyle: "none",
  margin: "0",
  padding: "0",
  maxWidth: "60rem",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
};

const panelStyle: CSSProperties = {
  padding: "1.75rem",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  borderLeft: "4px solid var(--ads-color-primary)",
};

const faqStyle: CSSProperties = {
  maxWidth: "56rem",
  borderTop: "1px solid var(--ads-color-border)",
};

/**
 * « Créer une entreprise » — a *parcours* page, not an editorial article.
 *
 * This is the fourth level of the portal logic: the header allows exploring,
 * the homepage allows acting, the domains allow going deeper, and this page
 * allows completing a procedure. Everything is driven by the
 * `createCompanyContent` configuration (lib/create-company-content.ts) and
 * the message catalogs, like the homepage with `ministryHome`.
 *
 *   01 Hero              — label, H1, short introduction, main CTA and a
 *                          transparent “service bientôt disponible” notice
 *                          (no online backend exists yet: no fake action).
 *   02 Avant de commencer — what the user will typically need to prepare
 *   03 Les étapes        — the five steps of the parcours (#etapes)
 *   04 Choisir sa structure — orientation tiles toward the structure picker
 *   05 Selon votre situation — short orientation chips, never a second nav
 *   06 Coûts à prévoir   — cost rows ready to receive the official amounts
 *   07 Votre parcours    — the MyGouv-connected space, presented honestly
 *                          (no fake persistence) with the sign-in action
 *   08 Obligations après la création — real destinations of the portal
 *   09 Services associés — related services that actually exist
 *   10 Documents et ressources — secondary shortcuts serving the parcours
 *   11 FAQ               — compact native accordion (#faq)
 *   12 Besoin d'aide ?   — discreet closing action
 *
 * No official data (amounts, deadlines, legal requirements) is invented:
 * when a figure does not exist yet, the structure stays extensible and the
 * interface says so. The main CTA currently leads to the in-page steps —
 * it will point to the real online registration flow when that service
 * exists.
 */
export default async function CreerUneEntreprisePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "createCompany" });

  const steps = createCompanyContent.steps;

  return (
    <>
      {/* 01 — Hero: functional, action-oriented, left-aligned (not a banner). */}
      <section className="gov-section" aria-labelledby="create-hero-title">
        <div className="gov-section__container" style={{ maxWidth: "60rem" }}>
          <p className="gov-kicker">{t("hero.kicker")}</p>
          <h1 id="create-hero-title">{t("hero.title")}</h1>
          <p className="gov-lead">{t("hero.lead")}</p>
          <div style={{ marginTop: "1.75rem" }}>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("hero.cta"),
                  // No online registration backend exists yet: the main CTA
                  // leads to the parcours itself (the steps below). When the
                  // real service ships, this href becomes its entry point.
                  href: `${CREATE_COMPANY_PATH}#etapes`,
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <div style={{ marginTop: "1.5rem", maxWidth: "46rem" }}>
            <NoticeCallout title={t("hero.notice.title")} iconId="fr-icon-information-line">
              {t("hero.notice.text")}
            </NoticeCallout>
          </div>
        </div>
      </section>

      {/* 02 — Avant de commencer: check the user is ready. Extensible toward
          the official eligibility requirements. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="before-start-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("beforeStart.kicker")}</p>
              <h2 id="before-start-title" className="gov-section__title">
                {t("beforeStart.title")}
              </h2>
              <p className="gov-lead">{t("beforeStart.lead")}</p>
            </div>
          </div>
          <ul
            role="list"
            style={{
              listStyle: "none",
              margin: "0",
              padding: "0",
              maxWidth: "56rem",
              display: "grid",
              gap: "0.75rem",
            }}
          >
            {createCompanyContent.requirements.map((item) => (
              <li
                key={item.key}
                style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", lineHeight: 1.6 }}
              >
                <span
                  className="fr-icon-check-line"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    fontSize: "1.25rem",
                    lineHeight: 1,
                    color: "var(--ads-color-primary)",
                    marginTop: "0.2rem",
                  }}
                />
                {t(`beforeStart.items.${item.key}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 — Les étapes: the parcours itself, ordered and understandable. */}
      <section
        id="etapes"
        className="gov-section"
        style={anchorSectionStyle}
        aria-labelledby="steps-title"
      >
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("steps.kicker")}</p>
              <h2 id="steps-title" className="gov-section__title">
                {t("steps.title")}
              </h2>
              <p className="gov-lead">{t("steps.lead")}</p>
            </div>
          </div>
          <ol style={numberedListStyle}>
            {steps.map((step, index) => (
              <li
                key={step.key}
                style={{
                  display: "grid",
                  gridTemplateColumns: "3.25rem 1fr",
                  gap: "0.75rem 1.25rem",
                  padding: "1.25rem 0",
                  borderBottom: "1px solid var(--ads-color-border)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "3.25rem",
                    height: "3.25rem",
                    border: "1px solid var(--ads-color-border)",
                    borderRadius: "50%",
                    fontSize: "0.9375rem",
                    fontWeight: 700,
                    color: "var(--ads-color-primary)",
                    background: "var(--ads-color-background)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ margin: "0 0 0.375rem", fontSize: "1.125rem", lineHeight: 1.4 }}>
                    {t(`steps.items.${step.key}.title`)}
                  </h3>
                  <p style={{ margin: "0 0 0.625rem", maxWidth: "48rem", lineHeight: 1.7 }}>
                    {t(`steps.items.${step.key}.desc`)}
                  </p>
                  {step.href ? (
                    <Link
                      href={step.href}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontWeight: 600,
                        textUnderlineOffset: "0.2em",
                      }}
                    >
                      {t("steps.seeStep")}
                      <span className="fr-icon-arrow-right-line" aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — Choisir sa structure: orientation toward the future
          structure-picker tool (no definitive legal information). */}
      <section className="gov-section gov-section--subtle" aria-labelledby="structures-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("structures.kicker")}</p>
              <h2 id="structures-title" className="gov-section__title">
                {t("structures.title")}
              </h2>
              <p className="gov-lead">{t("structures.lead")}</p>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {createCompanyContent.structures.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-md-4">
                <LinkTile
                  title={t(`structures.items.${item.key}.title`)}
                  desc={t(`structures.items.${item.key}.desc`)}
                  href={item.href}
                  iconId={item.iconId}
                />
              </div>
            ))}
          </div>
          <p className="fr-text--sm" style={{ color: "var(--ads-color-text-muted)" }}>
            {t("structures.note")}
          </p>
        </div>
      </section>

      {/* 05 — Selon votre situation: short orientation chips, never a second
          navigation. */}
      <section className="gov-section" aria-labelledby="situations-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("situations.kicker")}</p>
              <h2 id="situations-title" className="gov-section__title">
                {t("situations.title")}
              </h2>
              <p className="gov-lead">{t("situations.lead")}</p>
            </div>
          </div>
          <ul role="list" style={chipListStyle}>
            {createCompanyContent.situations.map((item) => (
              <li key={item.key}>
                <Link href={item.href} style={chipStyle}>
                  {t(`situations.items.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — Coûts à prévoir: structure ready to receive the official
          amounts; no figure is invented while the data is unpublished. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="costs-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("costs.kicker")}</p>
              <h2 id="costs-title" className="gov-section__title">
                {t("costs.title")}
              </h2>
              <p className="gov-lead">{t("costs.lead")}</p>
            </div>
          </div>
          <ul role="list" style={borderedListStyle}>
            {createCompanyContent.costs.map((item, index) => (
              <li
                key={item.key}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  borderBottom:
                    index === createCompanyContent.costs.length - 1
                      ? "none"
                      : "1px solid var(--ads-color-border)",
                }}
              >
                <span style={{ fontWeight: 600 }}>{t(`costs.items.${item.key}.label`)}</span>
                <span style={{ color: "var(--ads-color-text-muted)" }}>
                  {t(`costs.items.${item.key}.amount`)}
                </span>
              </li>
            ))}
          </ul>
          <p className="fr-text--sm" style={{ color: "var(--ads-color-text-muted)" }}>
            {t("costs.note")}
          </p>
        </div>
      </section>

      {/* 07 — Votre parcours: the MyGouv-connected space. On the public
          portal the AuthProvider is not mounted, so the section presents the
          unauthenticated state (benefits + sign-in through MyGouv) — exactly
          like the home “Mon espace” section. No fake persistence: the
          upcoming capabilities are listed honestly, and the connected view
          will be wired to the real SSO session when it exists. */}
      <section className="gov-section" aria-labelledby="progress-title">
        <div className="gov-section__container" style={{ maxWidth: "64rem" }}>
          <div style={panelStyle}>
            <div style={{ maxWidth: "48rem" }}>
              <p className="gov-kicker">{t("progress.kicker")}</p>
              <h2 id="progress-title" style={{ margin: "0 0 0.5rem" }}>
                {t("progress.title")}
              </h2>
              <p style={{ margin: "0", lineHeight: 1.6 }}>{t("progress.lead")}</p>
            </div>
            <div style={{ marginTop: "1.25rem" }}>
              <p style={{ margin: "0 0 0.625rem", fontSize: "0.9375rem", fontWeight: 700 }}>
                {t("progress.upcomingTitle")}
              </p>
              <ul
                role="list"
                style={{
                  listStyle: "none",
                  margin: "0",
                  padding: "0",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.625rem 1.75rem",
                }}
              >
                {createCompanyContent.progressUpcoming.map((item) => (
                  <li
                    key={item.key}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        flex: "none",
                        width: "0.5rem",
                        height: "0.5rem",
                        borderRadius: "50%",
                        background: "var(--ads-color-primary)",
                      }}
                    />
                    {t(`progress.upcoming.${item.key}`)}
                  </li>
                ))}
              </ul>
              <p
                style={{
                  margin: "0.875rem 0 0",
                  fontSize: "0.875rem",
                  color: "var(--ads-color-text-muted)",
                }}
              >
                {t("progress.authNote")}
              </p>
              <div style={{ marginTop: "1.5rem" }}>
                <CtaButtonsGroup
                  buttons={[
                    {
                      children: t("progress.authCta"),
                      href: getDomainUrl("sso", "/login"),
                      iconId: "fr-icon-account-circle-line",
                      iconPosition: "left",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — Vos obligations après la création: creation is not the end of
          the journey. Each entry points to a real section of the portal. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="obligations-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("obligations.kicker")}</p>
              <h2 id="obligations-title" className="gov-section__title">
                {t("obligations.title")}
              </h2>
              <p className="gov-lead">{t("obligations.lead")}</p>
            </div>
          </div>
          <ul role="list" style={borderedListStyle}>
            {createCompanyContent.obligations.map((item, index) => (
              <li
                key={item.key}
                style={{
                  borderBottom:
                    index === createCompanyContent.obligations.length - 1
                      ? "none"
                      : "1px solid var(--ads-color-border)",
                }}
              >
                <Link
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1.125rem 1.25rem",
                    textDecoration: "none",
                    color: "var(--ads-color-text)",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "0.125rem", minWidth: 0 }}>
                    <span style={{ fontSize: "1rem", lineHeight: 1.4, fontWeight: 700 }}>
                      {t(`obligations.items.${item.key}.title`)}
                    </span>
                    <span
                      style={{ fontSize: "0.875rem", lineHeight: 1.55, color: "var(--ads-color-text-muted)" }}
                    >
                      {t(`obligations.items.${item.key}.desc`)}
                    </span>
                  </span>
                  <span
                    className="fr-icon-arrow-right-line"
                    aria-hidden="true"
                    style={{ flex: "none", marginTop: "0.125rem", color: "var(--ads-color-primary)" }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 09 — Services associés: related services that actually exist on the
          portal (no fictitious service is displayed). */}
      <section className="gov-section" aria-labelledby="services-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("services.kicker")}</p>
              <h2 id="services-title" className="gov-section__title">
                {t("services.title")}
              </h2>
              <p className="gov-lead">{t("services.lead")}</p>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {createCompanyContent.services.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-md-6">
                <LinkTile
                  title={t(`services.items.${item.key}.title`)}
                  desc={t(`services.items.${item.key}.desc`)}
                  href={item.href}
                  iconId={item.iconId}
                  small
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Documents et ressources: secondary shortcuts that serve the
          parcours without replacing it. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="resources-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("resources.kicker")}</p>
              <h2 id="resources-title" className="gov-section__title">
                {t("resources.title")}
              </h2>
              <p className="gov-lead">{t("resources.lead")}</p>
            </div>
          </div>
          <ul role="list" style={borderedListStyle}>
            {createCompanyContent.resources.map((item, index) => (
              <li
                key={item.key}
                style={{
                  borderBottom:
                    index === createCompanyContent.resources.length - 1
                      ? "none"
                      : "1px solid var(--ads-color-border)",
                }}
              >
                <Link
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1.125rem 1.25rem",
                    textDecoration: "none",
                    color: "var(--ads-color-text)",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "0.125rem", minWidth: 0 }}>
                    <span style={{ fontSize: "1rem", lineHeight: 1.4, fontWeight: 700 }}>
                      {t(`resources.items.${item.key}.title`)}
                    </span>
                    <span
                      style={{ fontSize: "0.875rem", lineHeight: 1.55, color: "var(--ads-color-text-muted)" }}
                    >
                      {t(`resources.items.${item.key}.desc`)}
                    </span>
                  </span>
                  <span
                    className="fr-icon-arrow-right-line"
                    aria-hidden="true"
                    style={{ flex: "none", marginTop: "0.125rem", color: "var(--ads-color-primary)" }}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <p className="fr-text--sm" style={{ color: "var(--ads-color-text-muted)" }}>
            {t("resources.note")}
          </p>
        </div>
      </section>

      {/* 11 — FAQ: compact, native, accessible accordion (no JS needed). */}
      <section id="faq" className="gov-section" style={anchorSectionStyle} aria-labelledby="faq-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("faq.kicker")}</p>
              <h2 id="faq-title" className="gov-section__title">
                {t("faq.title")}
              </h2>
            </div>
          </div>
          <div style={faqStyle}>
            {createCompanyContent.faq.map((item) => (
              <details
                key={item.key}
                style={{ borderBottom: "1px solid var(--ads-color-border)" }}
              >
                <summary
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1rem 0",
                    fontWeight: 700,
                    lineHeight: 1.5,
                    listStyle: "none",
                    cursor: "pointer",
                  }}
                >
                  {t(`faq.items.${item.key}.question`)}
                  <span
                    className="fr-icon-arrow-down-s-line"
                    aria-hidden="true"
                    style={{ flex: "none", fontSize: "1.25rem", color: "var(--ads-color-text-muted)" }}
                  />
                </summary>
                <p style={{ margin: "0", padding: "0 0 1rem", maxWidth: "48rem", lineHeight: 1.7 }}>
                  {t(`faq.items.${item.key}.answer`)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — Besoin d'aide ?: discreet closing, never a huge contact block. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="help-title">
        <div className="gov-section__container" style={{ textAlign: "center" }}>
          <div style={{ maxWidth: "52rem", marginInline: "auto" }}>
            <p className="gov-kicker">{t("help.kicker")}</p>
            <h2 id="help-title" className="gov-section__title">
              {t("help.title")}
            </h2>
            <p className="gov-lead" style={{ marginInline: "auto" }}>
              {t("help.lead")}
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <CtaButtonsGroup
                alignment="center"
                buttons={[
                  {
                    children: t("help.cta"),
                    href: CONTACT_PATH,
                    priority: "secondary",
                    iconId: "fr-icon-arrow-right-line",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
