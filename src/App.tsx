import React, { useState, useEffect } from 'react';
import { StockList } from './components/StockList';
import { AddStockForm } from './components/AddStockForm';
import { Stock, StockFormData } from './types/stock';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateMockStockData, sampleStocks } from './utils/mockData';
import { TrendingUp, BarChart3 } from 'lucide-react';

function App() {
  const [stocks, setStocks] = useLocalStorage<Stock[]>('stock-watchlist', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFirstTime, setIsFirstTime] = useLocalStorage('first-time-user', true);

  // Initialize with sample data for first-time users
  useEffect(() => {
    if (isFirstTime && stocks.length === 0) {
      setStocks(sampleStocks);
      setIsFirstTime(false);
    }
  }, [isFirstTime, stocks.length, setStocks, setIsFirstTime]);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(currentStocks => 
        currentStocks.map(stock => {
          // Small random price movement (-1% to +1%)
          const changePercent = (Math.random() - 0.5) * 2;
          const priceChange = (stock.price * changePercent) / 100;
          const newPrice = Math.max(0.01, stock.price + priceChange);
          const newChange = stock.change + priceChange;
          const newChangePercent = ((newPrice - (stock.price - stock.change)) / (stock.price - stock.change)) * 100;

          return {
            ...stock,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent
          };
        })
      );
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [setStocks]);

  const handleAddStock = (stockData: StockFormData) => {
    const mockData = generateMockStockData(stockData.symbol, stockData.company);
    const newStock: Stock = {
      ...mockData,
      notes: '',
      addedAt: new Date()
    };
    setStocks([...stocks, newStock]);
  };

  const handleDeleteStock = (id: string) => {
    setStocks(stocks.filter(stock => stock.id !== id));
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    setStocks(stocks.map(stock => 
      stock.id === id ? { ...stock, notes } : stock
    ));
  };

  const existingSymbols = stocks.map(stock => stock.symbol);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">StockWatch</h1>
                <p className="text-sm text-gray-600">Personal Stock Watchlist</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <TrendingUp size={16} />
                <span>{stocks.length} stocks tracked</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Add Stock Form */}
          <AddStockForm onAddStock={handleAddStock} existingSymbols={existingSymbols} />
          
          {/* Stock List */}
          <StockList
            stocks={stocks}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onDeleteStock={handleDeleteStock}
            onUpdateNotes={handleUpdateNotes}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Stock prices are simulated for demonstration purposes. Not for actual trading decisions.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;