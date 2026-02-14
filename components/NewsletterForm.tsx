"use client";

import { FormEvent, useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="rounded-md border border-ink/15 bg-white p-4 text-sm text-ink">
        Thanks. You are on the list for release notes and bonus excerpts.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="w-full">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-ink/30 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-ink"
          placeholder="Email address"
          aria-describedby={error ? "newsletter-error" : undefined}
        />
        {error ? (
          <p id="newsletter-error" className="mt-2 text-xs text-red-700">
            {error}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        Join Updates
      </button>
    </form>
  );
}
