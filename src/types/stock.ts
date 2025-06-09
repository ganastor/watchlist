export interface Stock {
  id: string;
  symbol: string;
  company: string;
  price: number;
  change: number;
  changePercent: number;
  notes: string;
  addedAt: Date;
}

export interface StockFormData {
  symbol: string;
  company: string;
}