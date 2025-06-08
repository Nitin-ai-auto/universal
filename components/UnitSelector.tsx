import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Unit } from '../types';
import { ChevronDownIcon } from '../constants';

interface UnitSelectorProps {
  units: Unit[];
  selectedUnit: string; // unit ID
  onChange: (unitId: string) => void;
  label?: string;
  disabled?: boolean;
  idSuffix?: string; // For unique IDs for ARIA
}

export const UnitSelector: React.FC<UnitSelectorProps> = ({
  units,
  selectedUnit,
  onChange,
  label,
  disabled = false,
  idSuffix = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null); // Ref for the component's main div (input + button)
  const inputRef = useRef<HTMLInputElement>(null);
  const portalListRef = useRef<HTMLUListElement>(null); // Ref for the UL element in the portal
  const [isFocused, setIsFocused] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null);

  const getUnitDisplay = useCallback((unitId: string): string => {
    const unit = units.find(u => u.id === unitId);
    return unit ? `${unit.name} (${unit.symbol})` : '';
  }, [units]);

  useEffect(() => {
    if (!isFocused && !isOpen) {
      setSearchTerm(getUnitDisplay(selectedUnit));
    }
  }, [selectedUnit, getUnitDisplay, isFocused, isOpen]);

  const filteredUnits = useMemo(() => {
    if (isFocused && searchTerm === '') {
        return units;
    }
    if (!isFocused && searchTerm === getUnitDisplay(selectedUnit)) {
        return units;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return units.filter(
      (unit) =>
        unit.name.toLowerCase().includes(lowerSearchTerm) ||
        unit.symbol.toLowerCase().includes(lowerSearchTerm)
    );
  }, [units, searchTerm, isFocused, selectedUnit, getUnitDisplay]);

  // Calculate and update dropdown position
  useEffect(() => {
    const updatePosition = () => {
      if (isOpen && inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 2, // 2px gap
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    };

    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true); // Capture phase for scroll
    } else {
      setDropdownPosition(null); // Clear position when closed
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);


  // Handle click outside for portalized dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        wrapperRef.current && !wrapperRef.current.contains(event.target as Node) &&
        portalListRef.current && !portalListRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm(getUnitDisplay(selectedUnit));
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, selectedUnit, getUnitDisplay]);


  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && portalListRef.current) {
      const item = portalListRef.current.children[highlightedIndex] as HTMLLIElement | undefined;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, highlightedIndex]);

  const handleFocus = () => {
    if (disabled) return;
    setIsFocused(true);
    setIsOpen(true);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // setTimeout allows click on list items before closing
    setTimeout(() => {
      // Check if focus moved to an element within the portal list or the input wrapper
      if (
        isOpen &&
        wrapperRef.current && !wrapperRef.current.contains(document.activeElement as Node) &&
        portalListRef.current && !portalListRef.current.contains(document.activeElement as Node)
      ) {
        setIsOpen(false);
        setSearchTerm(getUnitDisplay(selectedUnit));
      }
    }, 150); // Increased delay slightly
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) setIsOpen(true);
        setHighlightedIndex((prev) => (prev + 1) % filteredUnits.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) setIsOpen(true);
        setHighlightedIndex((prev) => (prev - 1 + filteredUnits.length) % filteredUnits.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && filteredUnits[highlightedIndex]) {
          handleSelectUnit(filteredUnits[highlightedIndex].id);
        } else if (!isOpen) {
           setIsOpen(true); 
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm(getUnitDisplay(selectedUnit)); 
        inputRef.current?.blur();
        break;
      case 'Tab':
        setIsOpen(false); 
        setSearchTerm(getUnitDisplay(selectedUnit));
        break;
      default:
        if (!isOpen) setIsOpen(true);
        setHighlightedIndex(-1); 
        break;
    }
  };
  
  const handleSelectUnit = (unitId: string) => {
    onChange(unitId);
    setSearchTerm(getUnitDisplay(unitId));
    setIsOpen(false);
    setIsFocused(false); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
    setHighlightedIndex(-1); 
  };
  
  const displayValue = isFocused ? searchTerm : getUnitDisplay(selectedUnit);
  const inputId = `unit-selector-input-${idSuffix}`;
  const listboxId = `unit-selector-listbox-${idSuffix}`;

  const dropdownList = isOpen && !disabled && dropdownPosition && document.body && (
    createPortal(
      <ul
        ref={portalListRef}
        id={listboxId}
        role="listbox"
        aria-label={`${label || 'Units'} list`}
        style={{
          position: 'absolute',
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`,
        }}
        className="z-50 bg-slate-700 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm custom-scrollbar"
      >
        {filteredUnits.length > 0 ? (
          filteredUnits.map((unit, index) => (
            <li
              key={unit.id}
              id={`unit-option-${idSuffix}-${unit.id}`}
              role="option"
              aria-selected={unit.id === selectedUnit}
              onMouseDown={() => handleSelectUnit(unit.id)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 text-slate-100
                ${highlightedIndex === index ? 'bg-indigo-600' : ''}
                ${unit.id === selectedUnit ? 'font-semibold bg-indigo-700/50' : 'font-normal'}
              `}
            >
              <span className="block truncate">
                {unit.name} ({unit.symbol})
              </span>
              {unit.id === selectedUnit && (
                <span
                  className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                    highlightedIndex === index ? 'text-white' : 'text-indigo-400'
                  }`}
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </li>
          ))
        ) : (
          <li className="cursor-default select-none relative py-2 px-3 text-slate-400">
            No units found for "{searchTerm}"
          </li>
        )}
      </ul>,
      document.body
    )
  );

  return (
    <div className="w-full" ref={wrapperRef}> {/* Removed relative here, not needed for portal parent */}
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative"> {/* This relative is for the chevron icon inside the input wrapper */}
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-owns={isOpen ? listboxId : undefined} // Added aria-owns
          aria-activedescendant={isOpen && highlightedIndex >= 0 && filteredUnits[highlightedIndex] ? `unit-option-${idSuffix}-${filteredUnits[highlightedIndex].id}` : undefined}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Search or select unit"
          disabled={disabled}
          className={`w-full px-3 py-3 pr-10 rounded-md shadow-sm bg-slate-700 text-slate-100 border ${
            disabled ? 'border-slate-600 cursor-not-allowed' : 'border-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          } transition duration-150 ease-in-out text-base`}
        />
        <button
          type="button"
          aria-label={isOpen ? 'Close unit selection' : 'Open unit selection'}
          onClick={() => { if(!disabled) {
            if (isOpen) {
              setIsOpen(false);
              setSearchTerm(getUnitDisplay(selectedUnit));
            } else {
              handleFocus();
            }
          }}}
          disabled={disabled}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-200"
        >
          <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
      </div>
      {dropdownList}
    </div>
  );
};
