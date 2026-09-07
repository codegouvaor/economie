import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates, resolveLocaleParam } from "@/lib/localized-metadata";
import { ministryHome } from "@/lib/home-content";
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
/** Données & Ressources → Statistiques & indicateurs. */
const STATS_PATH = "/donnees-et-ressources/indicateurs";
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
 * Homepage of the Ministry of Economy and Finance — the functional front
 * door of the economy and finance platform.
 *
 * The header allows exploring the ministry (six domains, unchanged); this
 * page allows acting. It answers “what can I do now?”, section after
 * section:
 *
 *   01 Hero / Recherche            — who we are, and search first
 *   02 Que souhaitez-vous faire ?  — frequent actions, each a real parcours
 *   03 Mon espace                  — the personal space (auth via MyGouv)
 *   04 Informations importantes    — operational alerts, before general news
 *   05 L'économie d'Astoria        — key economic indicators
 *   06 Budget de l'État            — public finances, made understandable
 *   07 Actualités                  — ministry news, after usages
 *   08 Ressources                  — compact shortcut to documentary content
 *   09 Le ministère                — discreet institutional closing
 *
 * Every section is driven by the `ministryHome` configuration
 * (lib/home-content.ts) and the message catalogs, so the content can evolve
 * without rewriting the interface. The six domains deliberately do not
 * appear here as a second navigation: they belong to the header. Newsletter
 * and social accounts are relegated to the footer (stay-in-touch zone of
 * GovernmentFooter).
 */
export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const tNavPanel = await getTranslations({ locale, namespace: "nav.panel" });

  return (
    <>
      {/* 01 — Hero / Recherche: institutional statement and the main search,
          visually the most important element of the page. */}
      <section className="gov-home-hero gov-section" aria-labelledby="home-hero-title">
        <div className="gov-section__container">
          <p className="gov-kicker">{t("hero.kicker")}</p>
          <h1 id="home-hero-title" className="gov-home-hero__title">
            {t("hero.title")}
          </h1>
          <p className="gov-lead">{t("hero.lead")}</p>
          <div className="gov-home-hero__search">
            <h2 id="home-search-title" className="gov-home-hero__search-title">
              {t("search.title")}
            </h2>
            <PortalSearchBar label={t("search.label")} placeholder={t("search.placeholder")} />
            <div className="gov-home-hero__popular">
              <p className="gov-home-hero__popular-label" id="popular-searches-label">
                {t("search.popularLabel")}
              </p>
              <ul className="gov-popular-searches" aria-labelledby="popular-searches-label">
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

      {/* 02 — Que souhaitez-vous faire ?: the functional heart of the page,
          concrete frequent actions each mapped to a real destination. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="actions-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("actions.kicker")}</p>
              <h2 id="actions-title" className="gov-section__title">
                {t("actions.title")}
              </h2>
              <p className="gov-lead">{t("actions.lead")}</p>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {ministryHome.actions.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <LinkTile
                  title={t(`actions.items.${item.key}.title`)}
                  desc={t(item.descKey)}
                  href={item.href}
                  iconId={item.iconId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Mon espace: the personal space of the ministry. MyGouv provides
          the identity/SSO; this section presents the space, not MyGouv. */}
      <section className="gov-section" aria-labelledby="espace-title">
        <div className="gov-section__container">
          <MonEspace />
        </div>
      </section>

      {/* 04 — Informations importantes: operational alerts (échéance,
          changement réglementaire, mesure, réforme…). They come before
          general news when an item has an operational importance. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="alerts-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("alerts.kicker")}</p>
              <h2 id="alerts-title" className="gov-section__title">
                {t("alerts.title")}
              </h2>
              <p className="gov-lead">{t("alerts.lead")}</p>
            </div>
          </div>
          <ul className="gov-home-alerts" role="list">
            {ministryHome.importantInfo.map((item) => (
              <li key={item.key}>
                <a className="gov-home-alert" href={item.href}>
                  <span className={`gov-home-alert__icon ${item.iconId}`} aria-hidden="true" />
                  <span className="gov-home-alert__content">
                    <span className="gov-home-alert__tag">{t(`alerts.items.${item.key}.tag`)}</span>
                    <span className="gov-home-alert__title">
                      {t(`alerts.items.${item.key}.title`)}
                    </span>
                    <span className="gov-home-alert__desc">
                      {t(`alerts.items.${item.key}.desc`)}
                    </span>
                  </span>
                  <span
                    className="gov-home-alert__arrow fr-icon-arrow-right-line"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — L'économie d'Astoria en chiffres: synthetic view of the
          country's economy, driven by the indicators config (the seam where a
          future data source plugs in). */}
      <section className="gov-section" aria-labelledby="stats-title">
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
                  href: STATS_PATH,
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
                  <span
                    className="gov-home-stat__arrow fr-icon-arrow-right-line"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
          <p className="gov-caption">{t("stats.note")}</p>
        </div>
      </section>

      {/* 06 — Budget de l'État: the State budget made understandable — total,
          revenue, expenditure, balance and debt. Sober on purpose: no chart
          until the real budget data is available. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="budget-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("budget.kicker")}</p>
              <h2 id="budget-title" className="gov-section__title">
                {t("budget.title")}
              </h2>
              <p className="gov-lead">{t("budget.lead")}</p>
            </div>
          </div>
          <div className="gov-home-budget">
            <div className="gov-home-budget__summary">
              <p className="gov-home-budget__label">{t("budget.totalLabel")}</p>
              <p className="gov-home-budget__total">{ministryHome.budget.total.value}</p>
              <CtaButtonsGroup
                buttons={[
                  {
                    children: t("budget.cta"),
                    href: ministryHome.budget.total.href,
                    priority: "secondary",
                    iconId: "fr-icon-arrow-right-line",
                  },
                ]}
              />
            </div>
            <ul className="gov-home-budget__figures" role="list">
              {ministryHome.budget.figures.map((figure) => (
                <li key={figure.key}>
                  <a className="gov-home-budget__figure" href={figure.href}>
                    <span className="gov-home-budget__figure-label">
                      {t(`budget.figures.${figure.key}`)}
                    </span>
                    <span className="gov-home-budget__figure-value">{figure.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="gov-caption">{t("budget.note")}</p>
        </div>
      </section>

      {/* 07 — Actualités: one featured article, several secondary ones. News
          comes after usages, figures and the budget — it no longer dominates
          the page. */}
      <section className="gov-section" aria-labelledby="news-title">
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

      {/* 08 — Ressources: compact shortcut to the most consulted documentary
          content of “Données & Ressources”. Not a sixth domain and not a
          second navigation — labels reuse the header vocabulary. */}
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
          <ul className="gov-home-resources" role="list">
            {ministryHome.resources.map((item) => (
              <li key={item.key}>
                <a className="gov-home-resources__link" href={item.href}>
                  {tNavPanel(item.key)}
                  <span className="fr-icon-arrow-right-line" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 09 — Le Ministère de l'Économie et des Finances: discreet
          institutional closing. The user first does, then understands, then
          discovers the institution. */}
      <section className="gov-section" aria-labelledby="ministry-title">
        <div className="gov-section__container">
          <div className="gov-home-ministry">
            <p className="gov-kicker">{t("ministry.kicker")}</p>
            <h2 id="ministry-title" className="gov-section__title">
              {t("ministry.title")}
            </h2>
            <p className="gov-home-ministry__lead">{t("ministry.lead")}</p>
            <ul className="gov-home-ministry__links" role="list">
              {ministryHome.ministry.map((link) => (
                <li key={link.key}>
                  <a className="gov-home-ministry__link" href={link.href}>
                    {t(`ministry.links.${link.key}.title`)}
                    <span className="fr-icon-arrow-right-line" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
