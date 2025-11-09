'use client';

import { useComparisonStore } from '@/lib/store';

export default function UndoRedoButtons() {
  const { undo, redo, canUndo, canRedo } = useComparisonStore();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={undo}
        disabled={!canUndo()}
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Undo (Cmd+Z)"
      >
        ↶ Undo
      </button>
      <button
        onClick={redo}
        disabled={!canRedo()}
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Redo (Cmd+Shift+Z)"
      >
        ↷ Redo
      </button>
    </div>
  );
}
