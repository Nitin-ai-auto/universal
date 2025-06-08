
import React from 'react';
import { UnitCategory, type Unit, type ConverterDefinition, DocumentActionType } from './types';

// SVG Icons
export const SwapIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h18m-7.5-14L21 6.5m0 0L16.5 11M21 6.5H3" />
  </svg>
);

export const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.11-7.5-8.862a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 4.625V17.25m0 0A2.25 2.25 0 0118.75 15H17.25m-1.5 2.25H12.375c-.621 0-1.125-.504-1.125-1.125V11.25a2.25 2.25 0 012.25-2.25h.093c.876 0 1.69.302 2.323.821M15.75 17.25M12 12h3.75m-3.75 0c.621 0 1.125.504 1.125 1.125v3.375c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 01-1.125-1.125v-3.375c0-.621.504-1.125 1.125-1.125h1.5z" />
  </svg>
);

export const ClearIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L6.75 4.5m0 0L1.5 9.75M6.75 4.5v15m10.5-15L22.5 9.75m0 0L17.25 4.5M17.25 4.5v15" />
 </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}>
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

// Renamed from ProcessIcon to GeminiIcon for clarity with its new role
export const GeminiIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
        <path d="M12.839,9.823c0.035-0.029,0.073-0.053,0.109-0.082c0.035-0.029,0.066-0.06,0.102-0.088c0.507-0.406,0.809-1.014,0.809-1.685c0-1.194-0.969-2.163-2.163-2.163c-1.194,0-2.163,0.969-2.163,2.163c0,0.671,0.302,1.279,0.809,1.685c0.035,0.028,0.067,0.059,0.102,0.088c0.036,0.029,0.073,0.053,0.109,0.082c-0.608,0.265-1.062,0.821-1.173,1.484H7.5c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5h2.916c0.119,0.708,0.609,1.294,1.258,1.572c-0.051,0.045-0.102,0.086-0.149,0.135c-0.032,0.032-0.069,0.058-0.101,0.09c-0.507,0.406-0.809,1.014-0.809,1.685c0,1.194,0.969,2.163,2.163,2.163c1.193,0,2.163-0.969,2.163-2.163c0-0.671-0.302-1.279-0.809-1.685c-0.032-0.032-0.069-0.058-0.101-0.09c-0.048-0.048-0.098-0.09-0.149-0.135c0.649-0.278,1.139-0.864,1.258-1.572h2.916c0.276,0,0.5-0.224,0.5-0.5s-0.224-0.5-0.5-0.5h-2.975C13.901,10.644,13.446,10.088,12.839,9.823z M12,7.5c0.276,0,0.5,0.224,0.5,0.5s-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5S11.724,7.5,12,7.5z M12,16.5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5,0.5s0.5,0.224,0.5,0.5S12.276,16.5,12,16.5z"/>
    </svg>
);


// Category Logos
const LengthLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5M3 10.5h18M3 13.5h18" />
  </svg>
);
const WeightLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75C13.0711 6.75 15.25 7.22386 15.25 9.375C15.25 11.5261 13.0711 12 12 12C10.9289 12 8.75 11.5261 8.75 9.375C8.75 7.22386 10.9289 6.75 12 6.75ZM12 6.75V4.5M12 12V19.5M3.75 14.25h16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.25L18 18H6l-2.25-3.75" />
  </svg>
);
const VolumeLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.625a2.25 2.25 0 01-2.245 2.125H6.62a2.25 2.25 0 01-2.245-2.125L3.75 7.5M10.5 7.5h3M5.25 7.5h13.5" />
  </svg>
);
const TemperatureLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5a4.5 4.5 0 00-4.5 4.5V15a4.5 4.5 0 004.5 4.5 4.5 4.5 0 004.5-4.5V9a4.5 4.5 0 00-4.5-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75V18m0-13.5V3M9 6.75h6M9 11.25h.75M14.25 11.25H15" />
  </svg>
);
const SpeedLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.478-10.478a1.125 1.125 0 011.591 0l4.422 4.422a1.125 1.125 0 010 1.591L9.75 19.5H3.75v-6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25L19.5 5.25M12 12l3.75 3.75" />
  </svg>
);
const AreaLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 2.25v19.5h19.5V2.25H2.25zM9 9H3v6h6V9zm12 0h-6v6h6V9zm-6 12V9m0 12H9v-6h6v6z" />
  </svg>
);
const DataStorageLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg>
);
const DocumentProcessingLogo: React.FC<{ className?: string }> = ({ className }) => ( // Renamed from DocumentLogo
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.125.511c-.935.243-1.897.611-2.788 1.126M18 14.25v2.885c0 .213-.057.417-.161.599l-1.166 2.042a.825.825 0 01-1.42.234l-1.82-3.185a.825.825 0 00-1.42-.234l-1.82 3.185a.825.825 0 01-1.42.234l-1.166-2.041a.654.654 0 00-.16-.6L6.75 14.25M6.75 14.25H4.875c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125z" />
  </svg>
);
const CurrencyLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.219 12.768 11 12 11c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const CryptoLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.393-.029.805-.029 1.204 0 1.13.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5M8.25 7.5V9a.75.75 0 01-.75.75h-5.25a.75.75 0 01-.75-.75V7.5m0 0H3V7.5m0 0l-.75-.75M3 7.5l.75-.75M3 7.5l.75.75M3 7.5l-.75.75m6.096-4.89c.18-.912.754-1.73.162-2.518C8.913 1.163 7.864.5 6.697.5 5.445.5 4.348 1.29 4.049 2.582c-.036.15-.054.307-.054.468V7.5m0 0a2.25 2.25 0 012.25-2.25h1.5a2.25 2.25 0 012.25 2.25m0 0a2.25 2.25 0 012.25-2.25h1.5a2.25 2.25 0 012.25 2.25m0 0V9a.75.75 0 01-.75.75h-5.25a.75.75 0 01-.75-.75V7.5m7.5 0V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.204 0c-1.13.094-1.976 1.057-1.976 2.192V7.5" />
  </svg>
);


// Units Definitions
const LENGTH_UNITS: Unit[] = [
  { id: 'nanometer', name: 'Nanometer', symbol: 'nm', category: UnitCategory.LENGTH, factor: 1e-9 },
  { id: 'micrometer', name: 'Micrometer', symbol: 'µm', category: UnitCategory.LENGTH, factor: 1e-6 },
  { id: 'millimeter', name: 'Millimeter', symbol: 'mm', category: UnitCategory.LENGTH, factor: 0.001 },
  { id: 'centimeter', name: 'Centimeter', symbol: 'cm', category: UnitCategory.LENGTH, factor: 0.01 },
  { id: 'decimeter', name: 'Decimeter', symbol: 'dm', category: UnitCategory.LENGTH, factor: 0.1 },
  { id: 'meter', name: 'Meter', symbol: 'm', category: UnitCategory.LENGTH, factor: 1 },
  { id: 'decameter', name: 'Decameter', symbol: 'dam', category: UnitCategory.LENGTH, factor: 10 },
  { id: 'hectometer', name: 'Hectometer', symbol: 'hm', category: UnitCategory.LENGTH, factor: 100 },
  { id: 'kilometer', name: 'Kilometer', symbol: 'km', category: UnitCategory.LENGTH, factor: 1000 },
  { id: 'inch', name: 'Inch', symbol: 'in', category: UnitCategory.LENGTH, factor: 0.0254 },
  { id: 'foot', name: 'Foot', symbol: 'ft', category: UnitCategory.LENGTH, factor: 0.3048 },
  { id: 'yard', name: 'Yard', symbol: 'yd', category: UnitCategory.LENGTH, factor: 0.9144 },
  { id: 'mile', name: 'Mile', symbol: 'mi', category: UnitCategory.LENGTH, factor: 1609.34 },
  { id: 'nautical_mile', name: 'Nautical Mile', symbol: 'NM', category: UnitCategory.LENGTH, factor: 1852 },
  { id: 'furlong', name: 'Furlong', symbol: 'fur', category: UnitCategory.LENGTH, factor: 201.168 },
  { id: 'astronomical_unit', name: 'Astronomical Unit', symbol: 'AU', category: UnitCategory.LENGTH, factor: 1.496e+11 },
  { id: 'light_year', name: 'Light Year', symbol: 'ly', category: UnitCategory.LENGTH, factor: 9.461e+15 },
  { id: 'parsec', name: 'Parsec', symbol: 'pc', category: UnitCategory.LENGTH, factor: 3.086e+16 },
];

const WEIGHT_UNITS: Unit[] = [
  { id: 'microgram', name: 'Microgram', symbol: 'µg', category: UnitCategory.WEIGHT, factor: 1e-9 },
  { id: 'milligram', name: 'Milligram', symbol: 'mg', category: UnitCategory.WEIGHT, factor: 1e-6 },
  { id: 'gram', name: 'Gram', symbol: 'g', category: UnitCategory.WEIGHT, factor: 0.001 },
  { id: 'kilogram', name: 'Kilogram', symbol: 'kg', category: UnitCategory.WEIGHT, factor: 1 },
  { id: 'metric_ton', name: 'Metric Ton (Tonne)', symbol: 't', category: UnitCategory.WEIGHT, factor: 1000 },
  { id: 'ounce', name: 'Ounce', symbol: 'oz', category: UnitCategory.WEIGHT, factor: 0.0283495 },
  { id: 'pound', name: 'Pound', symbol: 'lb', category: UnitCategory.WEIGHT, factor: 0.453592 },
  { id: 'stone', name: 'Stone', symbol: 'st', category: UnitCategory.WEIGHT, factor: 6.35029 },
  { id: 'short_ton_us', name: 'Short Ton (US)', symbol: 'ton (US)', category: UnitCategory.WEIGHT, factor: 907.185 },
  { id: 'long_ton_uk', name: 'Long Ton (UK)', symbol: 'ton (UK)', category: UnitCategory.WEIGHT, factor: 1016.05 },
  { id: 'grain', name: 'Grain', symbol: 'gr', category: UnitCategory.WEIGHT, factor: 0.00006479891 },
];

const VOLUME_UNITS: Unit[] = [
  { id: 'milliliter', name: 'Milliliter', symbol: 'mL', category: UnitCategory.VOLUME, factor: 0.001 },
  { id: 'centiliter', name: 'Centiliter', symbol: 'cL', category: UnitCategory.VOLUME, factor: 0.01 },
  { id: 'deciliter', name: 'Deciliter', symbol: 'dL', category: UnitCategory.VOLUME, factor: 0.1 },
  { id: 'liter', name: 'Liter', symbol: 'L', category: UnitCategory.VOLUME, factor: 1 },
  { id: 'cubic_centimeter', name: 'Cubic Centimeter', symbol: 'cm³', category: UnitCategory.VOLUME, factor: 0.001 },
  { id: 'cubic_meter', name: 'Cubic Meter', symbol: 'm³', category: UnitCategory.VOLUME, factor: 1000 },
  { id: 'us_teaspoon', name: 'Teaspoon (US)', symbol: 'tsp (US)', category: UnitCategory.VOLUME, factor: 0.00492892 },
  { id: 'us_tablespoon', name: 'Tablespoon (US)', symbol: 'tbsp (US)', category: UnitCategory.VOLUME, factor: 0.0147868 },
  { id: 'us_fluid_ounce', name: 'Fluid Ounce (US)', symbol: 'fl oz (US)', category: UnitCategory.VOLUME, factor: 0.0295735 },
  { id: 'us_cup', name: 'Cup (US)', symbol: 'cup (US)', category: UnitCategory.VOLUME, factor: 0.236588 },
  { id: 'us_pint', name: 'Pint (US)', symbol: 'pt (US)', category: UnitCategory.VOLUME, factor: 0.473176 },
  { id: 'us_quart', name: 'Quart (US)', symbol: 'qt (US)', category: UnitCategory.VOLUME, factor: 0.946353 },
  { id: 'us_gallon', name: 'Gallon (US)', symbol: 'gal (US)', category: UnitCategory.VOLUME, factor: 3.78541 },
  { id: 'uk_fluid_ounce', name: 'Fluid Ounce (UK)', symbol: 'fl oz (UK)', category: UnitCategory.VOLUME, factor: 0.0284131 },
  { id: 'uk_pint', name: 'Pint (UK)', symbol: 'pt (UK)', category: UnitCategory.VOLUME, factor: 0.568261 },
  { id: 'uk_quart', name: 'Quart (UK)', symbol: 'qt (UK)', category: UnitCategory.VOLUME, factor: 1.13652 },
  { id: 'uk_gallon', name: 'Gallon (UK)', symbol: 'gal (UK)', category: UnitCategory.VOLUME, factor: 4.54609 },
  { id: 'cubic_inch', name: 'Cubic Inch', symbol: 'in³', category: UnitCategory.VOLUME, factor: 0.0163871 },
  { id: 'cubic_foot', name: 'Cubic Foot', symbol: 'ft³', category: UnitCategory.VOLUME, factor: 28.3168 },
];

const TEMPERATURE_UNITS: Unit[] = [
  { id: 'celsius', name: 'Celsius', symbol: '°C', category: UnitCategory.TEMPERATURE },
  { id: 'fahrenheit', name: 'Fahrenheit', symbol: '°F', category: UnitCategory.TEMPERATURE },
  { id: 'kelvin', name: 'Kelvin', symbol: 'K', category: UnitCategory.TEMPERATURE },
  { id: 'rankine', name: 'Rankine', symbol: '°R', category: UnitCategory.TEMPERATURE },
  { id: 'reaumur', name: "Réaumur", symbol: "°Ré", category: UnitCategory.TEMPERATURE },
];

const SPEED_UNITS: Unit[] = [
    { id: 'mps', name: 'Meter/second', symbol: 'm/s', category: UnitCategory.SPEED, factor: 1 },
    { id: 'kph', name: 'Kilometer/hour', symbol: 'km/h', category: UnitCategory.SPEED, factor: 1/3.6 },
    { id: 'mph', name: 'Mile/hour', symbol: 'mph', category: UnitCategory.SPEED, factor: 0.44704 },
    { id: 'knot', name: 'Knot', symbol: 'kn', category: UnitCategory.SPEED, factor: 0.514444 },
    { id: 'fps', name: 'Foot/second', symbol: 'ft/s', category: UnitCategory.SPEED, factor: 0.3048 },
    { id: 'speed_of_light', name: 'Speed of Light (vacuum)', symbol: 'c', category: UnitCategory.SPEED, factor: 299792458 },
];

const AREA_UNITS: Unit[] = [
    { id: 'sqmm', name: 'Square Millimeter', symbol: 'mm²', category: UnitCategory.AREA, factor: 0.000001 },
    { id: 'sqcm', name: 'Square Centimeter', symbol: 'cm²', category: UnitCategory.AREA, factor: 0.0001 },
    { id: 'sqmeter', name: 'Square Meter', symbol: 'm²', category: UnitCategory.AREA, factor: 1 },
    { id: 'hectare', name: 'Hectare', symbol: 'ha', category: UnitCategory.AREA, factor: 10000 },
    { id: 'sqkm', name: 'Square Kilometer', symbol: 'km²', category: UnitCategory.AREA, factor: 1000000 },
    { id: 'sqinch', name: 'Square Inch', symbol: 'in²', category: UnitCategory.AREA, factor: 0.00064516 },
    { id: 'sqfoot', name: 'Square Foot', symbol: 'ft²', category: UnitCategory.AREA, factor: 0.092903 },
    { id: 'sqyard', name: 'Square Yard', symbol: 'yd²', category: UnitCategory.AREA, factor: 0.836127 },
    { id: 'acre', name: 'Acre', symbol: 'acre', category: UnitCategory.AREA, factor: 4046.86 },
    { id: 'sqmile', name: 'Square Mile', symbol: 'mi²', category: UnitCategory.AREA, factor: 2589988.11 },
];

const DATA_STORAGE_UNITS: Unit[] = [
    { id: 'bit', name: 'Bit', symbol: 'bit', category: UnitCategory.DATA_STORAGE, factor: 0.125 }, 
    { id: 'byte', name: 'Byte', symbol: 'B', category: UnitCategory.DATA_STORAGE, factor: 1 },
    { id: 'kilobyte', name: 'Kilobyte (10³ B)', symbol: 'kB', category: UnitCategory.DATA_STORAGE, factor: 1000 },
    { id: 'kibibyte', name: 'Kibibyte (2¹⁰ B)', symbol: 'KiB', category: UnitCategory.DATA_STORAGE, factor: 1024 },
    { id: 'megabyte', name: 'Megabyte (10⁶ B)', symbol: 'MB', category: UnitCategory.DATA_STORAGE, factor: 1000**2 },
    { id: 'mebibyte', name: 'Mebibyte (2²⁰ B)', symbol: 'MiB', category: UnitCategory.DATA_STORAGE, factor: 1024**2 },
    { id: 'gigabyte', name: 'Gigabyte (10⁹ B)', symbol: 'GB', category: UnitCategory.DATA_STORAGE, factor: 1000**3 },
    { id: 'gibibyte', name: 'Gibibyte (2³⁰ B)', symbol: 'GiB', category: UnitCategory.DATA_STORAGE, factor: 1024**3 },
    { id: 'terabyte', name: 'Terabyte (10¹² B)', symbol: 'TB', category: UnitCategory.DATA_STORAGE, factor: 1000**4 },
    { id: 'tebibyte', name: 'Tebibyte (2⁴⁰ B)', symbol: 'TiB', category: UnitCategory.DATA_STORAGE, factor: 1024**4 },
    { id: 'petabyte', name: 'Petabyte (10¹⁵ B)', symbol: 'PB', category: UnitCategory.DATA_STORAGE, factor: 1000**5 },
    { id: 'pebibyte', name: 'Pebibyte (2⁵⁰ B)', symbol: 'PiB', category: UnitCategory.DATA_STORAGE, factor: 1024**5 },
];

const CURRENCY_UNITS: Unit[] = [
  { id: 'USD', name: 'US Dollar', symbol: '$', category: UnitCategory.CURRENCY },
  { id: 'EUR', name: 'Euro', symbol: '€', category: UnitCategory.CURRENCY },
  { id: 'JPY', name: 'Japanese Yen', symbol: '¥', category: UnitCategory.CURRENCY },
  { id: 'GBP', name: 'British Pound', symbol: '£', category: UnitCategory.CURRENCY },
  { id: 'AUD', name: 'Australian Dollar', symbol: 'A$', category: UnitCategory.CURRENCY },
  { id: 'CAD', name: 'Canadian Dollar', symbol: 'C$', category: UnitCategory.CURRENCY },
  { id: 'CHF', name: 'Swiss Franc', symbol: 'CHF', category: UnitCategory.CURRENCY },
  { id: 'CNY', name: 'Chinese Yuan Renminbi', symbol: '¥', category: UnitCategory.CURRENCY },
  { id: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', category: UnitCategory.CURRENCY },
  { id: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', category: UnitCategory.CURRENCY },
  { id: 'SEK', name: 'Swedish Krona', symbol: 'kr', category: UnitCategory.CURRENCY },
  { id: 'KRW', name: 'South Korean Won', symbol: '₩', category: UnitCategory.CURRENCY },
  { id: 'SGD', name: 'Singapore Dollar', symbol: 'S$', category: UnitCategory.CURRENCY },
  { id: 'NOK', name: 'Norwegian Krone', symbol: 'kr', category: UnitCategory.CURRENCY },
  { id: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', category: UnitCategory.CURRENCY },
  { id: 'INR', name: 'Indian Rupee', symbol: '₹', category: UnitCategory.CURRENCY },
  { id: 'RUB', name: 'Russian Ruble', symbol: '₽', category: UnitCategory.CURRENCY },
  { id: 'ZAR', name: 'South African Rand', symbol: 'R', category: UnitCategory.CURRENCY },
  { id: 'BRL', name: 'Brazilian Real', symbol: 'R$', category: UnitCategory.CURRENCY },
  { id: 'TRY', name: 'Turkish Lira', symbol: '₺', category: UnitCategory.CURRENCY },
];

const CRYPTO_UNITS: Unit[] = [
  { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', category: UnitCategory.CRYPTO },
  { id: 'ETH', name: 'Ethereum', symbol: 'ETH', category: UnitCategory.CRYPTO },
  { id: 'USDT', name: 'Tether', symbol: 'USDT', category: UnitCategory.CRYPTO },
  { id: 'BNB', name: 'Binance Coin', symbol: 'BNB', category: UnitCategory.CRYPTO },
  { id: 'SOL', name: 'Solana', symbol: 'SOL', category: UnitCategory.CRYPTO },
  { id: 'XRP', name: 'XRP (Ripple)', symbol: 'XRP', category: UnitCategory.CRYPTO },
  { id: 'ADA', name: 'Cardano', symbol: 'ADA', category: UnitCategory.CRYPTO },
  { id: 'DOGE', name: 'Dogecoin', symbol: 'DOGE', category: UnitCategory.CRYPTO },
  { id: 'SHIB', name: 'Shiba Inu', symbol: 'SHIB', category: UnitCategory.CRYPTO },
  { id: 'AVAX', name: 'Avalanche', symbol: 'AVAX', category: UnitCategory.CRYPTO },
  { id: 'DOT', name: 'Polkadot', symbol: 'DOT', category: UnitCategory.CRYPTO },
  { id: 'LTC', name: 'Litecoin', symbol: 'LTC', category: UnitCategory.CRYPTO },
  { id: 'LINK', name: 'Chainlink', symbol: 'LINK', category: UnitCategory.CRYPTO },
  { id: 'USD', name: 'US Dollar (for Crypto Conversion)', symbol: '$', category: UnitCategory.CRYPTO },
];

// For Document Processing, "units" represent actions rather than file formats for conversion targets.
// The "From" unit will still be a file type (implicitly, handled by file input).
const DOCUMENT_PROCESSING_ACTIONS: Unit[] = [
  { id: DocumentActionType.TO_MARKDOWN, name: 'Convert to Markdown', symbol: 'MD', category: UnitCategory.DOCUMENT, actionType: DocumentActionType.TO_MARKDOWN },
  { id: DocumentActionType.SUMMARIZE, name: 'Summarize Text', symbol: '∑', category: UnitCategory.DOCUMENT, actionType: DocumentActionType.SUMMARIZE },
];

// These are illustrative source file types, not used for 'To Unit' selection
const DOCUMENT_SOURCE_TYPES: Unit[] = [
    { id: 'txt', name: 'Text File', symbol: 'txt', category: UnitCategory.DOCUMENT, mimeType: 'text/plain', extension: '.txt' },
    { id: 'md', name: 'Markdown File', symbol: 'md', category: UnitCategory.DOCUMENT, mimeType: 'text/markdown', extension: '.md' },
  ];


export const CONVERTER_DEFINITIONS: ConverterDefinition[] = [
  {
    id: 'currency',
    title: 'Currency Converter',
    category: UnitCategory.CURRENCY,
    units: CURRENCY_UNITS,
    defaultFromUnitId: 'USD',
    defaultToUnitId: 'EUR',
    isRateBased: true,
    logo: <CurrencyLogo className="w-7 h-7 text-cyan-400" />
  },
  {
    id: 'length',
    title: 'Length & Distance Converter',
    category: UnitCategory.LENGTH,
    units: LENGTH_UNITS,
    defaultFromUnitId: 'meter',
    defaultToUnitId: 'foot',
    logo: <LengthLogo className="w-7 h-7 text-purple-300" />
  },
  {
    id: 'weight',
    title: 'Weight & Mass Converter',
    category: UnitCategory.WEIGHT,
    units: WEIGHT_UNITS,
    defaultFromUnitId: 'kilogram',
    defaultToUnitId: 'pound',
    logo: <WeightLogo className="w-7 h-7 text-pink-400" />
  },
  {
    id: 'temperature',
    title: 'Temperature Converter',
    category: UnitCategory.TEMPERATURE,
    units: TEMPERATURE_UNITS,
    defaultFromUnitId: 'celsius',
    defaultToUnitId: 'fahrenheit',
    logo: <TemperatureLogo className="w-7 h-7 text-orange-400" />
  },
  {
    id: 'document_processing', // Changed ID
    title: 'Document Text Processor (Gemini)',
    category: UnitCategory.DOCUMENT,
    units: DOCUMENT_PROCESSING_ACTIONS, // These are the "To" actions
    defaultFromUnitId: 'txt', // Conceptually represents the input type
    defaultToUnitId: DocumentActionType.SUMMARIZE, // Default to summarize
    isFileBased: true,
    acceptFileTypes: '.txt,.md',
    logo: <DocumentProcessingLogo className="w-7 h-7 text-teal-400" />
  },
  {
    id: 'volume',
    title: 'Volume & Capacity Converter',
    category: UnitCategory.VOLUME,
    units: VOLUME_UNITS,
    defaultFromUnitId: 'liter',
    defaultToUnitId: 'us_gallon',
    logo: <VolumeLogo className="w-7 h-7 text-red-400" />
  },
  {
    id: 'data_storage',
    title: 'Data Storage Converter',
    category: UnitCategory.DATA_STORAGE,
    units: DATA_STORAGE_UNITS,
    defaultFromUnitId: 'megabyte',
    defaultToUnitId: 'mebibyte',
    logo: <DataStorageLogo className="w-7 h-7 text-green-400" />
  },
  {
    id: 'area',
    title: 'Area Converter',
    category: UnitCategory.AREA,
    units: AREA_UNITS,
    defaultFromUnitId: 'sqmeter',
    defaultToUnitId: 'acre',
    logo: <AreaLogo className="w-7 h-7 text-lime-400" />
  },
  {
    id: 'speed',
    title: 'Speed Converter',
    category: UnitCategory.SPEED,
    units: SPEED_UNITS,
    defaultFromUnitId: 'kph',
    defaultToUnitId: 'mph',
    logo: <SpeedLogo className="w-7 h-7 text-yellow-400" />
  },
  {
    id: 'crypto',
    title: 'Cryptocurrency Converter',
    category: UnitCategory.CRYPTO,
    units: CRYPTO_UNITS,
    defaultFromUnitId: 'BTC',
    defaultToUnitId: 'USD', 
    isRateBased: true,
    logo: <CryptoLogo className="w-7 h-7 text-sky-400" />
  },
];

export { DOCUMENT_SOURCE_TYPES };
