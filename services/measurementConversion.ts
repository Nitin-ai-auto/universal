import { UnitCategory, type Unit } from '../types';

// Helper to find unit definition
const findUnit = (unitId: string, units: Unit[]): Unit | undefined => units.find(u => u.id === unitId);

// Factor-based conversion
const convertByFactor = (value: number, fromUnit: Unit, toUnit: Unit): number => {
  if (fromUnit.factor === undefined || toUnit.factor === undefined) {
    console.error("Factor not defined for unit", fromUnit, toUnit);
    return NaN; 
  }
  // factor means "value of this unit in base units"
  // e.g. Kilometer factor = 1000 (1km = 1000m). Meter factor = 1.
  // km to m: value_km * factor_km / factor_m = value_km * 1000 / 1
  // m to km: value_m * factor_m / factor_km = value_m * 1 / 1000

  const valueInBaseUnits = value * fromUnit.factor;
  return valueInBaseUnits / toUnit.factor;
};


// Temperature conversion
const convertTemperature = (value: number, fromUnitId: string, toUnitId: string): number => {
  if (fromUnitId === toUnitId) return value;

  let celsiusValue: number;

  // Convert input to Celsius
  switch (fromUnitId) {
    case 'celsius':
      celsiusValue = value;
      break;
    case 'fahrenheit':
      celsiusValue = (value - 32) * 5 / 9;
      break;
    case 'kelvin':
      celsiusValue = value - 273.15;
      break;
    case 'rankine':
      celsiusValue = (value - 491.67) * 5 / 9;
      break;
    case 'reaumur':
      celsiusValue = value * 5 / 4;
      break;
    default: return NaN;
  }

  // Convert Celsius to target unit
  switch (toUnitId) {
    case 'celsius':
      return celsiusValue;
    case 'fahrenheit':
      return (celsiusValue * 9 / 5) + 32;
    case 'kelvin':
      return celsiusValue + 273.15;
    case 'rankine':
      return (celsiusValue * 9 / 5) + 491.67;
    case 'reaumur':
      return celsiusValue * 4 / 5;
    default: return NaN;
  }
};

export const performConversion = (
  value: number,
  fromUnitId: string,
  toUnitId: string,
  category: UnitCategory,
  units: Unit[]
): number | string => {
  if (isNaN(value)) return '';

  if (category === UnitCategory.TEMPERATURE) {
    return convertTemperature(value, fromUnitId, toUnitId);
  }

  const fromUnit = findUnit(fromUnitId, units);
  const toUnit = findUnit(toUnitId, units);

  if (!fromUnit || !toUnit) {
    console.error('Unit definition not found for conversion.');
    return NaN;
  }
  
  if (fromUnit.factor === undefined || toUnit.factor === undefined) {
    console.error(`Factors not defined for units in category ${category}: ${fromUnit.id}, ${toUnit.id}`);
    return NaN;
  }

  return convertByFactor(value, fromUnit, toUnit);
};
