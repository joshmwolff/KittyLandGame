import AmazonLink from "@/components/AmazonLink";
import NewsletterForm from "@/components/NewsletterForm";

const navigation = [
  { label: "Featured Stories", href: "#stories" },
  { label: "Excerpts", href: "#excerpts" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

const stories = [
  {
    category: "Governance & Power",
    color: "bg-gov",
    headline: "The Quiet Constitution of Model Cities",
    dek: "By 2035, zoning boards and AI policy councils fused into one bureaucracy. The result was fast approvals, hidden vetoes, and a new civic class that nobody voted for.",
    excerptId: "excerpt-1",
  },
  {
    category: "Science & Research",
    color: "bg-sci",
    headline: "The Last Wet-Lab Bottleneck",
    dek: "Synthetic experiment agents pushed theory into practice at machine speed, but biology still refused clean timelines. The most advanced labs became orchestras of uncertainty.",
    excerptId: "excerpt-2",
  },
  {
    category: "Health & Wellbeing",
    color: "bg-health",
    headline: "Care Plans Written by 12 Million Patients",
    dek: "Health systems stopped treating people as averages and started predicting lives as living drafts. Personal medicine became better, then complicated, then political.",
    excerptId: "excerpt-3",
  },
  {
    category: "Economy & Inequality",
    color: "bg-econ",
    headline: "Work After Task Markets",
    dek: "In the new labor stack, jobs did not disappear; they atomized. The winners were people who learned how to sequence machine agents with human trust.",
    excerptId: "excerpt-1",
  },
  {
    category: "Culture & Society",
    color: "bg-culture",
    headline: "The Return of Small Publics",
    dek: "Recommendation feeds collapsed into intentional circles. Culture felt slower, narrower, and oddly more alive than the attention economy promised.",
    excerptId: "excerpt-2",
  },
  {
    category: "Governance & Power",
    color: "bg-gov",
    headline: "How Water Rights Became an Interface Problem",
    dek: "Climate dashboards did not solve scarcity, but they changed who had standing to argue. Law began to follow the structure of data pipelines.",
    excerptId: "excerpt-3",
  },
  {
    category: "Science & Research",
    color: "bg-sci",
    headline: "When Replication Became a Product Feature",
    dek: "Peer review moved upstream into tooling, and reproducibility was priced into every major model release. Scientific status started to look like software uptime.",
    excerptId: "excerpt-2",
  },
  {
    category: "Culture & Society",
    color: "bg-culture",
    headline: "Raising Children in the Presence of Machine Tutors",
    dek: "Parents gained superhuman support and new anxieties in equal measure. Childhood stayed human, but its boundaries were redrawn by design choices.",
    excerptId: "excerpt-3",
  },
];

const quotes = [
  "A precise, humane tour of the decade everybody claimed to understand.",
  "Reads like the launch issue of a magazine from the near future.",
  "Sharp reporting energy with the narrative pull of speculative nonfiction.",
  "Unprompted 2035 makes complex systems feel legible without flattening them.",
  "A book for builders, skeptics, policymakers, and anyone living with AI already in the room.",
  "Timely, unsentimental, and unexpectedly hopeful about collective choices.",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-noise text-ink">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div className="border-b border-ink/15 bg-ink px-4 py-2 text-center text-xs uppercase tracking-[0.14em] text-paper sm:text-sm">
        Now available: <span className="font-semibold">Unprompted 2035</span>.
        <AmazonLink eventName="banner_cta_click" className="ml-2 underline underline-offset-4">
          Buy on Amazon
        </AmazonLink>
      </div>

      <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#" className="text-lg font-semibold uppercase tracking-[0.1em]">
            Unprompted Magazine
          </a>
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="story-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <AmazonLink
            eventName="nav_cta_click"
            className="rounded-full border border-ink bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-paper transition hover:bg-transparent hover:text-ink"
          >
            Buy the Book
          </AmazonLink>
        </div>
      </header>

      <AmazonLink
        eventName="desktop_sticky_cta_click"
        className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 rounded-full border border-ink bg-paper px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink shadow-editorial transition hover:bg-ink hover:text-paper lg:inline-flex"
      >
        Buy on Amazon
      </AmazonLink>

      <main id="main" className="mx-auto max-w-6xl px-4 pb-28 pt-10 sm:px-6 lg:px-8">
        <section aria-labelledby="hero-title" className="border-b border-ink/15 pb-14">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink/70">New release | Book edition</p>
              <h1 id="hero-title" className="font-display text-5xl leading-tight sm:text-6xl lg:text-7xl">
                Unprompted 2035
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink/85">
                Unprompted Magazine&apos;s Best Stories on How AI Shaped Life, Society, and the Planet in 2035
              </p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/80">
                S.W. Gale collects the defining dispatches of a transformed decade: city governance rewritten by machine mediation, health restructured around prediction, and culture rebuilt in smaller, deliberate publics.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <AmazonLink
                  eventName="hero_primary_cta_click"
                  className="rounded-md bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90"
                >
                  Get the Issue (Book)
                </AmazonLink>
                <a
                  href="#excerpts"
                  className="rounded-md border border-ink px-6 py-3 text-sm font-semibold transition hover:bg-ink hover:text-paper"
                >
                  Read Excerpts
                </a>
              </div>
            </div>

            <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" aria-label="Issue panel and cover">
              <div className="rounded-xl border border-ink/20 bg-white p-5 shadow-editorial">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/65">This Issue</p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/85">
                  <li>8 flagship stories across governance, science, health, economy, and culture.</li>
                  <li>3 long-form excerpts from the book edition.</li>
                  <li>Reader notes, review highlights, and bonus update signup.</li>
                </ul>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-ink/25 bg-ink p-6 text-paper shadow-editorial">
                <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent/70 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-culture/70 blur-2xl" />
                <p className="text-xs uppercase tracking-[0.15em] text-paper/80">Cover mock</p>
                <div className="mt-7 border-y border-paper/30 py-6">
                  <p className="font-display text-3xl leading-tight">UNPROMPTED</p>
                  <p className="font-display text-3xl leading-tight">2035</p>
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.12em] text-paper/80">S.W. Gale</p>
              </div>
            </aside>
          </div>
        </section>

        <section id="stories" aria-labelledby="stories-title" className="border-b border-ink/15 py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="stories-title" className="font-display text-4xl leading-tight sm:text-5xl">
              Featured Stories
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-ink/80">
              Magazine-style reporting selected from the book, organized by the systems that changed first and fastest.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <article
                key={story.headline}
                className="group flex h-full flex-col rounded-xl border border-ink/15 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-editorial"
              >
                <span className={`mb-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white ${story.color}`}>
                  {story.category}
                </span>
                <h3 className="font-display text-2xl leading-tight">{story.headline}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/80">{story.dek}</p>
                <a href={`#${story.excerptId}`} className="mt-5 text-sm font-semibold underline underline-offset-4 group-hover:text-accent">
                  Read excerpt
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="excerpts" aria-labelledby="excerpts-title" className="border-b border-ink/15 py-14">
          <h2 id="excerpts-title" className="font-display text-4xl leading-tight sm:text-5xl">
            Excerpts
          </h2>
          <div className="mt-8 space-y-10">
            <article id="excerpt-1" className="rounded-xl border border-ink/15 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gov">Governance & Power</p>
              <h3 className="mt-3 font-display text-3xl leading-tight">The Quiet Constitution of Model Cities</h3>
              <p className="mt-4 text-base leading-relaxed text-ink/85">
                The mayor still gave speeches, but the real argument now happened three layers below city hall, inside the policy compiler. Every department submitted constraints, every neighborhood submitted exceptions, and the system offered a map of legal futures by morning. What changed was not that machines made decisions; what changed was that every decision arrived with a confidence interval and a queue position. Residents learned new civic verbs. You did not just petition. You tuned. You did not just protest. You challenged a model card in public. In districts where trust was high, this looked like efficiency finally catching up with need: permits in days, inspections in hours, emergency routing in minutes. In districts with older grievances, the same interface looked like procedural theater. By 2035, the most valuable office in municipal government was no longer communications. It was dispute design: the craft of deciding who can contest a recommendation, with what evidence, and before which deadline closes forever.
              </p>
              <AmazonLink eventName="excerpt_1_cta_click" className="mt-5 inline-flex text-sm font-semibold underline underline-offset-4">
                Get the full piece in Unprompted 2035 -> Buy on Amazon
              </AmazonLink>
            </article>

            <article id="excerpt-2" className="rounded-xl border border-ink/15 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sci">Science & Research</p>
              <h3 className="mt-3 font-display text-3xl leading-tight">The Last Wet-Lab Bottleneck</h3>
              <p className="mt-4 text-base leading-relaxed text-ink/85">
                In 2035, every major discovery arrived twice: first as simulation, then as friction. Research teams could draft ten thousand candidate pathways before lunch, but the afternoon was still ruled by pipettes, contamination risk, and material behavior nobody had perfectly modeled. The labs that thrived were not those with the largest compute budgets; they were the ones that treated uncertainty as a product discipline. Instead of asking whether a model was right, they asked where it failed gracefully and where it failed expensively. Graduate students became translators between synthetic confidence and physical stubbornness. Principal investigators became operators of throughput economics, balancing cloud bills against freezer time and human attention. The romance of lone genius faded. In its place came an industrial intimacy: coders learning cell culture basics, biologists reading latency reports, ethicists sitting in sprint reviews. The bottleneck did not disappear. It became visible, measurable, and, for the first time, shared across the whole stack.
              </p>
              <AmazonLink eventName="excerpt_2_cta_click" className="mt-5 inline-flex text-sm font-semibold underline underline-offset-4">
                Get the full piece in Unprompted 2035 -> Buy on Amazon
              </AmazonLink>
            </article>

            <article id="excerpt-3" className="rounded-xl border border-ink/15 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-health">Health & Wellbeing</p>
              <h3 className="mt-3 font-display text-3xl leading-tight">Care Plans Written by 12 Million Patients</h3>
              <p className="mt-4 text-base leading-relaxed text-ink/85">
                The first generation of personalized care platforms promised precision. What they delivered, unexpectedly, was voice. By inviting patients to annotate recommendations in plain language, health systems captured something charts never held: preference under pressure. Over years, those annotations became a living corpus of refusal, compromise, and adaptation. A diabetic parent skipping evening doses to make school pickup. A retired engineer trading marginal longevity for fewer clinic visits. A night-shift nurse asking for plans that respect circadian damage instead of pretending it does not exist. Models trained on that corpus grew less doctrinal and more negotiative. They stopped presenting one optimal life and started offering plausible paths with explicit tradeoffs. This made care better and messier. Insurance rules lagged behind lived complexity. Clinicians had to explain why two equally supported plans could carry different social costs. Yet the shift was undeniable: medicine in 2035 no longer treated adherence as obedience. It treated it as collaboration between institutions and the people who must survive them.
              </p>
              <AmazonLink eventName="excerpt_3_cta_click" className="mt-5 inline-flex text-sm font-semibold underline underline-offset-4">
                Get the full piece in Unprompted 2035 -> Buy on Amazon
              </AmazonLink>
            </article>
          </div>
        </section>

        <section id="reviews" aria-labelledby="reviews-title" className="border-b border-ink/15 py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="reviews-title" className="font-display text-4xl leading-tight sm:text-5xl">
              Reviews & Endorsements
            </h2>
            <a href="#" className="text-sm font-semibold underline underline-offset-4">
              Press kit (coming soon)
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quotes.map((quote) => (
              <blockquote key={quote} className="rounded-xl border border-ink/15 bg-white p-5 text-sm leading-relaxed text-ink/85 shadow-sm">
                “{quote}”
              </blockquote>
            ))}
          </div>
        </section>

        <section aria-labelledby="newsletter-title" className="border-b border-ink/15 py-14">
          <div className="grid gap-6 rounded-xl border border-ink/20 bg-white p-6 shadow-editorial sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <h2 id="newsletter-title" className="font-display text-4xl leading-tight">
                Newsletter Dispatch
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                Join for publication updates, bonus excerpts, and occasional editorial notes from the world of <span className="italic">Unprompted 2035</span>.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </section>

        <section id="about" aria-labelledby="about-title" className="border-b border-ink/15 py-14">
          <h2 id="about-title" className="font-display text-4xl leading-tight sm:text-5xl">
            About
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6 text-sm leading-relaxed text-ink/85">
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.13em] text-ink/70">About the book</h3>
                <p>
                  <span className="italic">Unprompted 2035</span> is a curated volume of long-form reporting from Unprompted Magazine, focused on the year AI stopped being a sector and became infrastructure. It maps how everyday life, governance, climate systems, labor, and cultural production changed once intelligent tools became ambient.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.13em] text-ink/70">About the author</h3>
                <p>
                  S.W. Gale writes about technology, institutions, and social adaptation. Their work blends investigative reporting with systems analysis, with a focus on the friction between elegant tools and messy human realities.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-ink/20 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-ink/70">Author portrait placeholder</p>
              <div className="mt-3 h-72 rounded-lg bg-[linear-gradient(165deg,#d8dee9_0%,#a8b2c5_45%,#5f6f8a_100%)]" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold">S.W. Gale</p>
            </div>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-title" className="py-14">
          <h2 id="faq-title" className="font-display text-4xl leading-tight sm:text-5xl">
            FAQ
          </h2>
          <div className="mt-8 space-y-4">
            <details className="faq-item" open>
              <summary>Is this a magazine or a book?</summary>
              <p>
                It is a book edition that preserves a magazine voice and structure. Think of it as a curated issue archive in one volume.
              </p>
            </details>
            <details className="faq-item">
              <summary>Who is it for?</summary>
              <p>
                Readers interested in AI and society: builders, policy teams, researchers, students, and general readers who want rigorous but readable reporting.
              </p>
            </details>
            <details className="faq-item">
              <summary>Is it fiction?</summary>
              <p>
                It is written in a reported, magazine-style nonfiction mode with forward-looking analysis grounded in plausible systems behavior.
              </p>
            </details>
            <details className="faq-item">
              <summary>Do I need to read it in order?</summary>
              <p>
                No. You can read by section or theme, though the introduction offers a useful framing for the rest of the book.
              </p>
            </details>
            <details className="faq-item">
              <summary>Where can I buy it?</summary>
              <p>
                On Amazon. <AmazonLink eventName="faq_cta_click" className="underline underline-offset-4">Buy Unprompted 2035</AmazonLink>.
              </p>
            </details>
            <details className="faq-item">
              <summary>Any content warnings?</summary>
              <p>
                Some chapters discuss climate stress, healthcare inequity, labor displacement, and political conflict in a general, non-graphic way.
              </p>
            </details>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/15 bg-ink px-4 py-12 text-paper sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="text-sm">Unprompted 2035 by S.W. Gale</p>
          <AmazonLink
            eventName="footer_cta_click"
            className="rounded-md border border-paper px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition hover:bg-paper hover:text-ink"
          >
            Buy on Amazon
          </AmazonLink>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/20 bg-paper/95 p-3 backdrop-blur md:hidden">
        <AmazonLink
          eventName="mobile_sticky_cta_click"
          className="block rounded-md bg-ink px-4 py-3 text-center text-sm font-semibold text-paper"
          ariaLabel="Buy Unprompted 2035 on Amazon"
        >
          Buy on Amazon
        </AmazonLink>
      </div>
    </div>
  );
}
