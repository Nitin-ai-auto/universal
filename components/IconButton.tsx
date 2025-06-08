
import React from 'react';

interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string; // Accessibility label
  className?: string;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, label, className, disabled = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className={`p-2 rounded-md text-slate-400 hover:text-indigo-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition duration-150 ease-in-out ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {icon}
    </button>
  );
};
