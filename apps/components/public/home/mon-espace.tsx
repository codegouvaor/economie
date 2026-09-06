"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { getDomainUrl } from "@/lib/domains";
import { ministryHome } from "@/lib/home-content";

const ESPACE_HREF = "/mon-espace";

/**
 * “Mon espace” home section, designed to work with MyGouv.
 *
 * MyGouv is the State's central identity / SSO system: this section presents
 * the Economy and Finance personal space, not MyGouv itself. It shows the
 * space's main benefits to an unauthenticated user (mes démarches, mes
 * documents, mes paiements, mes notifications) with a single sign-in action
 * through MyGouv, and for an authenticated user the personal-space entries
 * and a single entry point to the space — designed to later carry dynamic
 * data (actions à effectuer, documents récents, statut des démarches…)
 * without inventing fictitious personal data.
 *
 * On the public portal the AuthProvider is not mounted, so `useAuth()` falls
 * back to its safe default (unauthenticated): the section then shows the
 * benefits and the MyGouv sign-in action, exactly like the header's
 * “Mon espace” quick-access item.
 */
export function MonEspace() {
  const t = useTranslations("home");
  const { isAuthenticated, isLoading } = useAuth();

  const items = ministryHome.monEspace.items;
  const benefits = ministryHome.monEspace.benefits;

  return (
    <div className="gov-home-espace">
      <div className="gov-home-espace__intro">
        <p className="gov-kicker">{t("monEspace.kicker")}</p>
        <h3 id="espace-title" className="gov-home-espace__title">
          {t("monEspace.title")}
        </h3>
        <p className="gov-home-espace__lead">{t("monEspace.lead")}</p>
      </div>

      {isAuthenticated && !isLoading ? (
        <div className="gov-home-espace__body">
          <ul className="gov-home-espace__list" role="list">
            {items.map((item) => (
              <li key={item.key}>
                <a className="gov-home-espace__link" href={item.href}>
                  <span className="fr-icon-arrow-right-line" aria-hidden="true" />
                  {t(`monEspace.items.${item.key}`)}
                </a>
              </li>
            ))}
          </ul>
          <div className="gov-home-espace__cta">
            <a className="gov-home-espace__button" href={ESPACE_HREF}>
              {t("monEspace.cta")}
              <span className="fr-icon-arrow-right-line" aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : (
        <div className="gov-home-espace__body">
          <ul className="gov-home-espace__benefits" role="list">
            {benefits.map((benefit) => (
              <li key={benefit.key} className="gov-home-espace__benefit">
                <span className={benefit.iconId} aria-hidden="true" />
                {t(`monEspace.items.${benefit.key}`)}
              </li>
            ))}
          </ul>
          <p className="gov-home-espace__note">{t("monEspace.authNote")}</p>
          <div className="gov-home-espace__cta">
            <a
              className="gov-home-espace__button"
              href={getDomainUrl("sso", "/login")}
            >
              <span className="fr-icon-account-circle-line" aria-hidden="true" />
              {t("monEspace.cta")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}