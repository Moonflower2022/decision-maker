'use client';

import { useState, useEffect } from 'react';
import InputForm from '@/components/InputForm';
import ComparisonTable from '@/components/ComparisonTable';
import PriorityPanel from '@/components/customization/PriorityPanel';
import RefinementPanel from '@/components/RefinementPanel';
import UndoRedoButtons from '@/components/UndoRedoButtons';
import { useComparisonStore } from '@/lib/store';

export default function Home() {
  const { comparison, undo, redo } = useComparisonStore();
  const [showPriorityPanel, setShowPriorityPanel] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (modifier && (e.key === 'Z' || (e.shiftKey && e.key === 'z'))) {
        e.preventDefault();
        redo();
      } else if (modifier && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Decision Maker</h1>
              <p className="text-sm text-gray-600 mt-1">Compare options with personalized priorities</p>
            </div>
            <div className="flex items-center gap-4">
              {comparison && <UndoRedoButtons />}
              {comparison && (
                <button
                  onClick={() => setShowPriorityPanel(!showPriorityPanel)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {showPriorityPanel ? 'Hide' : 'Show'} Priorities
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {!comparison ? (
          <InputForm />
        ) : (
          <div className="flex gap-6 h-[calc(100vh-180px)]">
            {showPriorityPanel && (
              <div className="w-80 flex-shrink-0 overflow-y-auto">
                <PriorityPanel />
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-6 overflow-y-auto">
              <ComparisonTable />
              <RefinementPanel />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
