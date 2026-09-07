"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { getDomainUrl } from "@/lib/domains";
import { ministryHome } from "@/lib/home-content";
import { CtaButtonsGroup } from "@/components/public/content/ads-fragments";

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
 *
 * The ministry-only layout below is expressed with the ADS design tokens
 * (`var(--ads-*)`, provided by `@codegouvaor/react-ads/main.css`) and the
 * ADS `ButtonsGroup` / icon classes — no local stylesheet.
 */
export function MonEspace() {
  const t = useTranslations("home");
  const { isAuthenticated, isLoading } = useAuth();

  const items = ministryHome.monEspace.items;
  const benefits = ministryHome.monEspace.benefits;

  return (
    <div
      style={{
        padding: "1.75rem",
        background: "var(--ads-color-background)",
        border: "1px solid var(--ads-color-border)",
        borderLeft: "4px solid var(--ads-color-primary)",
      }}
    >
      <div style={{ maxWidth: "48rem" }}>
        <p className="gov-kicker">{t("monEspace.kicker")}</p>
        <h2 id="espace-title" style={{ margin: "0 0 0.5rem" }}>
          {t("monEspace.title")}
        </h2>
        <p style={{ margin: "0", lineHeight: 1.6 }}>{t("monEspace.lead")}</p>
      </div>

      {isAuthenticated && !isLoading ? (
        <div style={{ marginTop: "1.25rem" }}>
          <ul
            className="fr-grid-row fr-grid-row--gutters"
            role="list"
            style={{ listStyle: "none", margin: "0", padding: "0" }}
          >
            {items.map((item) => (
              <li key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <a
                  href={item.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: 600,
                    textUnderlineOffset: "0.2em",
                  }}
                >
                  <span className="fr-icon-arrow-right-line" aria-hidden="true" />
                  {t(`monEspace.items.${item.key}`)}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "1.5rem" }}>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("monEspace.cta"),
                  href: ESPACE_HREF,
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "1.25rem" }}>
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
            {benefits.map((benefit) => (
              <li
                key={benefit.key}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                }}
              >
                <span
                  className={benefit.iconId}
                  aria-hidden="true"
                  style={{ fontSize: "1.125rem", color: "var(--ads-color-primary)" }}
                />
                {t(`monEspace.items.${benefit.key}`)}
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
            {t("monEspace.authNote")}
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("monEspace.cta"),
                  href: getDomainUrl("sso", "/login"),
                  iconId: "fr-icon-account-circle-line",
                  iconPosition: "left",
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
