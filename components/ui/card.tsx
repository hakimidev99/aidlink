import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

export function Card({ className = '', children, hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface ${
        hover ? 'shadow-card hover:shadow-card-lg' : 'shadow-card'
      } ${className}`}
    >
      {children}
    </div>
  );
}
