import HomeScrollScene from "@/components/animations/HomeScrollScene";

export default function HomePageFallback() {
  return (
    <HomeScrollScene
      hero={
        <section className="h-full animate-pulse">
          <div className="relative flex h-full flex-col justify-end px-6 pb-12 md:px-12 md:pb-16">
            {/* Hero heading */}
            <div className="mb-6 space-y-3">
              <div className="h-[12vw] max-h-32 w-4/5 rounded bg-border" />
              <div className="h-[12vw] max-h-32 w-3/5 rounded bg-border" />
            </div>

            {/* Hero description and actions */}
            <div className="max-w-xl space-y-3">
              <div className="h-4 w-full rounded bg-border" />
              <div className="h-4 w-4/5 rounded bg-border" />
            </div>

            <div className="mt-8 h-12 w-36 rounded-full bg-border" />
          </div>
        </section>
      }
      content={
        <main className="relative bg-background">
          <section className="mx-auto overflow-hidden rounded-main bg-surface-elevated text-accent-contrast animate-pulse">
            {/* About section */}
            <div className="grid gap-10 px-6 py-16 md:grid-cols-2 md:px-12 md:py-24">
              <div className="space-y-4">
                <div className="h-4 w-20 rounded bg-border" />
                <div className="h-12 w-full max-w-md rounded bg-border" />
                <div className="h-12 w-4/5 max-w-sm rounded bg-border" />
              </div>

              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, index) => (
                  <div
                    key={index}
                    className={`h-4 rounded bg-border ${
                      index === 4 ? "w-3/5" : "w-full"
                    }`}
                  />
                ))}
                <div className="mt-6 h-10 w-32 rounded-full bg-border" />
              </div>
            </div>

            {/* Services section */}
            <div className="px-6 py-16 md:px-12 md:py-24">
              <div className="mb-10 space-y-4">
                <div className="h-4 w-24 rounded bg-border" />
                <div className="h-10 w-64 max-w-full rounded bg-border" />
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }, (_, index) => (
                  <div
                    key={index}
                    className="min-h-56 rounded-main border border-border p-6"
                  >
                    <div className="mb-8 size-10 rounded-lg bg-border" />
                    <div className="mb-4 h-6 w-3/4 rounded bg-border" />
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-border" />
                      <div className="h-3 w-5/6 rounded bg-border" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured projects section */}
            <div className="px-6 py-16 md:px-12 md:py-24">
              <div className="mb-10 space-y-4">
                <div className="h-4 w-28 rounded bg-border" />
                <div className="h-10 w-72 max-w-full rounded bg-border" />
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {Array.from({ length: 2 }, (_, index) => (
                  <div key={index}>
                    <div className="aspect-4/3 rounded-main bg-border" />
                    <div className="mt-5 h-6 w-3/4 rounded bg-border" />
                    <div className="mt-3 h-3 w-full rounded bg-border" />
                    <div className="mt-2 h-3 w-2/3 rounded bg-border" />
                  </div>
                ))}
              </div>
            </div>

            {/* Skills section */}
            <div className="px-6 py-16 md:px-12 md:py-24">
              <div className="mb-10 space-y-4">
                <div className="h-4 w-20 rounded bg-border" />
                <div className="h-10 w-64 max-w-full rounded bg-border" />
              </div>

              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 12 }, (_, index) => (
                  <div
                    key={index}
                    className="h-11 rounded-full bg-border"
                    style={{ width: `${70 + (index % 4) * 20}px` }}
                  />
                ))}
              </div>
            </div>

            {/* FAQ section */}
            <div className="grid gap-10 px-6 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-12 md:py-24">
              <div className="space-y-4">
                <div className="h-4 w-20 rounded bg-border" />
                <div className="h-10 w-48 rounded bg-border" />
              </div>

              <div className="divide-y divide-border border-y border-border">
                {Array.from({ length: 5 }, (_, index) => (
                  <div key={index} className="py-6">
                    <div className="h-5 w-4/5 rounded bg-border" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      }
    />
  );
}
