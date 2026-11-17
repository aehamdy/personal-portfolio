import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { CurrentTheme } from "./current-theme";

export const metadata: Metadata = {
  title: "Design System",
  description: "Design system preview and component playground.",
};

const themes = [
  { name: "White", value: "white" },
  { name: "Off-white", value: "off-white" },
  { name: "Black", value: "black" },
] as const;

const colors = [
  { name: "Background", variable: "--background" },
  { name: "Surface", variable: "--surface" },
  { name: "Elevated surface", variable: "--surface-elevated" },
  { name: "Foreground", variable: "--foreground" },
  { name: "Muted", variable: "--foreground-muted" },
  { name: "Primary", variable: "--primary" },
  { name: "Accent", variable: "--accent" },
  { name: "Border", variable: "--border" },
];

const spacing = [
  { name: "1", value: "0.25rem" },
  { name: "2", value: "0.5rem" },
  { name: "3", value: "0.75rem" },
  { name: "4", value: "1rem" },
  { name: "6", value: "1.5rem" },
  { name: "8", value: "2rem" },
  { name: "12", value: "3rem" },
  { name: "16", value: "4rem" },
  { name: "20", value: "5rem" },
  { name: "24", value: "6rem" },
];

const radii = ["none", "sm", "md", "lg", "xl", "2xl", "full"] as const;

const shadows = ["xs", "sm", "md", "lg", "xl"] as const;

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h3 className="font-heading text-xl font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>

      {children}
    </section>
  );
}

function ThemePreview() {
  return (
    <section className="space-y-10 rounded-2xl border border-border bg-background p-6 text-foreground sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            Theme preview
          </p>

          <h2 className="mt-1 font-heading text-2xl font-semibold">
            Current theme
          </h2>
        </div>

        <span className="rounded-full border border-border px-3 py-1 text-xs">
          <CurrentTheme />
        </span>
      </div>

      <Section title="Colors" description="Theme color tokens">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {colors.map((color) => (
            <div key={color.variable} className="space-y-2">
              <div
                className="h-16 rounded-lg border border-border"
                style={{
                  backgroundColor: `var(${color.variable})`,
                }}
              />
              <p className="text-xs font-medium">{color.name}</p>
              <p className="break-all font-mono text-xs text-muted">
                {color.variable}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography" description="Font roles and type scale">
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-xs text-muted">Display</p>
            <p className="font-display text-display-lg font-semibold leading-none">
              Design.
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs text-muted">Heading</p>
            <h3 className="font-heading text-4xl font-semibold">
              Building
              <span className="text-accent"> digital </span>
              experiences.
            </h3>
          </div>

          <div>
            <p className="mb-2 text-xs text-muted">Body</p>
            <p className="font-body max-w-xl text-base leading-relaxed">
              I build responsive, accessible, and high-performance web
              experiences using modern frontend technologies.
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs text-muted">UI</p>
            <p className="font-ui text-sm font-medium">
              Navigation · Buttons · Interface labels
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs text-muted">Monospace</p>
            <code className="font-mono text-sm">
              const portfolio = &quot;creative&quot;;
            </code>
          </div>

          <div className="space-y-2">
            {[
              "text-xs",
              "text-sm",
              "text-base",
              "text-lg",
              "text-xl",
              "text-2xl",
              "text-3xl",
              "text-4xl",
              "text-5xl",
              "text-6xl",
            ].map((size) => (
              <div key={size} className="flex items-center gap-4">
                <span className="w-24 shrink-0 font-mono text-xs text-muted">
                  {size}
                </span>
                <span className={size}>The quick brown fox</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Buttons" description="Variants and sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="text">Text</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="accent-outline">Accent outline</Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button>
            View projects
            <Icon name="arrow-forward" />
          </Button>

          <Button variant="outline">
            <Icon name="menu" />
            GitHub
          </Button>

          <Button variant="ghost">
            <Icon name="crop" />
          </Button>

          <Button variant="ghost">
            <Icon name="minimize" />
          </Button>
        </div>
      </Section>

      <Section title="Icons" description="Registered icon sizes">
        <div className="flex flex-wrap items-center gap-6">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Icon name="close" size={size} />
              <span className="font-mono text-xs text-muted">{size}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Links" description="Basic link styling">
        <div className="flex flex-wrap gap-6 text-sm font-medium">
          <a href="#typography" className="hover:text-accent">
            Default link
          </a>
          <a href="#typography" className="text-accent hover:opacity-80">
            Accent link
          </a>
          <a href="#typography" className="text-muted hover:text-foreground">
            Muted link
          </a>
        </div>
      </Section>

      <Section title="Spacing" description="Spacing scale">
        <div className="space-y-3">
          {spacing.map((item) => (
            <div key={item.name} className="flex items-center gap-4">
              <span className="w-8 font-mono text-xs text-muted">
                {item.name}
              </span>
              <div
                className="h-5 rounded-sm bg-accent"
                style={{ width: item.value }}
              />
              <span className="font-mono text-xs text-muted">{item.value}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Borders and radii">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {radii.map((radius) => (
            <div
              key={radius}
              className="flex h-24 items-center justify-center border border-border bg-surface"
              style={{ borderRadius: `var(--radius-${radius})` }}
            >
              <span className="font-mono text-xs">{radius}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadows">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
          {shadows.map((shadow) => (
            <div
              key={shadow}
              className="flex h-24 items-center justify-center rounded-lg bg-surface-elevated"
              style={{ boxShadow: `var(--shadow-${shadow})` }}
            >
              <span className="font-mono text-xs">{shadow}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Surface examples">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="font-heading font-semibold">Surface</p>
            <p className="mt-2 text-sm text-muted">
              A secondary container for grouped content.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface-elevated p-5 shadow-sm">
            <p className="font-heading font-semibold">Elevated surface</p>
            <p className="mt-2 text-sm text-muted">
              A more prominent content container.
            </p>
          </div>
        </div>
      </Section>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-container-main space-y-10 px-5 py-12 sm:px-8">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          Design foundations
        </p>

        <h1 className="uppercase font-display text-display-lg font-semibold text-accent leading-none">
          Design System
        </h1>

        <p className="max-w-2xl text-muted">
          A visual reference for the portfolio&apos;s colors, typography,
          spacing, and reusable interface elements.
        </p>
      </header>

      <div className="space-y-10">
        <ThemePreview />
      </div>
    </main>
  );
}
