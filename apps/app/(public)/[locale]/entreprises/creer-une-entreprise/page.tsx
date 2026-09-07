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
      <section className="gov-section gov-create-hero" aria-labelledby="create-hero-title">
        <div className="gov-section__container">
          <p className="gov-kicker">{t("hero.kicker")}</p>
          <h1 id="create-hero-title" className="gov-create-hero__title">
            {t("hero.title")}
          </h1>
          <p className="gov-lead">{t("hero.lead")}</p>
          <div className="gov-create-hero__actions">
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
          <div className="gov-create-hero__notice">
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
          <ul className="gov-checklist" role="list">
            {createCompanyContent.requirements.map((item) => (
              <li key={item.key} className="gov-checklist__item">
                <span className="fr-icon-check-line gov-checklist__icon" aria-hidden="true" />
                {t(`beforeStart.items.${item.key}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 — Les étapes: the parcours itself, ordered and understandable. */}
      <section
        id="etapes"
        className="gov-section gov-service-anchor"
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
          <ol className="gov-steps">
            {steps.map((step, index) => (
              <li key={step.key} className="gov-step">
                <span className="gov-step__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="gov-step__content">
                  <h3 className="gov-step__title">{t(`steps.items.${step.key}.title`)}</h3>
                  <p className="gov-step__text">{t(`steps.items.${step.key}.desc`)}</p>
                  {step.href ? (
                    <Link className="gov-step__link" href={step.href}>
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
          <p className="gov-caption">{t("structures.note")}</p>
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
          <ul className="gov-situations" role="list">
            {createCompanyContent.situations.map((item) => (
              <li key={item.key}>
                <Link className="gov-situation" href={item.href}>
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
          <ul className="gov-costs" role="list">
            {createCompanyContent.costs.map((item) => (
              <li key={item.key} className="gov-cost">
                <span className="gov-cost__label">{t(`costs.items.${item.key}.label`)}</span>
                <span className="gov-cost__amount gov-cost__amount--pending">
                  {t(`costs.items.${item.key}.amount`)}
                </span>
              </li>
            ))}
          </ul>
          <p className="gov-caption">{t("costs.note")}</p>
        </div>
      </section>

      {/* 07 — Votre parcours: the MyGouv-connected space. On the public
          portal the AuthProvider is not mounted, so the section presents the
          unauthenticated state (benefits + sign-in through MyGouv) — exactly
          like the home “Mon espace” section. No fake persistence: the
          upcoming capabilities are listed honestly, and the connected view
          will be wired to the real SSO session when it exists. */}
      <section className="gov-section" aria-labelledby="progress-title">
        <div className="gov-section__container">
          <div className="gov-progress">
            <div className="gov-progress__intro">
              <p className="gov-kicker">{t("progress.kicker")}</p>
              <h2 id="progress-title" className="gov-progress__title">
                {t("progress.title")}
              </h2>
              <p className="gov-progress__lead">{t("progress.lead")}</p>
            </div>
            <div className="gov-progress__body">
              <p className="gov-progress__upcoming-title">{t("progress.upcomingTitle")}</p>
              <ul className="gov-progress__upcoming" role="list">
                {createCompanyContent.progressUpcoming.map((item) => (
                  <li key={item.key}>{t(`progress.upcoming.${item.key}`)}</li>
                ))}
              </ul>
              <p className="gov-progress__note">{t("progress.authNote")}</p>
              <div className="gov-progress__cta">
                <a className="gov-progress__button" href={getDomainUrl("sso", "/login")}>
                  <span className="fr-icon-account-circle-line" aria-hidden="true" />
                  {t("progress.authCta")}
                </a>
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
          <ul className="gov-link-rows" role="list">
            {createCompanyContent.obligations.map((item) => (
              <li key={item.key}>
                <Link className="gov-link-row" href={item.href}>
                  <span className="gov-link-row__content">
                    <span className="gov-link-row__title">
                      {t(`obligations.items.${item.key}.title`)}
                    </span>
                    <span className="gov-link-row__desc">
                      {t(`obligations.items.${item.key}.desc`)}
                    </span>
                  </span>
                  <span className="fr-icon-arrow-right-line gov-link-row__arrow" aria-hidden="true" />
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
          <ul className="gov-link-rows" role="list">
            {createCompanyContent.resources.map((item) => (
              <li key={item.key}>
                <Link className="gov-link-row" href={item.href}>
                  <span className="gov-link-row__content">
                    <span className="gov-link-row__title">
                      {t(`resources.items.${item.key}.title`)}
                    </span>
                    <span className="gov-link-row__desc">
                      {t(`resources.items.${item.key}.desc`)}
                    </span>
                  </span>
                  <span className="fr-icon-arrow-right-line gov-link-row__arrow" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="gov-caption">{t("resources.note")}</p>
        </div>
      </section>

      {/* 11 — FAQ: compact, native, accessible accordion (no JS needed). */}
      <section id="faq" className="gov-section gov-service-anchor" aria-labelledby="faq-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("faq.kicker")}</p>
              <h2 id="faq-title" className="gov-section__title">
                {t("faq.title")}
              </h2>
            </div>
          </div>
          <div className="gov-faq">
            {createCompanyContent.faq.map((item) => (
              <details key={item.key} className="gov-faq__item">
                <summary className="gov-faq__summary">
                  {t(`faq.items.${item.key}.question`)}
                  <span className="fr-icon-arrow-down-s-line" aria-hidden="true" />
                </summary>
                <p className="gov-faq__answer">{t(`faq.items.${item.key}.answer`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — Besoin d'aide ?: discreet closing, never a huge contact block. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="help-title">
        <div className="gov-section__container">
          <div className="gov-help">
            <p className="gov-kicker">{t("help.kicker")}</p>
            <h2 id="help-title" className="gov-section__title">
              {t("help.title")}
            </h2>
            <p className="gov-lead">{t("help.lead")}</p>
            <div className="gov-help__actions">
              <CtaButtonsGroup
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