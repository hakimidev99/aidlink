import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Submit a Request",
    subtitle: "Tell us what you need",
    description:
      "Beneficiaries or their advocates submit detailed requests with supporting documentation. Every request is categorized, prioritized, and prepared for verification.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    borderAccent: "border-l-blue-500",
    bulletColor: "text-blue-500",
    details: [
      "Upload supporting documents such as medical reports, school invoices, or government-issued ID",
      "Select the category that best describes your need — medical, education, food, or emergency relief",
      "Set a priority level and provide a detailed description of how the aid will be used",
      "Submit your request and receive a unique tracking ID for real-time status monitoring",
    ],
  },
  {
    number: "02",
    title: "Verification",
    subtitle: "Ensuring legitimacy",
    description:
      "Every request passes through a rigorous multi-layer verification system. Our AI and community reviewers work together to validate authenticity and prevent fraud.",
    image:
      "https://images.unsplash.com/photo-1573164574511-794bb0c5f8a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-teal-500 to-teal-600",
    bgLight: "bg-teal-50",
    borderAccent: "border-l-teal-500",
    bulletColor: "text-teal-500",
    details: [
      "AI-powered document analysis screens for fraud, duplication, and suspicious patterns in seconds",
      "Community verifiers review each request for consistency and legitimacy based on local knowledge",
      "High-value requests receive expert approval from trained specialists in the relevant field",
      "Approved requests are published to the platform and made available for donor contributions",
    ],
  },
  {
    number: "03",
    title: "Donor Contribution",
    subtitle: "Fund with confidence",
    description:
      "Donors browse verified campaigns and contribute securely. Every transaction is processed through encrypted payment systems and tracked in real time.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50",
    borderAccent: "border-l-amber-500",
    bulletColor: "text-amber-500",
    details: [
      "Choose from verified campaigns and contribute any amount using secure payment methods including card, bank transfer, or mobile money",
      "Track your donation in real time as it moves through the fulfillment pipeline",
      "Receive automated notifications at every milestone — from partner assignment to delivery",
      "Access a personalized donor dashboard showing your complete impact history with receipts and photos",
    ],
  },
  {
    number: "04",
    title: "Fulfillment & Delivery",
    subtitle: "Guaranteed impact",
    description:
      "Trusted fulfillment partners are assigned to deliver the requested goods or services. Proof of delivery is verified before payments are released, ensuring complete accountability.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50",
    borderAccent: "border-l-purple-500",
    bulletColor: "text-purple-500",
    details: [
      "Qualified fulfillment partners are assigned based on location, expertise, and capacity to deliver",
      "Partners upload photo and video proof of delivery along with signed receipts and beneficiary confirmation",
      "Our verification team reviews all proof before authorizing payment release to the partner",
      "Donors receive a comprehensive impact report with complete documentation of the fulfilled request",
    ],
  },
];

const techStack = [
  {
    name: "Next.js 15",
    description: "React framework with server components, streaming, and edge rendering",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    gradient: "from-blue-500 to-blue-600",
  },
  {
    name: "TypeScript",
    description: "Type-safe development with full end-to-end type coverage",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    gradient: "from-teal-500 to-teal-600",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first styling with custom design tokens and dark mode",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    gradient: "from-amber-500 to-amber-600",
  },
  {
    name: "PostgreSQL",
    description: "Relational database with real-time views and advanced indexing",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.182 4 7 4s7-1.79 7-4V7M4 7c0 2.21 3.182 4 7 4s7-1.79 7-4M4 7c0-2.21 3.182-4 7-4s7 1.79 7 4m0 5v5" />
      </svg>
    ),
    gradient: "from-purple-500 to-purple-600",
  },
  {
    name: "AI & ML",
    description: "Fraud detection, document analysis, and smart verification algorithms",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-pink-500 to-pink-600",
  },
  {
    name: "Cloudinary",
    description: "Secure document and image management with optimized delivery",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-green-500 to-green-600",
  },
  {
    name: "Stripe",
    description: "Secure payment processing with support for global payment methods",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    name: "Redis",
    description: "In-memory caching for real-time notifications and session management",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-red-500 to-red-600",
  },
];

const faqs = [
  {
    question: "How does AidLink verify requests?",
    answer:
      "Every request goes through a multi-layer verification process. Our AI algorithms screen for fraud and inconsistencies, community verifiers review based on local knowledge, and high-value requests receive expert approval. This ensures only legitimate needs are published on the platform.",
  },
  {
    question: "How do donors know their money was used correctly?",
    answer:
      "Donors receive real-time tracking updates at every stage of the fulfillment process. Once delivery is complete, partners upload photo and video proof along with signed receipts. Our team verifies all documentation before releasing funds to the partner, and donors receive a comprehensive impact report.",
  },
  {
    question: "Can anyone submit a request for aid?",
    answer:
      "Yes. Beneficiaries can submit requests directly, or advocates such as social workers, family members, or NGO representatives can submit on their behalf. Each request must include proper documentation to support the stated need.",
  },
  {
    question: "How are fulfillment partners vetted?",
    answer:
      "All fulfillment partners undergo a thorough onboarding process that includes identity verification, business registration checks, reference validation, and ongoing performance monitoring. Partners must maintain a high fulfillment success rate to remain active on the platform.",
  },
];

export default function HowItWorksPage() {
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
                How It Works
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/70 sm:text-xl">
                From request submission to verified delivery, our platform ensures every step
                is transparent, accountable, and impact-driven.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-accent text-white hover:bg-accent-dark shadow-lg shadow-accent/30">
                    Get Started
                  </Button>
                </Link>
                <Link href="/donor/campaigns" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    Browse Campaigns
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">The Process</p>
              <h2 className="mt-3 text-3xl font-bold text-text-heading sm:text-4xl">
                From Request to Relief in 4 Steps
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
                Every donation flows through a structured pipeline designed for maximum transparency
                and accountability.
              </p>
            </div>

            <div className="mt-16 space-y-24">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className={`relative flex flex-col items-center gap-10 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-8 top-20 hidden h-full w-0.5 bg-gradient-to-b from-primary to-secondary lg:block" />
                  )}

                  {/* Text */}
                  <div className="flex-1">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-lg font-bold text-white shadow-lg`}>
                          {step.number}
                        </div>
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                            {step.subtitle}
                          </p>
                          <h3 className="text-2xl font-bold text-text-heading">{step.title}</h3>
                        </div>
                      </div>

                      <p className="text-lg leading-relaxed text-text-body">
                        {step.description}
                      </p>

                      <ul className="space-y-3 pt-2">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-3">
                            <svg className={`mt-0.5 h-5 w-5 shrink-0 ${step.bulletColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm leading-relaxed text-text-muted">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex-1">
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

        {/* Technology Stack */}
        <section className="bg-surface-secondary py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Built With</p>
              <h2 className="mt-3 text-3xl font-bold text-text-heading sm:text-4xl">
                Technology Stack
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
                Modern infrastructure powering a reliable, scalable, and secure platform.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="group rounded-2xl border border-border bg-surface p-6 text-center shadow-card transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`mx-auto inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${tech.gradient} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}>
                    {tech.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-text-heading">{tech.name}</h3>
                  <p className="mt-2 text-sm text-text-muted">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</p>
              <h2 className="mt-3 text-3xl font-bold text-text-heading sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-text-muted">
                Everything you need to know about how AidLink works.
              </p>
            </div>

            <div className="mt-12 space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 hover:shadow-md"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-base font-semibold text-text-heading transition-colors hover:text-primary">
                    {faq.question}
                    <svg
                      className="h-5 w-5 shrink-0 text-text-muted transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="border-t border-border px-6 py-5">
                    <p className="text-sm leading-relaxed text-text-body">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface-secondary py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-text-heading sm:text-4xl">
              Ready to Make an Impact?
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Join thousands of people who are using AidLink to give and receive help with
              complete transparency and confidence.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/20">
                  Create an Account
                </Button>
              </Link>
              <Link href="/donor/campaigns">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Browse Active Campaigns
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
