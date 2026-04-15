'use client';

import { FilterType } from '@/types/todo';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export default function FilterBar({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="flex items-center justify-between mb-4 px-1">
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
              filter === f
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs text-gray-400 hover:text-red-400 transition-colors duration-200 font-medium"
        >
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
