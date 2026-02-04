import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  
  // Base styles for touch targets and focus states
  const baseStyles = `
    inline-flex items-center justify-center 
    font-medium text-[16px] leading-6 tracking-wide
    rounded-full transition-all duration-300 ease-out
    min-h-[48px] px-6 py-2
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  // Variant mappings using the Oceanic palette
  const variants = {
    primary: `bg-[#2B6B7C] text-white hover:bg-[#1E4D59] active:scale-[0.98] shadow-sm hover:shadow-md focus-visible:ring-[#2B6B7C]`,
    secondary: `bg-white text-[#2B6B7C] border border-[#2B6B7C] hover:bg-[#F0F9FB] active:scale-[0.98] focus-visible:ring-[#2B6B7C]`,
    text: `bg-transparent text-[#2B6B7C] hover:bg-[#F0F9FB] focus-visible:ring-[#2B6B7C] underline-offset-4 hover:underline`
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2" aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
};