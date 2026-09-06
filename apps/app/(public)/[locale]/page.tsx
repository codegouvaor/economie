import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates, resolveLocaleParam } from "@/lib/localized-metadata";
import { getDomainUrl } from "@/lib/domains";
import { ministryHome } from "@/lib/home-content";
import { searchPath } from "@/lib/site-structure";
import { PortalSearchBar } from "@/components/public/search/portal-search-bar";
import {
  ArticleCard,
  CtaButtonsGroup,
  LinkTile,
  SearchSuggestionTag,
} from "@/components/public/content/ads-fragments";
import { MonEspace } from "@/components/public/home/mon-espace";

const HOME_PATH = "/";
const NEWS_PATH = "/news";
const SERVICES_PATH = "/services";
const ENTERPRISES_PATH = "/entreprises";
const FINANCES_PATH = "/finances-publiques";
const DATA_PATH = "/donnees-et-ressources";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);

  const tHome = await getTranslations({ locale, namespace: "home" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  return {
    title: { absolute: tHome("metaTitle") },
    description: tMeta("description"),
    ...localizedAlternates(locale, HOME_PATH),
  };
}

/**
 * Homepage of the Ministry of Economy and Finance — the single digital entry
 * point of the ministry application.
 *
 * The page answers three questions immediately: what does the ministry do
 * (domains), what can I do here (services, mon espace), what can I consult
 * (data, budget, publications). Every section is driven by the
 * `ministryHome` configuration (lib/home-content.ts) and the message
 * catalogs, so the content can evolve without rewriting the interface.
 */
export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });

  // “Accéder à mes services” is oriented towards MyGouv: sign in through the
  // SSO, exactly like the header's “Mon espace” quick-access item.
  const myGouvLoginUrl = getDomainUrl("sso", "/login");

  return (
    <>
      {/* 01 — Hero: institutional introduction, typography first */}
      <section className="gov-home-hero gov-section" aria-labelledby="home-hero-title">
        <div className="gov-section__container">
          <p className="gov-kicker">{t("hero.kicker")}</p>
          <h1 id="home-hero-title" className="gov-home-hero__title">
            {t("hero.title")}
          </h1>
          <p className="gov-lead">{t("hero.lead")}</p>
          <div className="gov-home-hero__actions">
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("hero.servicesCta"),
                  href: myGouvLoginUrl,
                  priority: "primary",
                  iconId: "fr-icon-account-circle-line",
                },
                {
                  children: t("hero.economyCta"),
                  href: ministryHome.hero.secondaryCta.href,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 02 — Search: “Que recherchez-vous ?” */}
      <section className="gov-section gov-section--subtle" aria-labelledby="home-search-title">
        <div className="gov-section__container">
          <div className="gov-home-search">
            <p className="gov-kicker">{t("search.kicker")}</p>
            <h2 id="home-search-title" className="gov-section__title">
              {t("search.title")}
            </h2>
            <p className="gov-lead">{t("search.lead")}</p>
            <PortalSearchBar label={t("search.label")} placeholder={t("search.placeholder")} />
            <div className="gov-home-search__popular">
              <p className="gov-home-search__popular-label" id="popular-searches-label">
                {t("search.popularLabel")}
              </p>
              <ul className="gov-popular-searches gov-popular-searches--left" aria-labelledby="popular-searches-label">
                {ministryHome.popularSearches.map((search) => (
                  <li key={search.key}>
                    <SearchSuggestionTag
                      label={t(`search.popular.${search.key}`)}
                      href={search.href}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Most used services */}
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
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("services.allLink"),
                  href: SERVICES_PATH,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {ministryHome.services.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <LinkTile
                  small
                  horizontal
                  title={t(`services.items.${item.key}.title`)}
                  desc={t(`services.items.${item.key}.desc`)}
                  href={item.href}
                  iconId={item.iconId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — The six functional domains */}
      <section className="gov-section gov-section--subtle" aria-labelledby="domains-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("domains.kicker")}</p>
              <h2 id="domains-title" className="gov-section__title">
                {t("domains.title")}
              </h2>
              <p className="gov-lead">{t("domains.lead")}</p>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {ministryHome.domains.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <LinkTile
                  title={t(`domains.items.${item.key}.title`)}
                  desc={t(`domains.items.${item.key}.desc`)}
                  href={item.href}
                  iconId={item.iconId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Mon espace (MyGouv) */}
      <section className="gov-section" aria-labelledby="espace-title">
        <div className="gov-section__container">
          <MonEspace />
        </div>
      </section>

      {/* 06 — Key figures */}
      <section className="gov-section gov-section--subtle" aria-labelledby="stats-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("stats.kicker")}</p>
              <h2 id="stats-title" className="gov-section__title">
                {t("stats.title")}
              </h2>
              <p className="gov-lead">{t("stats.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("stats.exploreLink"),
                  href: DATA_PATH,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <ul className="gov-home-stats" role="list">
            {ministryHome.indicators.map((indicator) => (
              <li key={indicator.key}>
                <a className="gov-home-stat" href={indicator.href}>
                  <span className="gov-home-stat__value">{indicator.value}</span>
                  <span className="gov-home-stat__label">
                    {t(`stats.items.${indicator.key}.label`)}
                  </span>
                  <span className="gov-home-stat__arrow fr-icon-arrow-right-line" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="gov-caption">{t("stats.note")}</p>
        </div>
      </section>

      {/* 07 — State budget */}
      <section className="gov-section" aria-labelledby="budget-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("budget.kicker")}</p>
              <h2 id="budget-title" className="gov-section__title">
                {t("budget.title")}
              </h2>
              <p className="gov-lead">{t("budget.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("budget.exploreLink"),
                  href: FINANCES_PATH,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <ul className="gov-home-budget" role="list">
            {ministryHome.budget.items.map((item) => (
              <li key={item.key} className="gov-home-budget__item">
                <div className="gov-home-budget__row">
                  <span className="gov-home-budget__label">
                    {t(`budget.items.${item.key}.label`)}
                  </span>
                  <span className="gov-home-budget__value">{item.value}</span>
                </div>
                <div
                  className="gov-home-budget__track"
                  role="img"
                  aria-hidden="true"
                >
                  <span
                    className="gov-home-budget__bar"
                    style={{ width: `${item.ratio}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="gov-caption">{t("budget.note")}</p>
        </div>
      </section>

      {/* 08 — À la une */}
      <section className="gov-section gov-section--subtle" aria-labelledby="news-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("news.kicker")}</p>
              <h2 id="news-title" className="gov-section__title">
                {t("news.title")}
              </h2>
              <p className="gov-lead">{t("news.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("news.allLink"),
                  href: NEWS_PATH,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-lg-7">
              <ArticleCard
                title={t(ministryHome.news.featured.titleKey)}
                desc={
                  ministryHome.news.featured.textKey
                    ? t(ministryHome.news.featured.textKey)
                    : undefined
                }
                tag={t(ministryHome.news.featured.tagKey)}
                date={t(ministryHome.news.featured.dateKey)}
                href={ministryHome.news.featured.href}
                size="large"
              />
            </div>
            <div className="fr-col-12 fr-col-lg-5">
              <ul className="gov-card-list">
                {ministryHome.news.secondary.map((article) => (
                  <li key={article.href}>
                    <ArticleCard
                      title={t(article.titleKey)}
                      tag={t(article.tagKey)}
                      date={t(article.dateKey)}
                      href={article.href}
                      size="small"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — Vous êtes une entreprise ? */}
      <section className="gov-section" aria-labelledby="enterprise-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("enterprise.kicker")}</p>
              <h2 id="enterprise-title" className="gov-section__title">
                {t("enterprise.title")}
              </h2>
              <p className="gov-lead">{t("enterprise.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("enterprise.cta"),
                  href: ENTERPRISES_PATH,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {ministryHome.enterprise.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-sm-6 fr-col-lg-3">
                <LinkTile
                  small
                  horizontal
                  title={t(`enterprise.items.${item.key}.title`)}
                  desc={t(`enterprise.items.${item.key}.desc`)}
                  href={item.href}
                  iconId="fr-icon-arrow-right-line"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Publications and resources */}
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
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("resources.allLink"),
                  href: DATA_PATH,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {ministryHome.resources.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-sm-6 fr-col-lg-3">
                <LinkTile
                  small
                  horizontal
                  title={t(`resources.items.${item.key}.title`)}
                  desc={t(`resources.items.${item.key}.desc`)}
                  href={item.href}
                  iconId="fr-icon-arrow-right-line"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — Besoin d'aide ? */}
      <section className="gov-section" aria-labelledby="help-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("help.kicker")}</p>
              <h2 id="help-title" className="gov-section__title">
                {t("help.title")}
              </h2>
              <p className="gov-lead">{t("help.lead")}</p>
            </div>
          </div>
          <ul className="gov-home-help" role="list">
            {ministryHome.help.map((item) => (
              <li key={item.key}>
                <a className="gov-home-help__link" href={item.href}>
                  {t(`help.items.${item.key}.title`)}
                  <span className="fr-icon-arrow-right-line" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}