'use client';

import { useEffect } from 'react';

interface ShortcutsModalProps {
  open: boolean;
  onClose: () => void;
}

const shortcuts: { keys: string[]; description: string }[] = [
  { keys: ['?'], description: 'Toggle this shortcuts window' },
  { keys: ['Esc'], description: 'Close this window' },
  { keys: ['N'], description: 'Focus the new task input' },
  { keys: ['Enter'], description: 'Submit the new task (when input is focused)' },
  { keys: ['1'], description: 'Show all tasks' },
  { keys: ['2'], description: 'Show active tasks' },
  { keys: ['3'], description: 'Show completed tasks' },
  { keys: ['X'], description: 'Clear all completed tasks' },
  { keys: ['D'], description: 'Toggle dark / light mode' },
  { keys: ['Enter'], description: 'Save task while editing' },
  { keys: ['Esc'], description: 'Cancel editing a task' },
];

export default function ShortcutsModal({ open, onClose }: ShortcutsModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close shortcuts window"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="px-6 py-4 space-y-2">
          {shortcuts.map((shortcut, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-700/60 last:border-0">
              <span className="text-sm text-gray-600 dark:text-gray-300">{shortcut.description}</span>
              <div className="flex gap-1 ml-4">
                {shortcut.keys.map((key) => (
                  <kbd
                    key={key}
                    className="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm min-w-[2rem]"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            Press{' '}
            <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm">?</kbd>
            {' '}anytime to open this window
          </p>
        </div>
      </div>
    </div>
  );
}
