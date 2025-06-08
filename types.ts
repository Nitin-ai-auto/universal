export enum UnitCategory {
  LENGTH = 'Length',
  WEIGHT = 'Weight',
  VOLUME = 'Volume',
  TEMPERATURE = 'Temperature',
  SPEED = 'Speed',
  AREA = 'Area',
  DATA_STORAGE = 'Data Storage',
  CURRENCY = 'Currency',
  CRYPTO = 'Cryptocurrency',
  DOCUMENT = 'Document Processing', // Changed category name
}

export enum DocumentActionType {
  TO_MARKDOWN = 'to-markdown',
  SUMMARIZE = 'summarize',
}

export interface Unit {
  id: string; // e.g., 'meter', 'celsius', 'USD', 'to-markdown'
  name: string; // e.g., 'Meter', 'Celsius', 'US Dollar', 'Convert to Markdown'
  symbol: string; // e.g., 'm', '°C', '$', 'MD'
  category: UnitCategory;
  // Factor to convert this unit TO the base unit of its category.
  factor?: number;
  // For file types, like documents (original usage)
  mimeType?: string;
  extension?: string;
  // For document actions
  actionType?: DocumentActionType;
}

export interface ConverterDefinition {
  id: string; // Unique key for React list
  title: string;
  category: UnitCategory;
  units: Unit[]; // These will be actions for Document Processing
  defaultFromUnitId: string; // For documents, this might represent the input type like 'txt'
  defaultToUnitId: string; // For documents, this will be a DocumentActionType id
  logo?: React.ReactNode;
  isRateBased?: boolean;
  isFileBased?: boolean; // True for file processors
  acceptFileTypes?: string; // e.g., '.txt,.md'
}

export type ConversionRates = Record<string, number>;