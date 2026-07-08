import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 018.485 3.131M15 9a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Verified Requests",
    description: "Every request is verified through multiple layers of identity and document checks to ensure legitimate needs reach our platform.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10-4v-3m0 0L7 5M17 4l-3.5 4L7 4m0 0L7 20m10-16V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v16a1 1 0 001 1h4a1 1 0 001-1V4z" />
      </svg>
    ),
    title: "Fulfillment Partners",
    description: "Trusted hospitals, pharmacies, schools, and vendors deliver aid directly. Funds never go to beneficiaries—only to verified partners.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM12 8V7m0 1v8m0 0v1m0-1c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm6-4H6m12 0a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h12z" />
      </svg>
    ),
    title: "Impact Tracking",
    description: "Every donation is tracked from contribution to delivery. Donors receive real-time proof including photos, receipts, and success reports.",
    color: "bg-accent/10 text-accent-dark",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "AI Verification",
    description: "Smart algorithms detect fraud, duplicate requests, and suspicious patterns. AI assists human verifiers for faster, more accurate approval.",
    color: "bg-success/10 text-success",
  },
];

const steps = [
  {
    number: "01",
    title: "Submit a Request",
    description: "Beneficiaries submit verified requests with documentation including medical reports, school invoices, or government IDs.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-blue-500 to-blue-600",
    bullets: [
      "Upload supporting documents",
      "Categorize your need",
      "Set priority level",
      "Receive tracking ID",
    ],
  },
  {
    number: "02",
    title: "Verify & Approve",
    description: "Our AI and community verifiers review each request for authenticity. Multi-level checks ensure only legitimate needs are approved.",
    image: "https://images.unsplash.com/photo-1573164574511-794bb0c5f8a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-teal-500 to-teal-600",
    bullets: [
      "AI fraud detection",
      "Human verification",
      "Expert approval",
      "Multi-level checks",
    ],
  },
  {
    number: "03",
    title: "Donors Contribute",
    description: "Donors browse verified campaigns and contribute securely. Every donation is tracked and transparent from start to finish.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-amber-500 to-amber-600",
    bullets: [
      "Browse campaigns",
      "Secure payments",
      "Real-time tracking",
      "Impact reports",
    ],
  },
  {
    number: "04",
    title: "Deliver & Confirm",
    description: "Fulfillment partners deliver goods or services. Proof of delivery is uploaded, verified, and donors receive impact reports.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-purple-500 to-purple-600",
    bullets: [
      "Partner assignment",
      "Photo/video proof",
      "Verification checks",
      "Payment release",
    ],
  },
];

const stats = [
  { value: "$2.4M+", label: "Total Aid Delivered" },
  { value: "8,500+", label: "Lives Impacted" },
  { value: "99.2%", label: "Fulfillment Success" },
  { value: "150+", label: "Partner Locations" },
];

const testimonials = [
  {
    quote: "AidLink transformed how our organization delivers aid. The verification system ensures every donation reaches the right people.",
    author: "Sarah Adeyemi",
    role: "NGO Director, Lagos",
    initials: "SA",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    quote: "I was skeptical about online donations, but AidLink's impact tracking showed me exactly where my money went.",
    author: "Michael Okafor",
    role: "Regular Donor",
    initials: "MO",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    quote: "When my son needed urgent surgery, AidLink verified our need and coordinated with the hospital. We got care within days.",
    author: "Grace Ibrahim",
    role: "Beneficiary, Abuja",
    initials: "GI",
    gradient: "from-emerald-500 to-teal-500",
  },
];

const partnerLogos = [
  "Red Cross",
  "UNICEF",
  "Doctors Without Borders",
  "World Food Programme",
  "Save the Children",
  "GlobalGiving",
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden gradient-hero min-h-[90vh] flex items-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-accent/5 blur-3xl animate-float-slow" />

          <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 mx-auto lg:mx-0 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm">
                  <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
                  Now serving 50+ communities across Nigeria
                </div>

                <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                  Turning Donations Into{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                    Guaranteed Impact
                  </span>
                </h1>

                <p className="mx-auto lg:mx-0 max-w-xl text-lg leading-relaxed text-white/70">
                  AidLink ensures every donation reaches those who need it most. We verify needs,
                  coordinate fulfillment through trusted partners, and prove impact with complete
                  transparency.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <Link href="/signup" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-accent text-white hover:bg-accent-dark shadow-lg shadow-accent/30">
                      Start a Campaign
                    </Button>
                  </Link>
                  <Link href="/donor/campaigns" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      Donate Now
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-white/50 justify-center lg:justify-start">
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    No platform fees
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure payments
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    100% transparent
                  </span>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="People helping in community"
                    width={800}
                    height={600}
                    priority
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 shadow-xl animate-fade-in-up">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                      <svg className="h-6 w-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-heading">Real-Time Tracking</p>
                      <p className="text-xs text-text-muted">End-to-end visibility</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 top-12 glass rounded-xl p-3 shadow-xl animate-fade-in-up delay-200">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-success animate-pulse-soft" />
                    <span className="text-xs font-medium text-text-heading">99.2% Success Rate</span>
                  </div>
                </div>

                <div className="absolute left-8 bottom-36 glass rounded-xl p-3 shadow-xl animate-fade-in-up delay-300">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-xs font-medium text-text-heading">8,500+ lives helped</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Logos Bar */}
        <section className="border-b border-border bg-surface/50">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-text-muted mb-6">
              Trusted by leading organizations
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              {partnerLogos.map((name) => (
                <span key={name} className="text-sm font-bold text-text-muted/40 hover:text-text-muted/60 transition-colors tracking-wider uppercase">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <p className="text-3xl font-bold text-gradient group-hover:scale-105 transition-transform inline-block">{stat.value}</p>
                  <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Preview */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                How It Works
              </span>
              <h2 className="text-3xl font-bold text-text-heading sm:text-4xl">
                From Request to Relief in 4 Steps
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                Our platform connects donors with verified needs through a transparent, accountable
                fulfillment ecosystem.
              </p>
            </div>

            <div className="mt-16 space-y-24">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className={`relative flex flex-col items-center gap-12 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {i < steps.length - 1 && (
                    <div className="absolute left-7 top-24 hidden h-full w-0.5 bg-gradient-to-b from-primary/30 to-secondary/30 lg:block" />
                  )}

                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-lg font-bold text-white shadow-lg shrink-0`}>
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-text-heading">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-lg leading-relaxed text-text-body mb-6">
                      {step.description}
                    </p>
                    <ul className="grid grid-cols-2 gap-3">
                      {step.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2 text-sm text-text-muted">
                          <svg className="h-4 w-4 shrink-0 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-1 w-full">
                    <div className="relative overflow-hidden rounded-2xl shadow-xl">
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={800}
                        height={500}
                        className="h-auto w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r ${step.gradient} px-5 py-3`}>
                        <p className="text-sm font-semibold text-white">
                          Step {step.number}: {step.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-surface-secondary py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
                Why AidLink
              </span>
              <h2 className="text-3xl font-bold text-text-heading sm:text-4xl">
                Built for Trust and Transparency
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
                We reimagine how aid is delivered by putting verification and accountability at the center of everything.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                    {feature.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-text-heading">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Statistics Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 md:p-16">
              <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/3 translate-y-1/3 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute left-1/3 top-1/4 h-32 w-32 rounded-full bg-accent/5 blur-3xl" />

              <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
                <div className="space-y-4 text-white">
                  <h2 className="text-3xl font-bold sm:text-4xl">Make Real Impact Today</h2>
                  <p className="max-w-md text-lg text-white/70">
                    Whether you need assistance or want to help, AidLink makes it simple,
                    transparent, and impactful.
                  </p>
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <Link href="/signup">
                      <Button size="lg" className="w-full bg-white text-primary hover:bg-white/90 sm:w-auto shadow-lg">
                        Get Started Free
                      </Button>
                    </Link>
                    <Link href="/how-it-works">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/10 sm:w-auto"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "50+", label: "Communities Served" },
                    { value: "150+", label: "Partner Locations" },
                    { value: "8,500+", label: "Lives Impacted" },
                    { value: "99.2%", label: "Success Rate" },
                  ].map((item) => (
                    <div key={item.label} className="group rounded-xl bg-white/10 p-5 text-center backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                      <p className="text-2xl font-bold text-white group-hover:scale-105 transition-transform inline-block">{item.value}</p>
                      <p className="mt-1 text-sm text-white/60">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-surface-secondary py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl font-bold text-text-heading sm:text-4xl">
                Trusted by Communities
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
                Hear from donors, beneficiaries, and partners who use AidLink to create real change.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.author}
                  className="group relative rounded-2xl border border-border bg-surface p-6 shadow-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex gap-1 text-accent mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-text-body">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-white text-sm font-bold shadow-sm`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-heading">{t.author}</p>
                      <p className="text-xs text-text-muted">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-surface p-10 md:p-16 shadow-card-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg mb-6">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-text-heading sm:text-4xl">
                Ready to Make a Difference?
              </h2>
              <p className="mt-4 text-lg text-text-muted max-w-xl mx-auto">
                Join thousands of donors and beneficiaries making real impact together through
                transparent, verified aid fulfillment.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/20">
                    Start Your Campaign
                  </Button>
                </Link>
                <Link href="/donor/campaigns">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Browse Campaigns
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
