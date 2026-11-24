import TextRoll from "@/components/animations/TextRoll";

const fieldClassName =
  "w-full appearance-none rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground shadow-none outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus-visible:border-accent";

const labelClassName = "mb-2 block text-sm font-medium text-foreground";

export default function ContactForm() {
  return (
    <form className="space-y-6">
      {/* Name and email */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClassName}>
            Your name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            className={fieldClassName}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClassName}>
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            className={fieldClassName}
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className={labelClassName}>
          Subject
        </label>

        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="What is this regarding?"
          className={fieldClassName}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClassName}>
          Your message
        </label>

        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell me a little about your project or inquiry..."
          className={`${fieldClassName} min-h-40 resize-y`}
        />
      </div>

      {/* Submit button */}
      <button
        type="button"
        className="group flex justify-center gap-3 items-center w-full sm:w-auto px-6 py-4 font-medium text-sm text-accent-contrast bg-accent rounded-full cursor-pointer hover:opacity-90 transition-all"
      >
        <TextRoll hoverClassName="">Send message</TextRoll>
        <span
          aria-hidden="true"
          className="group-hover:translate-x-1 transition-transform"
        >
          →
        </span>
      </button>
    </form>
  );
}
