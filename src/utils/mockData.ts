import { Stock } from '../types/stock';

// Mock stock data generator
export const generateMockStockData = (symbol: string, company: string): Omit<Stock, 'notes' | 'addedAt'> => {
  // Base prices for common stocks (in real app, this would come from an API)
  const basePrices: Record<string, number> = {
    'AAPL': 185.50,
    'GOOGL': 138.25,
    'MSFT': 378.85,
    'AMZN': 145.30,
    'TSLA': 248.42,
    'NVDA': 475.30,
    'META': 325.80,
    'NFLX': 432.15
  };

  const basePrice = basePrices[symbol] || (Math.random() * 200 + 50);
  
  // Generate realistic daily change (-5% to +5%)
  const changePercent = (Math.random() - 0.5) * 10;
  const change = (basePrice * changePercent) / 100;
  const currentPrice = basePrice + change;

  return {
    id: `${symbol}-${Date.now()}`,
    symbol,
    company,
    price: currentPrice,
    change,
    changePercent
  };
};

// Sample stocks for demonstration
export const sampleStocks: Stock[] = [
  {
    ...generateMockStockData('AAPL', 'Apple Inc.'),
    notes: 'Strong fundamentals, waiting for next earnings report. Considering adding more shares if it dips below $180.',
    addedAt: new Date('2024-01-15')
  },
  {
    ...generateMockStockData('GOOGL', 'Alphabet Inc.'),
    notes: 'AI developments looking promising. Keep an eye on cloud revenue growth.',
    addedAt: new Date('2024-01-20')
  },
  {
    ...generateMockStockData('MSFT', 'Microsoft Corporation'),
    notes: 'Solid dividend stock. Azure growth continues to impress.',
    addedAt: new Date('2024-02-01')
  }
];