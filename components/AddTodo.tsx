'use client';

import { useState } from 'react';

export default function AddTodo({ onAdd }: { onAdd: (text: string) => void }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-5 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-2xl shadow-sm transition-all duration-200 active:scale-95 disabled:opacity-50"
        disabled={!inputValue.trim()}
      >
        Add
      </button>
    </form>
  );
}
