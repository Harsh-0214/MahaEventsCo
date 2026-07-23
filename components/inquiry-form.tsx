"use client";

import { useRef, useState, type FormEvent } from "react";
import { eventTypes } from "@/lib/content";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  message: "",
};

function validateField(name: keyof FormValues, value: string): string | undefined {
  switch (name) {
    case "name":
      return value.trim().length < 2 ? "Please enter your full name." : undefined;
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        ? undefined
        : "Please enter a valid email address.";
    case "phone":
      return value.trim().length < 7 ? "Please enter a valid phone number." : undefined;
    case "eventType":
      return value ? undefined : "Please select an event type.";
    case "eventDate":
      return value ? undefined : "Please choose an event date.";
    case "message":
      return value.trim().length < 10 ? "Tell us a little more — at least 10 characters." : undefined;
    default:
      return undefined;
  }
}

function CheckCircleIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 20.5l4.5 4.5L27 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="animate-spin" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const inputClass =
  "flex min-h-11 w-full rounded-lg border border-(--color-border-strong) bg-(--color-surface) px-4 py-2.5 text-base text-(--color-text) transition-colors duration-150 ease-out placeholder:text-(--color-text-muted)/60 focus-visible:border-(--color-accent) focus-visible:outline-none aria-invalid:border-red-500";

const FIELD_ORDER: Array<keyof FormValues> = [
  "name",
  "email",
  "phone",
  "eventType",
  "eventDate",
  "message",
];

export function InquiryForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fieldRefs = useRef<Partial<Record<keyof FormValues, HTMLElement | null>>>({});

  function handleChange(name: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(name: keyof FormValues) {
    const error = validateField(name, values[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: FormErrors = {};
    (Object.keys(values) as Array<keyof FormValues>).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) nextErrors[key] = error;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = FIELD_ORDER.find((key) => nextErrors[key]);
      if (firstInvalid) fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitting(false);
    setSubmitted(true);
    setValues(initialValues);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-(--color-surface) px-8 py-16 text-center shadow-[0_10px_30px_rgba(41,39,31,0.1)]">
        <div className="text-(--color-accent)">
          <CheckCircleIcon />
        </div>
        <h3 className="mt-6 font-(family-name:--font-display) text-2xl text-(--color-text)">
          Thank you — your inquiry is in.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-(--color-text-muted)">
          We&rsquo;ve received your details and will be in touch within 1–2 business days.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-(--color-accent) px-6 text-sm font-medium text-(--color-accent-strong) transition-[background-color,color,transform] duration-150 ease-out hover:bg-(--color-accent) hover:text-white active:scale-[0.97]"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative overflow-hidden rounded-2xl bg-(--color-surface) p-6 shadow-[0_10px_30px_rgba(41,39,31,0.1)] sm:p-10"
    >
      <span
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-(--color-olive) via-(--color-gold-soft) to-(--color-olive)"
        aria-hidden="true"
      />
      <p className="mb-6 text-xs text-(--color-text-muted)">
        All fields are required.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-(--color-text)">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            ref={(el) => {
              fieldRefs.current.name = el;
            }}
            autoComplete="name"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-(--color-text)">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            ref={(el) => {
              fieldRefs.current.email = el;
            }}
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium text-(--color-text)">
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            ref={(el) => {
              fieldRefs.current.phone = el;
            }}
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClass}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="eventType" className="text-sm font-medium text-(--color-text)">
            Event Type <span aria-hidden="true">*</span>
          </label>
          <select
            id="eventType"
            ref={(el) => {
              fieldRefs.current.eventType = el;
            }}
            value={values.eventType}
            onChange={(e) => handleChange("eventType", e.target.value)}
            onBlur={() => handleBlur("eventType")}
            aria-required="true"
            aria-invalid={!!errors.eventType}
            aria-describedby={errors.eventType ? "eventType-error" : undefined}
            className={inputClass}
          >
            <option value="">Select an event type</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p id="eventType-error" role="alert" className="text-sm text-red-600">
              {errors.eventType}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="eventDate" className="text-sm font-medium text-(--color-text)">
            Event Date <span aria-hidden="true">*</span>
          </label>
          <input
            id="eventDate"
            ref={(el) => {
              fieldRefs.current.eventDate = el;
            }}
            type="date"
            value={values.eventDate}
            onChange={(e) => handleChange("eventDate", e.target.value)}
            onBlur={() => handleBlur("eventDate")}
            aria-required="true"
            aria-invalid={!!errors.eventDate}
            aria-describedby={errors.eventDate ? "eventDate-error" : undefined}
            className={inputClass}
          />
          {errors.eventDate && (
            <p id="eventDate-error" role="alert" className="text-sm text-red-600">
              {errors.eventDate}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-(--color-text)">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            ref={(el) => {
              fieldRefs.current.message = el;
            }}
            rows={5}
            placeholder="Tell us about your event — venue, guest count, style you love..."
            value={values.message}
            onChange={(e) => handleChange("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={inputClass}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="text-sm text-red-600">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-(--color-accent) px-6 text-sm font-medium text-white transition-[background-color,transform] duration-150 ease-out hover:bg-(--color-accent-strong) active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {submitting ? (
          <>
            <SpinnerIcon />
            Sending...
          </>
        ) : (
          "Send Inquiry"
        )}
      </button>
    </form>
  );
}
