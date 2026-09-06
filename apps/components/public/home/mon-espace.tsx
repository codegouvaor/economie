"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { getDomainUrl } from "@/lib/domains";
import { ministryHome } from "@/lib/home-content";
import type { HomeLink } from "@/lib/home-content";

const ESPACE_HREF = "/mon-espace";

/**
 * “Mon espace” home section, designed to work with MyGouv.
 *
 * For an authenticated user it presents the personal-space entries (mes
 * démarches, mes obligations, mes paiements…) and a single entry point to the
 * space. For an unauthenticated user it simply offers to sign in with MyGouv —
 * no second identity logic is developed inside the ministry.
 *
 * On the public portal the AuthProvider is not mounted, so `useAuth()` falls
 * back to its safe default (unauthenticated): the section then shows the
 * MyGouv sign-in action, exactly like the header's “Mon espace” quick-access
 * item.
 */
export function MonEspace() {
  const t = useTranslations("home");
  const { isAuthenticated, isLoading } = useAuth();

  const items: HomeLink[] = ministryHome.monEspace.items;

  return (
    <div className="gov-home-espace">
      <div className="gov-home-espace__intro">
        <p className="gov-kicker">{t("monEspace.kicker")}</p>
        <h3 className="gov-home-espace__title">{t("monEspace.title")}</h3>
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
          <p className="gov-home-espace__lead gov-home-espace__lead--standalone">
            {t("monEspace.lead")}
          </p>
          <div className="gov-home-espace__cta">
            <a
              className="gov-home-espace__button"
              href={getDomainUrl("sso", "/login")}
            >
              <span className="fr-icon-account-circle-line" aria-hidden="true" />
              {t("monEspace.loginCta")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}