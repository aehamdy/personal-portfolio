export default function ContactPageFallback() {
  return (
    <section
      aria-label="Loading contact page"
      className="max-w-7xl mx-auto page-padding animate-pulse"
    >
      {/* Page heading */}
      <div className="max-w-3xl mb-16">
        <div className="mb-4 h-4 w-20 rounded bg-border" />

        <div className="space-y-3">
          <div className="h-16 sm:h-20 md:h-24 w-full max-w-2xl rounded bg-border" />
          <div className="h-16 sm:h-20 md:h-24 w-4/5 max-w-xl rounded bg-border" />
        </div>

        <div className="mt-6 max-w-xl space-y-2">
          <div className="h-4 w-full rounded bg-border" />
          <div className="h-4 w-11/12 rounded bg-border" />
          <div className="h-4 w-3/4 rounded bg-border" />
        </div>
      </div>

      {/* Contact content */}
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        {/* Contact information */}
        <aside className="flex flex-col justify-between gap-12">
          <div>
            <div className="mb-8">
              <div className="mb-3 h-3 w-24 rounded bg-border" />

              <div className="space-y-2">
                <div className="h-10 md:h-12 w-full max-w-sm rounded bg-border" />
                <div className="h-10 md:h-12 w-4/5 max-w-xs rounded bg-border" />
              </div>
            </div>

            <div className="max-w-md space-y-2">
              <div className="h-4 w-full rounded bg-border" />
              <div className="h-4 w-11/12 rounded bg-border" />
              <div className="h-4 w-4/5 rounded bg-border" />
            </div>
          </div>

          {/* Contact details */}
          <div className="space-y-8">
            {Array.from({ length: 2 }, (_, index) => (
              <div key={index}>
                <div className="mb-3 h-3 w-16 rounded bg-border" />
                <div className="h-5 w-48 max-w-full rounded bg-border" />
              </div>
            ))}

            {/* Social links */}
            <div>
              <div className="mb-4 h-3 w-28 rounded bg-border" />

              <div className="flex gap-5">
                {Array.from({ length: 3 }, (_, index) => (
                  <div key={index} className="h-4 w-14 rounded bg-border" />
                ))}
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="pt-6 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-border" />
              <div className="h-4 w-64 max-w-full rounded bg-border" />
            </div>
          </div>
        </aside>

        {/* Contact form */}
        <div className="py-10 px-6 sm:py-14 sm:px-10 bg-surface-elevated rounded-main">
          <div className="mb-10">
            <div className="mb-3 h-3 w-24 rounded bg-border" />

            <div className="h-10 sm:h-12 w-full max-w-md rounded bg-border" />

            <div className="mt-4 space-y-2">
              <div className="h-4 w-full rounded bg-border" />
              <div className="h-4 w-4/5 rounded bg-border" />
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              {Array.from({ length: 2 }, (_, index) => (
                <div key={index}>
                  <div className="mb-2 h-3 w-20 rounded bg-border" />
                  <div className="h-12 rounded-lg border border-border bg-background" />
                </div>
              ))}
            </div>

            {Array.from({ length: 2 }, (_, index) => (
              <div key={index}>
                <div className="mb-2 h-3 w-24 rounded bg-border" />
                <div className="h-12 rounded-lg border border-border bg-background" />
              </div>
            ))}

            <div>
              <div className="mb-2 h-3 w-20 rounded bg-border" />
              <div className="h-32 rounded-lg border border-border bg-background" />
            </div>

            <div className="h-12 w-40 rounded-full bg-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
