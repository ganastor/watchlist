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
  const changeColor = isPositive ? 'text-[#00FF00]' : 'text-[#9933FF]';
  const changeIcon = isPositive ? TrendingUp : TrendingDown;
  const ChangeTrendIcon = changeIcon;

  return (
    <div className="bg-[#2C2C2C] rounded-xl shadow-lg border border-[#383838] p-6 hover:shadow-xl hover:border-[#4A4A4A] transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-[#F0F0F0]">{stock.symbol}</h3>
            <div className={`flex items-center gap-1 ${changeColor}`}>
              <ChangeTrendIcon size={16} />
              <span className="font-semibold">
                {isPositive ? '+' : ''}${stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          <p className="text-[#AAAAAA] text-sm mb-1">{stock.company}</p>
          <p className="text-2xl font-bold text-[#F0F0F0]">${stock.price.toFixed(2)}</p>
        </div>
        <button
          onClick={() => onDelete(stock.id)}
          className="text-[#AAAAAA] hover:text-[#9933FF] transition-colors p-2 rounded-lg hover:bg-[#383838]"
          title="Remove from watchlist"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="border-t border-[#383838] pt-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-[#F0F0F0]">Personal Notes</h4>
          {!isEditingNotes && (
            <button
              onClick={() => setIsEditingNotes(true)}
              className="text-[#AAAAAA] hover:text-[#00FF00] transition-colors p-1 rounded hover:bg-[#383838]"
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
              className="w-full p-3 bg-[#383838] border border-[#4A4A4A] rounded-lg resize-none focus:ring-2 focus:ring-[#00FF00] focus:border-[#00FF00] text-sm text-[#F0F0F0] placeholder-[#AAAAAA]"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveNotes}
                className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-[#00FF00] to-[#39FF14] text-[#1A1A1A] text-sm rounded-lg hover:from-[#39FF14] hover:to-[#00FF00] transition-all duration-200 font-semibold"
              >
                <Save size={14} />
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#383838] text-[#AAAAAA] text-sm rounded-lg hover:bg-[#4A4A4A] hover:text-[#F0F0F0] transition-colors"
              >
                <X size={14} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#AAAAAA] leading-relaxed">
            {stock.notes || (
              <span className="italic text-[#666666]">Click the edit icon to add notes about this stock...</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};