
import React, { useState, useMemo } from 'react';
import { ConverterCard } from './components/ConverterCard';
import { CONVERTER_DEFINITIONS } from './constants';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredConverters = useMemo(() => {
    if (!searchTerm.trim()) {
      return CONVERTER_DEFINITIONS;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return CONVERTER_DEFINITIONS.filter(def => {
      const titleMatch = def.title.toLowerCase().includes(lowerSearchTerm);
      const categoryMatch = def.category.toLowerCase().includes(lowerSearchTerm);
      const unitMatch = def.units.some(unit => 
        unit.name.toLowerCase().includes(lowerSearchTerm) || 
        unit.symbol.toLowerCase().includes(lowerSearchTerm)
      );
      return titleMatch || categoryMatch || unitMatch;
    });
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 sm:text-6xl">
          Universal Converter
        </h1>
        <p className="mt-4 text-xl text-slate-300">
          Your one-stop solution for (almost) all conversion needs.
        </p>
      </header>

      <div className="mb-10 max-w-2xl mx-auto px-4">
        <input
          type="search"
          placeholder="Search converters (e.g., Length, USD, Document)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-3.5 rounded-lg shadow-xl bg-slate-700/70 text-slate-100 border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out text-lg placeholder-slate-400 backdrop-blur-sm"
          aria-label="Search converters"
          id="converterSearch"
        />
      </div>

      <main className="max-w-7xl mx-auto">
        {filteredConverters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredConverters.map((def) => (
              <ConverterCard
                key={def.id}
                cardId={def.id} 
                title={def.title}
                category={def.category}
                units={def.units} // For Document, these are actions for 'To Unit'
                defaultFromUnitId={def.defaultFromUnitId}
                defaultToUnitId={def.defaultToUnitId}
                logo={def.logo}
                isRateBased={def.isRateBased}
                isFileBased={def.isFileBased}
                acceptFileTypes={def.acceptFileTypes} // Pass new prop
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-2xl text-slate-400 font-semibold">No converters found for "{searchTerm}".</p>
            <p className="text-slate-500 mt-2">Try a different search term or clear the search.</p>
          </div>
        )}
      </main>

      <footer className="mt-16 pt-8 border-t border-slate-700 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Universal Converter. All rights reserved.</p>
        <p className="mt-1">Powered by React, Tailwind CSS & Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;