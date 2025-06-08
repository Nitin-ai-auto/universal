
import React, { useState, useEffect, useCallback } from 'react';
import { UnitCategory, type Unit, type ConverterDefinition, type ConversionRates, DocumentActionType } from '../types';
import { NumberInput } from './NumberInput';
import { UnitSelector } from './UnitSelector';
import { IconButton } from './IconButton';
import { FileInput } from './FileInput';
import { performConversion } from '../services/measurementConversion';
import { fetchMockRates, convertWithRates } from '../services/currencyCryptoService';
import { processDocumentTextWithGemini } from '../services/geminiService'; // New service
import { SwapIcon, CopyIcon, ClearIcon, GeminiIcon, DOCUMENT_SOURCE_TYPES } from '../constants';

interface ConverterCardProps extends Omit<ConverterDefinition, 'id' | 'title'> {
  title: string;
  logo?: React.ReactNode;
  isRateBased?: boolean;
  isFileBased?: boolean;
  acceptFileTypes?: string;
  cardId: string; 
}

export const ConverterCard: React.FC<ConverterCardProps> = ({
  title,
  category,
  units, // For Document Processing, these are target actions
  defaultFromUnitId, // For Document Processing, this is conceptual (e.g., 'txt')
  defaultToUnitId,   // For Document Processing, this is a DocumentActionType
  logo,
  isRateBased = false,
  isFileBased = false,
  acceptFileTypes,
  cardId,
}) => {
  const [inputValue, setInputValue] = useState<string>(isFileBased ? '' : '1');
  const [outputValue, setOutputValue] = useState<string>('');
  // For Document Processing, fromUnit is conceptual (e.g. 'txt', 'md') or not directly user-selectable from a list.
  // It could be set based on detected file type.
  const [fromUnit, setFromUnit] = useState<string>(defaultFromUnitId);
  const [toUnit, setToUnit] = useState<string>(defaultToUnitId); // This will be a DocumentActionType for document processing
  
  const [rates, setRates] = useState<ConversionRates | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Generic loading state
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [previousInputValueOnFocus, setPreviousInputValueOnFocus] = useState<string | null>(null);

  // State for file-based processing
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentTextContent, setDocumentTextContent] = useState<string | null>(null);
  
  // For Document Processing, fromUnitDef might not be in `units` (which are actions)
  // It conceptually represents the input file type.
  const fromUnitDisplaySymbol = isFileBased ? selectedFile?.name.split('.').pop()?.toUpperCase() : units.find(u => u.id === fromUnit)?.symbol;
  const toUnitDef = units.find(u => u.id === toUnit);


  const calculateNumericOrRateConversion = useCallback(() => {
    if (isFileBased) return;

    const numericInput = parseFloat(inputValue);
    if (inputValue.trim() === '' || isNaN(numericInput)) {
      setOutputValue('');
      setError(null);
      return;
    }

    setError(null);
    let result: number | string | undefined;

    if (isRateBased) {
      if (rates) {
        result = convertWithRates(numericInput, fromUnit, toUnit, rates, category);
      } else {
        setError("Exchange rates not loaded.");
        return;
      }
    } else {
      result = performConversion(numericInput, fromUnit, toUnit, category, units);
    }
    
    if (typeof result === 'number' && !isNaN(result)) {
        // Formatting logic (same as before)
        if (Math.abs(result) < 0.00001 && result !== 0) {
             setOutputValue(result.toExponential(4));
        } else {
             const absResult = Math.abs(result);
             let decimalPlaces = 2;
             if (absResult > 0 && absResult < 1) decimalPlaces = 4;
             if (absResult > 0 && absResult < 0.01) decimalPlaces = 6;
             if (absResult > 1e12) {
                setOutputValue(result.toExponential(4));
             } else {
                setOutputValue(Number(result.toFixed(decimalPlaces)).toString());
             }
        }
    } else if (typeof result === 'string' && result !== '') {
        setOutputValue(result);
    } else {
        setOutputValue('');
        setError("Conversion failed or resulted in NaN.");
    }
  }, [inputValue, fromUnit, toUnit, category, units, isRateBased, rates, isFileBased]);

  useEffect(() => {
    if (isRateBased) {
      setIsLoading(true);
      setError(null); // Clear previous errors
      fetchMockRates(category)
        .then(setRates)
        .catch(() => setError("Failed to load exchange rates."))
        .finally(() => setIsLoading(false));
    }
  }, [isRateBased, category]);

  useEffect(() => {
    if (!isFileBased) {
      if (isRateBased && !rates && isLoading) { 
        // Defer calculation until rates are loaded
      } else {
        calculateNumericOrRateConversion();
      }
    }
  }, [inputValue, fromUnit, toUnit, rates, isFileBased, isRateBased, isLoading, calculateNumericOrRateConversion]);

  useEffect(() => {
    if (isFileBased) {
      setOutputValue(''); // Clear output when file or target action changes
      setError(null);
    }
  }, [isFileBased, selectedFile, toUnit]);


  const handleInputFocus = () => {
    if (isFileBased) return;
    if (inputValue.trim() !== '') {
      setPreviousInputValueOnFocus(inputValue);
    }
    setInputValue('');
  };

  const handleInputBlur = () => {
    if (isFileBased) return;
    if (inputValue.trim() === '' && previousInputValueOnFocus !== null) {
      setInputValue(previousInputValueOnFocus);
    }
    setPreviousInputValueOnFocus(null);
  };

  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file);
    setDocumentTextContent(null); // Clear previous text content
    setOutputValue(''); 
    setError(null);

    if (file) {
      if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          setDocumentTextContent(text);
        };
        reader.onerror = () => {
          setError("Error reading file content.");
          setDocumentTextContent(null);
        };
        reader.readAsText(file);
      } else {
        setError(`Unsupported file type: ${file.type || file.name.split('.').pop()}. Only .txt and .md are supported for processing.`);
        setSelectedFile(null); // Deselect unsupported file
      }
    }
  };
  
  const handleProcessDocument = async () => {
    if (!selectedFile || !documentTextContent || !toUnitDef?.actionType) {
      setError("Please select a .txt or .md file, ensure it has content, and choose a processing action.");
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setOutputValue('');

    try {
      const result = await processDocumentTextWithGemini(documentTextContent, toUnitDef.actionType);
      // Check if the result itself is an error message from the service (e.g., API key missing)
      if (result.toLowerCase().startsWith("error:")) {
        setError(result);
        setOutputValue('');
      } else {
        setOutputValue(result);
      }
    } catch (e: any) { // Catch unexpected errors from the promise itself
      setError(e.message || "An unexpected error occurred during processing.");
      setOutputValue('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    if (isFileBased) {
      // Swapping actions for document processing doesn't make much sense in current setup
      // as 'from' is a file and 'to' is an action.
      // We could potentially swap 'to' actions if there were multiple, but not 'from' and 'to'.
      setError("Swap is not applicable for document processing actions.");
      return;
    }
    // Numeric/Rate based swap
    const currentOutputVal = outputValue;
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setInputValue(currentOutputVal);
    setPreviousInputValueOnFocus(null);
  };

  const handleClear = () => {
    if (isFileBased) {
      setSelectedFile(null);
      setDocumentTextContent(null);
      const fileInputEl = document.getElementById(`${cardId}-file-input`) as HTMLInputElement;
      if (fileInputEl) fileInputEl.value = ""; 
    } else {
      setInputValue('');
      setPreviousInputValueOnFocus(null);
    }
    setOutputValue('');
    setError(null);
  };

  const handleCopyToClipboard = () => {
    if (outputValue) {
      navigator.clipboard.writeText(outputValue)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => console.error("Failed to copy: ", err));
    }
  };
  
  // For Document Processing, the "From Unit" selector is not used for selecting format,
  // as file type is determined by upload. We can hide it or show a static display.
  // For this iteration, we simplify by not having a "From Unit" selector for documents.
  // The `units` prop passed to UnitSelector for "To Unit" will be DOCUMENT_PROCESSING_ACTIONS.

  return (
    <div className="bg-slate-800 shadow-2xl rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 ease-out">
      <div className="flex items-center justify-center mb-6">
        {logo && <span className="mr-3">{logo}</span>}
        <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-red-400 text-center">
          {title}
        </h3>
      </div>
      
      {isLoading && <p className="text-center text-slate-400 mb-4">{isRateBased ? 'Loading rates...' : 'Processing...'}</p>}
      {error && <p className="text-center text-red-400 mb-4 p-2 bg-red-900/30 rounded-md whitespace-pre-wrap">{error}</p>}

      <div className="space-y-5">
        {/* From Section */}
        <div className={`flex flex-col ${isFileBased ? '' : 'sm:flex-row items-start sm:items-end'} space-y-3 sm:space-y-0 sm:space-x-3`}>
          {isFileBased ? (
            <FileInput
              id={`${cardId}-file-input`}
              label="Source File (.txt, .md)"
              onFileChange={handleFileSelected}
              acceptedFormats={acceptFileTypes}
              disabled={isLoading}
            />
          ) : (
            <NumberInput
              label="From"
              value={inputValue}
              onChange={setInputValue}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              unitSymbol={units.find(u => u.id === fromUnit)?.symbol}
            />
          )}
          {!isFileBased && (
            <UnitSelector
              label="From Unit"
              units={units}
              selectedUnit={fromUnit}
              onChange={setFromUnit}
              idSuffix={`${cardId}-from`}
              disabled={isLoading && isRateBased}
            />
          )}
        </div>

        {!isFileBased && (
            <div className="flex justify-center items-center my-1 sm:my-0">
                <IconButton 
                  onClick={handleSwap} 
                  icon={<SwapIcon />} 
                  label="Swap units and values" 
                  className="text-indigo-400 hover:text-indigo-300"
                  disabled={isLoading && isRateBased}
                />
            </div>
        )}

        {/* To Section */}
        <div className={`flex flex-col ${isFileBased ? '' : 'sm:flex-row items-start sm:items-end'} space-y-3 sm:space-y-0 sm:space-x-3`}>
          {isFileBased ? (
             <div className="w-full">
                <label className="block text-sm font-medium text-slate-300 mb-1">Output</label>
                <textarea
                    value={outputValue}
                    readOnly
                    disabled
                    placeholder="Processed text will appear here..."
                    className="w-full h-32 px-4 py-3 rounded-md shadow-sm bg-slate-700 text-slate-100 border border-slate-600 cursor-not-allowed text-sm"
                    aria-label="Processed document output"
                />
             </div>
          ) : (
            <NumberInput
              label="To"
              value={outputValue}
              onChange={() => {}} 
              disabled
              unitSymbol={toUnitDef?.symbol}
            />
          )}
          {/* For Document Processing, `units` passed here are the actions */}
          <UnitSelector
            label={isFileBased ? "Action" : "To Unit"}
            units={units} 
            selectedUnit={toUnit}
            onChange={setToUnit}
            idSuffix={`${cardId}-to`}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          {isFileBased && (
            <button
              type="button"
              onClick={handleProcessDocument}
              disabled={!selectedFile || !documentTextContent || isLoading || !toUnitDef?.actionType}
              className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out flex items-center"
            >
              <GeminiIcon className="w-4 h-4 mr-2" />
              {isLoading ? 'Processing...' : 'Process with Gemini'}
            </button>
          )}
        </div>
        <div className="flex space-x-3">
            <IconButton 
              onClick={handleClear} 
              icon={<ClearIcon />} 
              label="Clear input and output" 
              disabled={isLoading && (isFileBased || isRateBased)}
            />
            <button
                type="button"
                onClick={handleCopyToClipboard}
                disabled={!outputValue || (isLoading && (isFileBased || isRateBased))}
                className="px-4 py-2 text-sm font-medium rounded-md text-indigo-300 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out flex items-center"
            >
                <CopyIcon className="w-4 h-4 mr-2" />
                {copied ? 'Copied!' : 'Copy Result'}
            </button>
        </div>
      </div>
    </div>
  );
};