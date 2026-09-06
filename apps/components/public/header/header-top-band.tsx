import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { legalPaths } from "@/lib/site-structure";
import { HeaderLanguageLinks } from "@/components/public/header/header-language-links";

/**
 * Institutional top band of the portal.
 *
 * A discreet one-line band above the ministry identity:
 *
 *   République d'Astoria          Aide  Accessibilité  Français | English
 *
 * Its only role is to recall the institutional context (the Republic) and to
 * give a few global utilities — it must never become a second navigation.
 * The "Aide" and "Accessibilité" links point to real portal destinations;
 * the language links switch the current page to the other supported locale.
 */
export function HeaderTopBand() {
  const t = useTranslations("header.topBand");

  return (
    <div className="gov-top-band">
      <div className="gov-top-band__container">
        <Link href="/" className="gov-top-band__republic">
          {t("republic")}
        </Link>
        <nav className="gov-top-band__utilities" aria-label={t("languageLabel")}>
          <ul role="list">
            <li className="gov-top-band__utility gov-top-band__utility--link">
              <Link href="/contact">{t("help")}</Link>
            </li>
            <li className="gov-top-band__utility gov-top-band__utility--link">
              <Link href={legalPaths.accessibility}>{t("accessibility")}</Link>
            </li>
            <li className="gov-top-band__utility gov-top-band__utility--languages">
              <HeaderLanguageLinks />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}