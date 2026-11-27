import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { CountUp } from "@/components/count-up";
import { CursorGlow } from "@/components/cursor-glow";
import { DemoCard } from "@/components/demo-card";
import { LinkIcon } from "@/components/link-icon";
import { ProfileCard } from "@/components/profile-card";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { UsernameField } from "@/components/username-field";
import { DEMOS } from "@/lib/demos";
import { toBiaProfile } from "@/lib/profile";

const [mila, kai, nova] = DEMOS;

const FEATURES = [
  {
    title: "video or photo",
    text: "a clip or a still fills the whole screen. no media? the backdrop moves on its own.",
  },
  {
    title: "all your links",
    text: "tiktok, youtube, twitch, spotify, telegram — one tap each, no extra pages.",
  },
  {
    title: "your own name",
    text: "bi.ax/you. short enough to say out loud and put in a bio.",
  },
];

const STEPS = [
  { n: "1", title: "pick a name", text: "type it, we check it live." },
  { n: "2", title: "drop your links", text: "socials, music, whatever you've got." },
  { n: "3", title: "post it", text: "one link in every bio you own." },
];

const STATS = [
  { value: 1240, label: "pages made" },
  { value: 8900, label: "links added" },
  { value: 46000, label: "profile views" },
];

const FAQ = [
  {
    q: "is it free?",
    a: "yes, the whole thing. a pro tier with your own domain comes later.",
  },
  {
    q: "can i use my own video?",
    a: "yes — upload a clip and it loops full screen, muted, on autoplay.",
  },
  {
    q: "can i change my name later?",
    a: "yes, but old links stop working. pick something you can keep.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <CursorGlow />

      <main>
        {/* HERO */}
        <section className="relative mx-auto grid w-[min(1180px,calc(100%-2rem))] items-center gap-14 pb-8 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16">
          <div>
            <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-[0.86] tracking-[-0.04em]">
              one link.
              <br />
              <span className="grad-text">all of you.</span>
            </h1>

            <p className="mt-6 max-w-[34ch] text-[16px] leading-relaxed text-white/65">
              music, videos and socials on a single page. pick a name and you&apos;re
              live.
            </p>

            <div className="mt-8">
              <UsernameField />
            </div>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {DEMOS.slice(0, 5).map((demo) => (
                  <Avatar
                    key={demo.slug}
                    name={demo.name}
                    hueA={demo.hueA}
                    hueB={demo.hueB}
                    size={30}
                  />
                ))}
              </div>
              <p className="text-[13px] text-white/50">
                <CountUp to={1240} /> pages already made
              </p>
            </div>
          </div>

          <div className="relative flex min-h-[460px] items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 grid place-items-center"
            >
              <div className="size-[min(600px,96%)] rounded-full border border-white/8" />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 grid place-items-center"
            >
              <div
                className="size-[min(470px,74%)] rounded-full border border-dashed border-white/10"
                style={{ animation: "spin-slow 70s linear infinite" }}
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute size-[340px] rounded-full bg-accent/25 blur-[110px]"
            />

            <div
              className="w-full max-w-[420px]"
              style={{ animation: "float-y 7.5s ease-in-out infinite" }}
            >
              <ProfileCard profile={toBiaProfile(mila)} />
            </div>


          </div>
        </section>

        {/* STATS */}
        <Reveal>
          <section className="mx-auto w-[min(1180px,calc(100%-2rem))] pt-6">
            <div className="glass grid overflow-hidden rounded-[28px] sm:grid-cols-3">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`px-5 py-7 text-center md:px-8 md:py-9 ${
                    index > 0
                      ? "border-t border-white/10 sm:border-l sm:border-t-0"
                      : ""
                  }`}
                >
                  <p className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-none tracking-[-0.02em]">
                    <CountUp to={stat.value} />
                  </p>
                  <p className="mt-2 text-[13px] text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* PROFILES */}
        <Reveal>
          <section
            id="profiles"
            className="mx-auto w-[min(1180px,calc(100%-2rem))] scroll-mt-28 pt-20 md:pt-26"
          >
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
                see it live
              </h2>
              <p className="max-w-[30ch] text-[14px] leading-relaxed text-white/65">
                three people, three pages, one builder.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[mila, kai, nova].map((demo, index) => (
                <Reveal key={demo.slug} delay={index * 90}>
                  <DemoCard demo={demo} />
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* FEATURES */}
        <Reveal delay={60}>
          <section
            id="features"
            className="mx-auto w-[min(1180px,calc(100%-2rem))] scroll-mt-28 pt-20 md:pt-26"
          >
            <h2 className="max-w-[18ch] font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
              built for posting, not for settings
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature, index) => (
                <Reveal key={feature.title} delay={index * 90}>
                <article
                  key={feature.title}
                  className="glass-soft group relative overflow-hidden rounded-[28px] p-6 transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-white/20 md:p-7"
                >
                  <span className="grad-text font-display text-[15px] font-semibold">
                    0{index + 1}
                  </span>
                  <h3 className="mt-6 font-display text-[26px] font-semibold leading-tight tracking-[-0.02em]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/65">
                    {feature.text}
                  </p>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                </article>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* STEPS */}
        <Reveal delay={60}>
          <section className="mx-auto w-[min(1180px,calc(100%-2rem))] pt-20 md:pt-26">
            <div className="glass grid overflow-hidden rounded-[32px] md:grid-cols-3">
              {STEPS.map((step, index) => (
                <div
                  key={step.n}
                  className={`p-7 md:p-9 ${
                    index > 0
                      ? "border-t border-white/10 md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <span className="grad-text font-display text-[44px] font-semibold leading-none">
                    {step.n}
                  </span>
                  <h3 className="mt-4 font-display text-[22px] font-semibold tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] text-white/55">{step.text}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* FAQ */}
        <Reveal delay={60}>
          <section
            id="faq"
            className="mx-auto w-[min(1180px,calc(100%-2rem))] scroll-mt-28 pt-20 md:pt-26"
          >
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <h2 className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
                quick answers
              </h2>

              <div className="space-y-2.5">
                {FAQ.map((item) => (
                  <details
                    key={item.q}
                    className="glass-soft group rounded-[20px] px-5 py-4 transition-colors duration-300 open:border-white/20"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-white/85 [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/8 text-white/60 transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-[14px] leading-relaxed text-white/65">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* CTA */}
        <Reveal delay={60}>
          <section className="mx-auto w-[min(1180px,calc(100%-2rem))] pt-20 md:pt-26">
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] px-6 py-14 md:px-14 md:py-20">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-28 size-[420px] rounded-full bg-accent/25 blur-[120px]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 left-1/4 size-[320px] rounded-full bg-cyan/15 blur-[110px]"
              />

              <div className="relative max-w-[560px]">
                <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[0.9] tracking-[-0.035em]">
                  grab your name
                </h2>
                <p className="mt-4 max-w-[30ch] text-[15px] leading-relaxed text-white/60">
                  one page, one link, and it&apos;s all yours.
                </p>
                <div className="mt-8">
                  <UsernameField />
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <footer className="mx-auto mt-24 w-[min(1180px,calc(100%-2rem))] border-t border-white/10 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="font-display text-[18px] font-semibold tracking-[-0.02em]"
          >
            bi.ax
          </Link>

          <div className="flex items-center gap-2">
            {[mila.links[0], kai.links[0], nova.links[0]].map((link, index) => (
              <span
                key={index}
                className="grid size-9 place-items-center rounded-full border border-white/10 text-white/45"
              >
                <LinkIcon name={link.icon} className="size-3.5" />
              </span>
            ))}
          </div>

          <Link
            href="https://axven.xyz"
            className="inline-flex items-center gap-1 text-[13px] text-white/45 transition-colors hover:text-white"
          >
            an axven project
            <ArrowUpRight className="size-3.5" strokeWidth={2} />
          </Link>
        </div>
      </footer>
    </>
  );
}
