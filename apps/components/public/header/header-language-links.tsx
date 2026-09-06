"use client";

import { useCallback } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { localeDisplayNames } from "@/i18n/locales";

/**
 * Compact language switcher of the header top band: one link per supported
 * language, displayed under its own endonym (« Français », « English »).
 *
 * Same behaviour as the footer `LocaleSwitcher`: switching keeps the current
 * page and its query string, and the locale prefix is managed by next-intl.
 * It deliberately avoids `useSearchParams` for the same hydration reason as
 * the footer switcher — the query string is read from `window.location` at
 * click time.
 */
export function HeaderLanguageLinks() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const setLang = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) {
        return;
      }
      const query = typeof window !== "undefined" ? window.location.search : "";
      router.replace(query ? `${pathname}${query}` : pathname, { locale: nextLocale });
    },
    [locale, pathname, router]
  );

  return (
    <ul className="gov-top-band__languages" role="list">
      {routing.locales.map((code) => {
        const isCurrent = code === locale;
        return (
          <li key={code}>
            <a
              href="#"
              className="gov-top-band__language"
              lang={code}
              aria-current={isCurrent ? "true" : undefined}
              onClick={(event) => {
                event.preventDefault();
                setLang(code);
              }}
            >
              {localeDisplayNames[code]}
            </a>
          </li>
        );
      })}
    </ul>
  );
}