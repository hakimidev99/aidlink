import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";

const values = [
  {
    title: "Transparency",
    description: "Every transaction is recorded on an immutable ledger. Donors see exactly where their money goes, from contribution to final delivery.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7 1.477 4.057-2.884 7-7.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    gradient: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textLight: "text-blue-600",
  },
  {
    title: "Trust",
    description: "Multi-layer verification using AI and human reviewers ensures every request is legitimate. We never release funds without proof of delivery.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 018.485 3.131M15 9a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    gradient: "from-teal-500 to-teal-600",
    bgLight: "bg-teal-50",
    textLight: "text-teal-600",
  },
  {
    title: "Impact",
    description: "Measurable, guaranteed outcomes. Every donation is tied to a specific fulfillment goal with documented proof of completion.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50",
    textLight: "text-amber-600",
  },
  {
    title: "Innovation",
    description: "Cutting-edge AI, blockchain-ready tracking, and real-time analytics power a platform built for the future of charitable giving.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50",
    textLight: "text-purple-600",
  },
];

const teamMembers = [
  { name: "Adaobi Nwachukwu", role: "CEO & Co-Founder", initials: "AN" },
  { name: "David Ogunlade", role: "CTO & Co-Founder", initials: "DO" },
  { name: "Fatima Bello", role: "Head of Operations", initials: "FB" },
  { name: "Chidi Okonkwo", role: "Head of Partnerships", initials: "CO" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden gradient-hero min-h-[60vh] flex items-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                About AidLink
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/70 sm:text-xl">
                We are on a mission to make charitable giving completely transparent,
                verifiable, and impact-driven. Every donation, every delivery, every life changed.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Our mission"
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 hidden rounded-xl bg-surface p-4 shadow-lg lg:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-heading">Since 2024</p>
                      <p className="text-xs text-text-muted">8,500+ lives impacted</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Mission</p>
                  <h2 className="mt-2 text-3xl font-bold text-text-heading sm:text-4xl">
                    Building Trust in Aid
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-text-body">
                    AidLink was founded to solve the trust crisis in charitable giving. We believe
                    that every donation should have guaranteed impact, not just hope. Our platform
                    ensures that when you donate, your money goes directly to deliver verified
                    goods and services to those who need them most.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-secondary">Our Vision</p>
                  <h2 className="mt-2 text-3xl font-bold text-text-heading sm:text-4xl">
                    A World Without Wasteful Giving
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-text-body">
                    We envision a future where every dollar donated creates measurable, verifiable
                    impact. A world where donors can give with absolute confidence, beneficiaries
                    receive dignified assistance, and trust is restored to the aid ecosystem.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <svg className="h-4 w-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    50+ communities served
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <svg className="h-4 w-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    150+ partner locations
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <svg className="h-4 w-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    99.2% success rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-surface-secondary py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Values</p>
              <h2 className="mt-3 text-3xl font-bold text-text-heading sm:text-4xl">
                What Drives Everything We Do
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
                Four core principles guide every decision we make and every feature we build.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${value.gradient} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}>
                    {value.icon}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-text-heading">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 md:p-16">
              <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/3 translate-y-1/3 rounded-full bg-white/5 blur-3xl" />

              <div className="relative">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Impact in Numbers</h2>
                  <p className="mx-auto mt-3 max-w-xl text-lg text-white/70">
                    Every metric represents real people helped and real lives transformed.
                  </p>
                </div>

                <div className="mt-12 grid gap-8 sm:grid-cols-3">
                  {[
                    { value: "$2.4M+", label: "Total Aid Delivered", sub: "Across 50+ communities" },
                    { value: "8,500+", label: "Lives Impacted", sub: "Food, healthcare, education" },
                    { value: "99.2%", label: "Success Rate", sub: "Verified fulfillment" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                      <p className="text-4xl font-extrabold text-white sm:text-5xl">{stat.value}</p>
                      <p className="mt-2 text-base font-semibold text-white/90">{stat.label}</p>
                      <p className="mt-1 text-sm text-white/60">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-surface-secondary py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Team</p>
              <h2 className="mt-3 text-3xl font-bold text-text-heading sm:text-4xl">
                Meet the People Behind AidLink
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
                A passionate team dedicated to transforming how aid is delivered worldwide.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => {
                const gradients = [
                  "from-blue-500 to-blue-600",
                  "from-teal-500 to-teal-600",
                  "from-amber-500 to-amber-600",
                  "from-purple-500 to-purple-600",
                ];
                return (
                  <div
                    key={member.name}
                    className="group rounded-2xl border border-border bg-surface p-6 text-center shadow-card transition-all duration-300 hover:shadow-lg"
                  >
                    <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${gradients[index]} text-2xl font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110`}>
                      {member.initials}
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-text-heading">{member.name}</h3>
                    <p className="mt-1 text-sm text-text-muted">{member.role}</p>
                    <div className="mt-4 flex justify-center gap-2">
                      {["linkedin", "twitter"].map((social) => (
                        <a
                          key={social}
                          href="#"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-tertiary text-text-muted transition-colors duration-200 hover:bg-primary hover:text-white"
                        >
                          <span className="text-[10px] font-bold uppercase">{social[0]}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-text-heading sm:text-4xl">
              Be Part of the Change
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Whether you want to donate, request aid, or partner with us, there is a place for
              you in the AidLink community.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/20">
                  Join Us Today
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
