import React, { useState } from 'react';
import { Trash2, Edit3, Save, X, TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '../types/stock';

interface StockCardProps {
  stock: Stock;
  onDelete: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export const StockCard: React.FC<StockCardProps> = ({ stock, onDelete, onUpdateNotes }) => {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState(stock.notes);

  const handleSaveNotes = () => {
    onUpdateNotes(stock.id, editedNotes);
    setIsEditingNotes(false);
  };

  const handleCancelEdit = () => {
    setEditedNotes(stock.notes);
    setIsEditingNotes(false);
  };

  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? 'text-emerald-600' : 'text-red-600';
  const changeIcon = isPositive ? TrendingUp : TrendingDown;
  const ChangeTrendIcon = changeIcon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 hover:border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{stock.symbol}</h3>
            <div className={`flex items-center gap-1 ${changeColor}`}>
              <ChangeTrendIcon size={16} />
              <span className="font-semibold">
                {isPositive ? '+' : ''}${stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">{stock.company}</p>
          <p className="text-2xl font-bold text-gray-900">${stock.price.toFixed(2)}</p>
        </div>
        <button
          onClick={() => onDelete(stock.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
          title="Remove from watchlist"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-gray-700">Personal Notes</h4>
          {!isEditingNotes && (
            <button
              onClick={() => setIsEditingNotes(true)}
              className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50"
              title="Edit notes"
            >
              <Edit3 size={14} />
            </button>
          )}
        </div>
        
        {isEditingNotes ? (
          <div className="space-y-3">
            <textarea
              value={editedNotes}
              onChange={(e) => setEditedNotes(e.target.value)}
              placeholder="Add your thoughts, analysis, or reminders about this stock..."
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveNotes}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={14} />
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X size={14} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600 leading-relaxed">
            {stock.notes || (
              <span className="italic text-gray-400">Click the edit icon to add notes about this stock...</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};