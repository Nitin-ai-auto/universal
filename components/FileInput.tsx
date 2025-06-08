import React, { useRef, useState } from 'react';
import { UploadIcon } from '../constants';

interface FileInputProps {
  onFileChange: (file: File | null) => void;
  label?: string;
  acceptedFormats?: string; // e.g., ".pdf,.doc,.docx" or ".txt,.md"
  id: string;
  disabled?: boolean;
}

export const FileInput: React.FC<FileInputProps> = ({
  onFileChange,
  label = "Select File",
  acceptedFormats,
  id,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file && acceptedFormats) {
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      const allowedExtensions = acceptedFormats.split(',').map(ext => ext.trim().toLowerCase());
      if (!allowedExtensions.includes(fileExtension) && !allowedExtensions.includes(file.type)) {
         alert(`Invalid file type. Please upload one of the following: ${allowedExtensions.join(', ')}`);
         if (inputRef.current) inputRef.current.value = ''; // Clear the input
         onFileChange(null);
         setFileName(null);
         return;
      }
    }
    onFileChange(file);
    setFileName(file ? file.name : null);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (disabled) return;
    const file = event.dataTransfer.files?.[0] || null;
    
    if (file && acceptedFormats) {
        const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
        const allowedExtensions = acceptedFormats.split(',').map(ext => ext.trim().toLowerCase());
        if (!allowedExtensions.includes(fileExtension) && !allowedExtensions.includes(file.type)) {
           alert(`Invalid file type. Please upload one of the following: ${allowedExtensions.join(', ')}`);
           onFileChange(null);
           setFileName(null);
           return;
        }
      }
    onFileChange(file);
    setFileName(file ? file.name : null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const displayAcceptedFormats = acceptedFormats ? acceptedFormats.split(',').map(f => f.trim()).join(', ') : 'any file';

  return (
    <div className="w-full">
      {label && <label htmlFor={id + '-button'} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>}
      <input
        type="file"
        id={id}
        ref={inputRef}
        onChange={handleFileChange}
        accept={acceptedFormats}
        className="hidden"
        disabled={disabled}
      />
      <label
        htmlFor={id}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`w-full flex flex-col items-center justify-center px-4 py-3 rounded-md shadow-sm bg-slate-700 text-slate-100 border ${disabled ? 'border-slate-600 cursor-not-allowed opacity-60' : 'border-slate-500 hover:border-indigo-400 cursor-pointer focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500'} transition duration-150 ease-in-out text-base`}
      >
        <UploadIcon className="w-8 h-8 text-slate-400 mb-2" />
        <span className="text-sm text-slate-300 text-center">
          {fileName || (<span>Drag &amp; drop or <button type="button" id={id + '-button'} onClick={handleButtonClick} disabled={disabled} className="font-medium text-indigo-400 hover:text-indigo-300 focus:outline-none">click to browse</button></span>)}
        </span>
        {<span className="text-xs text-slate-500 mt-1 text-center">Supported: {displayAcceptedFormats}</span>}
      </label>
    </div>
  );
};