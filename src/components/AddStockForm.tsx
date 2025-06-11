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
    <div className="bg-[#2C2C2C] rounded-xl shadow-lg border border-[#383838] overflow-hidden">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-6 flex items-center justify-center gap-3 text-[#00FF00] hover:bg-[#383838] transition-colors group"
        >
          <div className="bg-[#00FF00]/20 p-2 rounded-lg group-hover:bg-[#00FF00]/30 transition-colors">
            <Plus size={20} className="text-[#00FF00]" />
          </div>
          <span className="font-semibold">Add Stock to Watchlist</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#00FF00]/20 p-2 rounded-lg">
              <Search size={20} className="text-[#00FF00]" />
            </div>
            <h3 className="text-lg font-semibold text-[#F0F0F0]">Add New Stock</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="symbol" className="block text-sm font-medium text-[#F0F0F0] mb-2">
                Stock Symbol
              </label>
              <input
                type="text"
                id="symbol"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                placeholder="e.g., AAPL, GOOGL, MSFT"
                className="w-full p-3 bg-[#383838] border border-[#4A4A4A] rounded-lg focus:ring-2 focus:ring-[#00FF00] focus:border-[#00FF00] text-sm font-mono uppercase text-[#F0F0F0] placeholder-[#AAAAAA]"
                maxLength={10}
                required
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-[#F0F0F0] mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g., Apple Inc., Alphabet Inc."
                className="w-full p-3 bg-[#383838] border border-[#4A4A4A] rounded-lg focus:ring-2 focus:ring-[#00FF00] focus:border-[#00FF00] text-sm text-[#F0F0F0] placeholder-[#AAAAAA]"
                required
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#00FF00] to-[#39FF14] text-[#1A1A1A] py-3 px-4 rounded-lg font-semibold hover:from-[#39FF14] hover:to-[#00FF00] transition-all duration-200 focus:ring-2 focus:ring-[#00FF00] focus:ring-offset-2 focus:ring-offset-[#2C2C2C]"
            >
              Add Stock
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-[#4A4A4A] text-[#AAAAAA] rounded-lg font-semibold hover:bg-[#383838] hover:text-[#F0F0F0] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};