import { type ConversionRates, UnitCategory, type Unit } from '../types'; // Added Unit for potential future use
import { CONVERTER_DEFINITIONS } from '../constants'; // To get all unit IDs if needed dynamically

// Mock API delay
const MOCK_API_DELAY = 500;

// Helper to generate placeholder rates for all defined units in a category
const generateMockRatesForCategory = (category: UnitCategory): ConversionRates => {
  const categoryDef = CONVERTER_DEFINITIONS.find(def => def.category === category);
  if (!categoryDef) return {};

  const rates: ConversionRates = {};
  // Base unit is typically the first one or a common one like USD
  const baseUnitId = categoryDef.units.find(u => u.id === 'USD')?.id || categoryDef.units[0]?.id || 'BASE';
  
  categoryDef.units.forEach(unit => {
    if (unit.id === baseUnitId) {
      rates[unit.id] = 1; // Base rate
    } else {
      // Generate somewhat plausible random-ish rates for mock purposes
      // This is very basic and not realistic for actual exchange rates.
      if (category === UnitCategory.CURRENCY) {
        // For USD base: EUR might be 0.9, JPY 150, etc.
        if (unit.id === 'EUR') rates[unit.id] = 0.92;
        else if (unit.id === 'JPY') rates[unit.id] = 157.0;
        else if (unit.id === 'GBP') rates[unit.id] = 0.79;
        else if (unit.id === 'INR') rates[unit.id] = 83.50;
        else rates[unit.id] = Number((Math.random() * 2 + 0.5).toFixed(2)); // Random between 0.5 and 2.5
      } else if (category === UnitCategory.CRYPTO) {
         // For USD base: BTC ~60k, ETH ~3k
        if (unit.id === 'BTC') rates[unit.id] = 68000;
        else if (unit.id === 'ETH') rates[unit.id] = 3800;
        else if (unit.id === 'USDT') rates[unit.id] = 1; // Stablecoin
        else rates[unit.id] = Number((Math.random() * 500 + 1).toFixed(2)); // Crypto can have varied prices
      } else {
        rates[unit.id] = 1; // Default for other categories if this function was misused
      }
    }
  });
   // Ensure USD is present for crypto if it's a target, its rate against itself is 1.
   if (category === UnitCategory.CRYPTO && !rates['USD']) {
    rates['USD'] = 1; // USD is the base for crypto rates in this mock
  }
  return rates;
};


// Mock exchange rates (base USD for currency, USD for crypto values)
const MOCK_CURRENCY_RATES: ConversionRates = {
  'USD': 1, 'EUR': 0.92, 'JPY': 157.0, 'GBP': 0.79, 'AUD': 1.50,
  'CAD': 1.37, 'CHF': 0.90, 'CNY': 7.25, 'HKD': 7.82, 'NZD': 1.63,
  'SEK': 10.45, 'KRW': 1370.0, 'SGD': 1.35, 'NOK': 10.50, 'MXN': 16.70,
  'INR': 83.50, 'RUB': 90.0, 'ZAR': 18.50, 'BRL': 5.10, 'TRY': 32.20,
};

// Mock crypto rates (in USD)
const MOCK_CRYPTO_RATES: ConversionRates = {
  'BTC': 68000, 'ETH': 3800, 'USDT': 1, 'BNB': 600, 'SOL': 170,
  'XRP': 0.52, 'ADA': 0.45, 'DOGE': 0.16, 'SHIB': 0.000025,
  'AVAX': 35.0, 'DOT': 7.50, 'LTC': 85.0, 'LINK': 17.0,
  // USD is explicitly included in CRYPTO_UNITS in constants.tsx and its rate here is essential
  // if you are converting crypto *to* USD or another crypto *from* USD.
  // The rate of USD against itself (as the common denominator for crypto values) is 1.
  'USD': 1, 
};

export const fetchMockRates = async (category: UnitCategory): Promise<ConversionRates> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (category === UnitCategory.CURRENCY) {
        resolve(MOCK_CURRENCY_RATES);
      } else if (category === UnitCategory.CRYPTO) {
        // Note: MOCK_CRYPTO_RATES implicitly uses USD as the base for comparison.
        // The 'USD' key with value 1 in MOCK_CRYPTO_RATES signifies that 1 unit of "USD token" (if it were a crypto) is 1 USD,
        // or more practically, it's the reference point.
        resolve(MOCK_CRYPTO_RATES);
      } else {
        // For non-rate-based categories, this function shouldn't ideally be called,
        // but return empty rates if it is.
        resolve({});
      }
    }, MOCK_API_DELAY);
  });
};

export const convertWithRates = (
  value: number,
  fromUnitId: string,
  toUnitId: string,
  rates: ConversionRates,
  category: UnitCategory // Keep category for context, though logic might primarily depend on rates structure
): number => {
  if (isNaN(value) || !rates[fromUnitId] || !rates[toUnitId]) {
    console.error("Missing rate for conversion:", { fromUnitId, toUnitId, rates });
    return NaN;
  }

  let valueInBase: number; 

  // For both CURRENCY and CRYPTO, our mock rates are structured such that:
  // MOCK_CURRENCY_RATES: rates[X] = how many of currency X is 1 USD (e.g., EUR: 0.92 means 0.92 EUR = 1 USD)
  // So, to convert Qty_X of currency X to USD: Qty_X / rates[X]
  // To convert Qty_USD to currency Y: Qty_USD * rates[Y]
  // Therefore, Qty_X to Qty_Y: (Qty_X / rates[X]) * rates[Y]

  // MOCK_CRYPTO_RATES: rates[C] = how many USD is 1 unit of crypto C (e.g., BTC: 68000 means 1 BTC = 68000 USD)
  // So, to convert Qty_C of crypto C to USD: Qty_C * rates[C]
  // To convert Qty_USD to crypto D: Qty_USD / rates[D]
  // Therefore, Qty_C to Qty_D: (Qty_C * rates[C]) / rates[D]
  // If target is USD (e.g. BTC to USD), then rates[toUnitId] (which is rates['USD']) would be 1.
  // (Qty_C * rates[C]) / 1
  // If source is USD (e.g. USD to BTC), then rates[fromUnitId] (rates['USD']) would be 1.
  // (Qty_USD * 1) / rates[D]

  if (category === UnitCategory.CURRENCY) {
    // Convert fromUnit amount to base currency (USD in this mock)
    valueInBase = value / rates[fromUnitId]; 
    // Convert base currency amount to toUnit amount
    return valueInBase * rates[toUnitId];     
  } else if (category === UnitCategory.CRYPTO) {
    // Convert fromUnit crypto amount to base value (USD in this mock)
    valueInBase = value * rates[fromUnitId];
    // Convert base value (USD) to toUnit crypto amount (or to USD if toUnit is 'USD')
    return valueInBase / rates[toUnitId]; 
  }
  
  console.warn("Rate conversion called for unhandled category:", category);
  return NaN;
};
