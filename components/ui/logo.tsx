import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const imageSizes = {
  sm: 48,
  md: 64,
  lg: 100,
  xl: 100,
};

export function Logo({
  className = "",
  imageClassName = "",
  size = "md",
  showText = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 transition-transform duration-200 hover:scale-105 active:scale-95 ${className}`}
      aria-label="AidLink Home"
    >
      <Image
        src="/logo.png"
        alt="AidLink Logo"
        width={imageSizes[size]}
        height={imageSizes[size]}
        className={`object-contain ${imageClassName}`}
        priority
      />
      
    </Link>
  );
}
