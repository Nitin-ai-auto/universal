
import React from 'react';

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  unitSymbol?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  placeholder = "0.00",
  label,
  disabled = false,
  unitSymbol,
  onFocus,
  onBlur,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow empty string, numbers, and a single decimal point
    const val = e.target.value;
    if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
      onChange(val);
    }
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>}
      <div className="relative">
        <input
          type="text" // Using text to allow more flexible input, validation is manual
          inputMode="decimal" // Helps mobile keyboards
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 rounded-md shadow-sm bg-slate-700 text-slate-100 border ${disabled ? 'border-slate-600 cursor-not-allowed' : 'border-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'} transition duration-150 ease-in-out text-lg ${unitSymbol ? 'pr-12' : ''}`}
        />
        {unitSymbol && !disabled && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-slate-400 sm:text-sm">{unitSymbol}</span>
          </div>
        )}
      </div>
    </div>
  );
};
