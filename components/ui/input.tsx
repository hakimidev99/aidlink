import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
<<<<<<< HEAD
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label className="text-xs font-bold uppercase tracking-wider text-text-heading/80 px-1">
          {label}
        </label>
      )}
      
      <div className="relative w-full">
        <input 
          className={`w-full rounded-xl bg-white/40 dark:bg-black/10 backdrop-blur-md border border-white/60 dark:border-white/10 px-5 py-3.5 text-text-heading dark:text-white placeholder:text-text-muted/60 outline-none transition-all duration-200 focus:border-primary-500/80 focus:ring-2 focus:ring-primary-500/10 shadow-sm ${
            error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/10' : ''
          } ${className}`}
          {...props}
        />
=======
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, icon, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-heading">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-text-muted">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-heading outline-none transition-all placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 ${
              error ? 'border-error focus:border-error focus:ring-error/20' : ''
            } ${icon ? 'pl-11' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-error mt-0.5">{error}</p>
        )}
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
      </div>

<<<<<<< HEAD
      {error && (
        <span className="text-xs font-semibold text-danger-600 px-1 animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
}
=======
Input.displayName = 'Input';
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
