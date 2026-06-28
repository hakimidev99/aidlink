import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-1 flex-col items-center justify-center overflow-hidden bg-zinc-50 font-sans dark:bg-black">
      {/* Subtle background blur for a liquid glass environment effect */}
      <div className="absolute -left-[10%] -top-[10%] h-96 w-96 rounded-full bg-blue-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] h-96 w-96 rounded-full bg-teal-500/20 blur-[100px] pointer-events-none" />

      <main className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center px-6 py-32 sm:px-16">
        
        {/* Header / Brand */}
        <div className="mb-8 flex flex-col items-center gap-6 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 sm:text-6xl">
            AidLink
          </h1>
          <h2 className="max-w-2xl text-3xl font-semibold leading-10 tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Transparent Aid Fulfillment & Fundraising
          </h2>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Connect directly with campaigns, verify impact, or start raising funds today. Experience a new standard of trust.
          </p>
        </div>

        {/* Primary Call to Action */}
        <div className="mb-12 w-full max-w-md">
          <Link
            href="/signup"
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-blue-600 px-5 text-lg font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-blue-500/40"
          >
            Get Started
          </Link>
        </div>

        {/* Glassmorphic Navigation Grid */}
        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Link
            href="/about"
            className="flex h-14 w-full items-center justify-center rounded-xl border border-zinc-200/50 bg-white/40 px-5 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-zinc-200"
          >
            About Us
          </Link>
          <Link
            href="/how-it-works"
            className="flex h-14 w-full items-center justify-center rounded-xl border border-zinc-200/50 bg-white/40 px-5 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-zinc-200"
          >
            How It Works
          </Link>
          <Link
            href="/login"
            className="flex h-14 w-full items-center justify-center rounded-xl border border-zinc-200/50 bg-white/40 px-5 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-zinc-200"
          >
            Sign In
          </Link>
          <Link
            href="/beneficiary"
            className="flex h-14 w-full items-center justify-center rounded-xl border border-zinc-200/50 bg-white/40 px-5 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-zinc-200"
          >
            Beneficiary Portal
          </Link>
          <Link
            href="/donor"
            className="flex h-14 w-full items-center justify-center rounded-xl border border-zinc-200/50 bg-white/40 px-5 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-zinc-200"
          >
            Donor Dashboard
          </Link>
          <Link
            href="/partner"
            className="flex h-14 w-full items-center justify-center rounded-xl border border-zinc-200/50 bg-white/40 px-5 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-zinc-200"
          >
            Partner Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}