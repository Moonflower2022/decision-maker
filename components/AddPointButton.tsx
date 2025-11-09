'use client';

import { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';

interface AddPointButtonProps {
  itemId: string;
  category: string;
  onAdd: (itemId: string, category: string, text: string, weight: number, type: 'pro' | 'con' | 'neutral') => void;
}

export default function AddPointButton({ itemId, category, onAdd }: AddPointButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState('');
  const [weight, setWeight] = useState(5);
  const [type, setType] = useState<'pro' | 'con' | 'neutral'>('pro');

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(itemId, category, text.trim(), weight, type);
      setText('');
      setWeight(5);
      setType('pro');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setText('');
    setWeight(5);
    setType('pro');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm text-gray-600"
      >
        <Plus className="w-4 h-4" />
        Add Point
      </button>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter point text..."
        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={2}
        autoFocus
      />

      <div className="flex gap-2 items-center">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'pro' | 'con' | 'neutral')}
          className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pro">Pro</option>
          <option value="con">Con</option>
          <option value="neutral">Neutral</option>
        </select>

        <input
          type="range"
          min="1"
          max="10"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-xs text-gray-600 w-8">{weight}/10</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="flex-1 px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
        >
          <Check className="w-3 h-3" />
          Add
        </button>
        <button
          onClick={handleCancel}
          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-1"
        >
          <X className="w-3 h-3" />
          Cancel
        </button>
      </div>
    </div>
  );
}
