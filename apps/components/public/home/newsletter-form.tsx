"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter subscription form of the home “social” section.
 *
 * The form validates the address client-side and confirms the subscription.
 * There is no public subscription API yet (the server endpoint is restricted
 * to the admin area), so the submit is simulated: this component is the seam
 * where a future public endpoint plugs in — swap the simulated success for a
 * call to the API (e.g. `newsletterApi.subscribe(email)`) and surface its
 * response, without changing the markup or the styles.
 */
export function NewsletterForm() {
  const t = useTranslations("home.social.newsletter");

  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "error" | "success">(
    "idle",
  );
  const [error, setError] = React.useState<string | null>(null);

  const inputId = React.useId();
  const errorId = React.useId();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setStatus("error");
      setError(t("invalidEmail"));
      return;
    }

    setStatus("success");
    setError(null);
    setEmail("");
  }

  return (
    <form className="gov-home-social__form" onSubmit={handleSubmit} noValidate>
      <div className="gov-home-social__form-row">
        <label className="sr-only" htmlFor={inputId}>
          {t("label")}
        </label>
        <input
          id={inputId}
          className="gov-home-social__input"
          type="email"
          autoComplete="email"
          placeholder={t("placeholder")}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setError(null);
            }
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? errorId : undefined}
        />
        <button type="submit" className="gov-home-social__button">
          {t("submit")}
        </button>
      </div>

      {status === "error" && error && (
        <p id={errorId} className="gov-home-social__form-error" role="alert">
          {error}
        </p>
      )}
      {status === "success" && (
        <p className="gov-home-social__form-success" role="status">
          {t("success")}
        </p>
      )}

      <p className="gov-home-social__form-hint">{t("hint")}</p>
    </form>
  );
}