import type { ComponentType } from "react";
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
import { NewsletterForm } from "@/components/public/home/newsletter-form";
import { FacebookIcon } from "@/components/ui/icons/FacebookIcon";
import { InstagramIcon } from "@/components/ui/icons/InstagramIcon";
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon";
import { ThreadsIcon } from "@/components/ui/icons/ThreadsIcon";
import { TwitterIcon } from "@/components/ui/icons/TwitterIcon";

/** Icon of each social account, keyed by the `social.follow` config key. */
const SOCIAL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  x: TwitterIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  threads: ThreadsIcon,
};

const HOME_PATH = "/";
const NEWS_PATH = "/news";
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
 * point of the economy and finance platform.
 *
 * The page is organised around usages, not the ministry's internal
 * organisation. It tells one story, section after section:
 *
 *   01 Hero / Accès immédiat      — who we are, and search first
 *   02 Que souhaitez-vous faire ? — user intentions, each a real parcours
 *   03 Mon espace                 — the personal space (auth via MyGouv)
 *   04 Selon votre situation      — audience orientation on the same platform
 *   05 Explorer les domaines      — the six functional domains
 *   06 L'économie en chiffres     — key economic indicators
 *   07 Actualités et informations — ministry news, after services
 *   08 Le ministère               — discreet institutional closing
 *   09 Rester en contact          — newsletter + social accounts
 *
 * Every section is driven by the `ministryHome` configuration
 * (lib/home-content.ts) and the message catalogs, so the content can evolve
 * without rewriting the interface. The six domains keep the same hrefs as
 * the header navigation.
 */
export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      {/* 01 — Hero / Accès immédiat: institutional statement and the main
          search, visually the most important element of the page. */}
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

      {/* 02 — Que souhaitez-vous faire ?: the first functional entry point,
          user intentions each mapped to a real destination. */}
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

      {/* 04 — Selon votre situation: audience orientation towards the right
          parcours of the same platform. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="audiences-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("audiences.kicker")}</p>
              <h2 id="audiences-title" className="gov-section__title">
                {t("audiences.title")}
              </h2>
              <p className="gov-lead">{t("audiences.lead")}</p>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {ministryHome.audiences.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <LinkTile
                  title={t(`audiences.items.${item.key}.title`)}
                  desc={t(item.descKey)}
                  href={item.href}
                  iconId={item.iconId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Explorer l'économie et les finances: the six functional domains.
          Visually secondary to the usage sections above. */}
      <section className="gov-section" aria-labelledby="domains-title">
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
                  small
                  horizontal
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

      {/* 06 — L'économie d'Astoria en chiffres: synthetic view of the
          country's economy, driven by the indicators config (the seam where a
          future data source plugs in). */}
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

      {/* 07 — Actualités et informations: one featured article, several
          secondary ones. News comes after services and usages. */}
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

      {/* 08 — Le Ministère de l'Économie et des Finances: discreet
          institutional closing. The user first does, then understands, then
          discovers the institution. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="ministry-title">
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

      {/* 09 — Rester en contact: newsletter subscription and the ministry's
          social accounts. Compact, secondary strip at the bottom of the page:
          the newsletter is the primary content, the social icons secondary. */}
      <section className="gov-section" aria-labelledby="social-newsletter-title">
        <div className="gov-section__container">
          <div className="gov-home-social">
            <div className="gov-home-social__newsletter">
              <p className="gov-kicker">{t("social.newsletter.kicker")}</p>
              <h2 id="social-newsletter-title" className="gov-section__title">
                {t("social.newsletter.title")}
              </h2>
              <p className="gov-lead">{t("social.newsletter.desc")}</p>
              <NewsletterForm />
            </div>
            <div className="gov-home-social__follow">
              <h2 id="social-follow-title" className="gov-home-social__follow-title">
                {t("social.follow.title")}
              </h2>
              <ul
                className="gov-home-social__list"
                aria-labelledby="social-follow-title"
                role="list"
              >
                {ministryHome.social.follow.map((item) => {
                  const Icon = SOCIAL_ICONS[item.key];
                  return (
                    <li key={item.key}>
                      <a
                        className="gov-home-social__icon"
                        href={item.href}
                        aria-label={t(`social.follow.items.${item.key}`)}
                      >
                        <Icon />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}