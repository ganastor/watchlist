import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { StockFormData } from '../types/stock';

interface AddStockFormProps {
  onAddStock: (stockData: StockFormData) => void;
  existingSymbols: string[];
}

export const AddStockForm: React.FC<AddStockFormProps> = ({ onAddStock, existingSymbols }) => {
  const [formData, setFormData] = useState<StockFormData>({
    symbol: '',
    company: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.symbol.trim() || !formData.company.trim()) {
      return;
    }

    const symbolUpper = formData.symbol.trim().toUpperCase();
    
    if (existingSymbols.includes(symbolUpper)) {
      alert('This stock is already in your watchlist.');
      return;
    }

    onAddStock({
      symbol: symbolUpper,
      company: formData.company.trim()
    });

    setFormData({ symbol: '', company: '' });
    setIsExpanded(false);
  };

  const handleReset = () => {
    setFormData({ symbol: '', company: '' });
    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-6 flex items-center justify-center gap-3 text-blue-600 hover:bg-blue-50 transition-colors group"
        >
          <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
            <Plus size={20} />
          </div>
          <span className="font-semibold">Add Stock to Watchlist</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Search size={20} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Add New Stock</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-2">
                Stock Symbol
              </label>
              <input
                type="text"
                id="symbol"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                placeholder="e.g., AAPL, GOOGL, MSFT"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono uppercase"
                maxLength={10}
                required
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g., Apple Inc., Alphabet Inc."
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Stock
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};