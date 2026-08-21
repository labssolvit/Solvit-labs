import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { company } from "../data/company";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------ */
/*  Contact form — production-ready.                                   */
/*  Set VITE_CONTACT_ENDPOINT (e.g. Formspree, Basin, or a custom API) */
/*  to enable direct submission. Without it, the form composes a       */
/*  fully-formed email in the visitor's mail client instead.           */
/* ------------------------------------------------------------------ */

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

const PROJECT_TYPES = [
  "Website",
  "Web application",
  "3D / interactive experience",
  "E-commerce",
  "Performance & SEO",
  "Other",
];

const BUDGETS = ["Undisclosed", "$5k – $15k", "$15k – $40k", "$40k+", "Not sure yet"];

interface FormState {
  name: string;
  email: string;
  company: string;
  type: string;
  budget: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  type: "",
  budget: "",
  message: "",
};

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(form.email.trim())) errors.email = "Please enter a valid email address.";
  if (!form.type) errors.type = "Please select a project type.";
  if (form.message.trim().length < 10)
    errors.message = "Tell us a little more about the project (min. 10 characters).";
  return errors;
}

const fieldBase =
  "w-full border bg-transparent px-4 py-3.5 text-[0.95rem] text-paper placeholder:text-graphite transition-colors duration-300 focus:outline-none";

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusNote, setStatusNote] = useState("");

  const setField = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormState]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const fieldClass = (key: keyof FormState) =>
    cn(fieldBase, errors[key] ? "border-ember" : "border-line hover:border-fog/40 focus:border-ember");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setStatus("error");
      setStatusNote("Please review the highlighted fields.");
      return;
    }

    setStatus("submitting");
    setStatusNote("");

    if (ENDPOINT) {
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...form, source: "solvit-website" }),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        setStatus("success");
        setStatusNote("Inquiry sent. Solvit Labs will reply within 1–2 business days.");
        setForm(initialForm);
      } catch {
        setStatus("error");
        setStatusNote(
          "Something went wrong sending your inquiry. Please try again or email us directly."
        );
      }
    } else {
      // No endpoint configured — compose a real, fully-formed email.
      const subject = encodeURIComponent(`Project inquiry — ${form.type} (${form.name})`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || "—"}\nProject type: ${form.type}\nBudget: ${form.budget || "—"}\n\n${form.message}`
      );
      window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      setStatusNote(
        "Your email draft is ready — send it from your mail client and Solvit Labs will reply within 1–2 business days."
      );
    }
  };

  const submitting = status === "submitting";

  return (
    <section id="contact" className="bg-ink px-page py-28 text-paper md:py-40">
      <div className="max-page">
        <SectionHeading eyebrow="Contact">
          Start a <span className="text-ember">Project</span>
        </SectionHeading>

        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Info column */}
          <div data-reveal>
            <p className="max-w-md text-lg leading-relaxed text-fog/85">
              Tell us what you're building. We'll respond with a clear point of
              view on approach, timeline, and budget.
            </p>
            <div className="mt-12 space-y-8">
              <div>
                <p className="eyebrow mb-3 text-graphite">Email</p>
                <a
                  href={`mailto:${company.email}`}
                  className="u-link display text-xl font-medium text-paper"
                >
                  {company.email}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-3 text-graphite">Location</p>
                <p className="text-[0.95rem] text-fog/80">{company.location}</p>
              </div>
              <div>
                <p className="eyebrow mb-3 text-graphite">Response time</p>
                <p className="text-[0.95rem] text-fog/80">Within 1–2 business days</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} noValidate data-reveal data-delay="0.1">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="eyebrow mb-2.5 block text-smoke">
                  Name <span className="text-ember">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={setField}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Your name"
                  className={fieldClass("name")}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-xs text-ember-soft">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="eyebrow mb-2.5 block text-smoke">
                  Email <span className="text-ember">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={setField}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="you@company.com"
                  className={fieldClass("email")}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-xs text-ember-soft">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="eyebrow mb-2.5 block text-smoke">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={setField}
                  placeholder="Company (optional)"
                  className={fieldClass("company")}
                />
              </div>

              <div>
                <label htmlFor="type" className="eyebrow mb-2.5 block text-smoke">
                  Project Type <span className="text-ember">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={setField}
                  aria-invalid={!!errors.type}
                  aria-describedby={errors.type ? "type-error" : undefined}
                  className={cn(fieldClass("type"), "appearance-none bg-ink", !form.type && "text-graphite")}
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p id="type-error" className="mt-2 text-xs text-ember-soft">
                    {errors.type}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="budget" className="eyebrow mb-2.5 block text-smoke">
                  Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={setField}
                  className={cn(fieldClass("budget"), "appearance-none bg-ink", !form.budget && "text-graphite")}
                >
                  <option value="" disabled>
                    Select range (optional)
                  </option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="eyebrow mb-2.5 block text-smoke">
                  Message <span className="text-ember">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={setField}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  placeholder="What are you building, and what should it achieve?"
                  className={cn(fieldClass("message"), "resize-y")}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-xs text-ember-soft">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            {/* Honeypot — invisible to humans */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              onChange={() => undefined}
            />

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  "group inline-flex items-center gap-3 bg-paper px-7 py-4 font-display text-[0.82rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-400",
                  submitting ? "cursor-wait opacity-70" : "hover:bg-ember hover:text-white"
                )}
              >
                {submitting ? (
                  <>
                    Sending
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  </>
                ) : (
                  <>
                    Send Project Inquiry
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </>
                )}
              </button>

              <div aria-live="polite" role="status">
                {status === "success" && (
                  <p className="flex items-center gap-2 text-sm text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                    {statusNote}
                  </p>
                )}
                {status === "error" && statusNote && (
                  <p className="flex items-center gap-2 text-sm text-ember-soft">
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
                    {statusNote}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
