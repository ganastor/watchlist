import React from 'react';
import { StockCard } from './StockCard';
import { Stock } from '../types/stock';
import { TrendingUp, Search } from 'lucide-react';

interface StockListProps {
  stocks: Stock[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onDeleteStock: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export const StockList: React.FC<StockListProps> = ({
  stocks,
  searchTerm,
  onSearchChange,
  onDeleteStock,
  onUpdateNotes
}) => {
  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = stocks.reduce((sum, stock) => sum + stock.price, 0);
  const totalGainLoss = stocks.reduce((sum, stock) => sum + stock.change, 0);
  const avgChangePercent = stocks.length > 0 
    ? stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / stocks.length 
    : 0;

  if (stocks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-[#383838] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <TrendingUp size={32} className="text-[#AAAAAA]" />
        </div>
        <h3 className="text-lg font-semibold text-[#F0F0F0] mb-2">No Stocks in Watchlist</h3>
        <p className="text-[#AAAAAA]">Add your first stock to start building your personalized watchlist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="bg-gradient-to-r from-[#2C2C2C] to-[#383838] rounded-xl p-6 border border-[#4A4A4A]">
        <h3 className="text-lg font-semibold mb-4 text-[#F0F0F0]">Portfolio Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-[#AAAAAA] text-sm">Total Value</p>
            <p className="text-2xl font-bold text-[#F0F0F0]">${totalValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-[#AAAAAA] text-sm">Total Change</p>
            <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-[#00FF00]' : 'text-[#9933FF]'}`}>
              {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-[#AAAAAA] text-sm">Avg Change %</p>
            <p className={`text-2xl font-bold ${avgChangePercent >= 0 ? 'text-[#00FF00]' : 'text-[#9933FF]'}`}>
              {avgChangePercent >= 0 ? '+' : ''}{avgChangePercent.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AAAAAA]" />
        <input
          type="text"
          placeholder="Search stocks, companies, or notes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#2C2C2C] border border-[#383838] rounded-lg focus:ring-2 focus:ring-[#00FF00] focus:border-[#00FF00] text-sm text-[#F0F0F0] placeholder-[#AAAAAA]"
        />
      </div>

      {/* Results count */}
      {searchTerm && (
        <div className="text-sm text-[#AAAAAA]">
          {filteredStocks.length} of {stocks.length} stocks match your search
        </div>
      )}

      {/* Stock Cards */}
      <div className="grid gap-6">
        {filteredStocks.map((stock) => (
          <StockCard
            key={stock.id}
            stock={stock}
            onDelete={onDeleteStock}
            onUpdateNotes={onUpdateNotes}
          />
        ))}
      </div>

      {searchTerm && filteredStocks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[#AAAAAA]">No stocks match your search criteria.</p>
        </div>
      )}
    </div>
  );
};