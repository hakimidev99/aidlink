import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const footerLinks = {
  Platform: [
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
    { name: "For Donors", href: "/donor" },
    { name: "For Beneficiaries", href: "/beneficiary" },
  ],
  Support: [
    { name: "Help Center", href: "#" },
    { name: "Safety", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  Connect: [
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Contact Us", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo size="lg" showText />
            <p className="mt-4 text-sm text-text-muted max-w-xs leading-relaxed">
              Turning donations into guaranteed impact through verified fulfillment partners.
              Every donation, every delivery, every life changed.
            </p>
            <div className="mt-6 flex gap-3">
              {["twitter", "linkedin", "instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-tertiary text-text-muted hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white transition-all duration-200"
                >
                  <span className="text-xs font-bold uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-text-heading">{title}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center text-sm text-text-muted">
            &copy; {new Date().getFullYear()} AidLink. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <span>·</span>
            <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
