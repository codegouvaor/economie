"use client";

import * as React from "react";
import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import { NewsletterForm } from "./newsletter-form";
import { FacebookIcon } from "@/components/ui/icons/FacebookIcon";
import { InstagramIcon } from "@/components/ui/icons/InstagramIcon";
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon";
import { ThreadsIcon } from "@/components/ui/icons/ThreadsIcon";
import { TwitterIcon } from "@/components/ui/icons/TwitterIcon";

/** Icon of each social account, keyed by the `follow` list below. */
const SOCIAL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  x: TwitterIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  threads: ThreadsIcon,
};

/**
 * Social accounts of the ministry. The hrefs are placeholders (the ministry's
 * real accounts do not exist yet); labels resolve under
 * `stayInTouch.follow.items.<key>`.
 */
const FOLLOW_LINKS = [
  { key: "x", href: "https://x.com" },
  { key: "facebook", href: "https://www.facebook.com" },
  { key: "linkedin", href: "https://www.linkedin.com" },
  { key: "instagram", href: "https://www.instagram.com" },
  { key: "threads", href: "https://www.threads.net" },
] as const;

/**
 * “Stay in touch” band of the Government Footer: newsletter subscription and
 * the ministry's social accounts.
 *
 * Newsletter and social accounts are deliberately absent from the homepage —
 * they live in the footer, a secondary zone of the portal, so they never
 * compete with the public services of the page.
 */
export function StayInTouch() {
  const t = useTranslations("stayInTouch");

  return (
    <div className="gov-stay-in-touch">
      <div className="gov-section__container gov-stay-in-touch__inner">
        <div className="gov-stay-in-touch__newsletter">
          <h2 className="gov-stay-in-touch__title">{t("newsletter.title")}</h2>
          <p className="gov-stay-in-touch__desc">{t("newsletter.desc")}</p>
          <NewsletterForm />
        </div>
        <div className="gov-stay-in-touch__follow">
          <h2 className="gov-stay-in-touch__follow-title">{t("follow.title")}</h2>
          <ul className="gov-stay-in-touch__list" role="list">
            {FOLLOW_LINKS.map((item) => {
              const Icon = SOCIAL_ICONS[item.key];
              return (
                <li key={item.key}>
                  <a
                    className="gov-stay-in-touch__icon"
                    href={item.href}
                    aria-label={t(`follow.items.${item.key}`)}
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
  );
}
