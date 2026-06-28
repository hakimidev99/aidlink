import React from 'react';

// Define the properties the button will accept
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { 
      className = '', 
      variant = 'primary', 
      size = 'md', 
      isLoading = false, 
      children, 
      disabled, 
      ...props 
    }, 
    ref
  ) => {
    // Base classes applied to all buttons
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    // Size variants
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-12 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    // Color variants mapping to your globals.css
    const variants = {
      primary: "bg-primary text-white hover:bg-secondary focus:ring-primary",
      secondary: "bg-secondary text-white hover:bg-primary focus:ring-secondary",
      accent: "bg-accent text-white hover:opacity-90 focus:ring-accent",
      outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
      ghost: "bg-transparent text-text-body hover:bg-muted hover:text-text-heading focus:ring-muted",
    };

    // Combine classes
    const combinedClasses = `${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`;

    return (
      <button
        ref={ref}
        className={combinedClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';