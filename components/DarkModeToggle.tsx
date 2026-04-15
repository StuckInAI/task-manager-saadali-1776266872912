'use client';

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function DarkModeToggle({ isDark, onToggle }: DarkModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      title="Toggle dark mode (D)"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative inline-flex items-center w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      style={{
        backgroundColor: isDark ? '#6366f1' : '#d1d5db',
      }}
    >
      {/* Sun icon */}
      <span
        className="absolute left-1.5 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: isDark ? 0 : 1 }}
      >
        <svg
          className="w-4 h-4 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zM12 18a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0l.7.7a1 1 0 11-1.42 1.42l-.7-.7a1 1 0 010-1.42zM17.66 17.66a1 1 0 011.42 0l.7.7a1 1 0 01-1.42 1.42l-.7-.7a1 1 0 010-1.42zM3 12a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zM18 12a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM4.92 17.66a1 1 0 010-1.42l.7-.7a1 1 0 111.42 1.42l-.7.7a1 1 0 01-1.42 0zM17.66 6.34a1 1 0 010-1.42l.7-.7a1 1 0 111.42 1.42l-.7.7a1 1 0 01-1.42 0zM12 7a5 5 0 100 10A5 5 0 0012 7z" />
        </svg>
      </span>

      {/* Moon icon */}
      <span
        className="absolute right-1.5 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: isDark ? 1 : 0 }}
      >
        <svg
          className="w-4 h-4 text-indigo-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
        </svg>
      </span>

      {/* Thumb */}
      <span
        className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300"
        style={{
          left: isDark ? 'calc(100% - 1.625rem)' : '0.125rem',
        }}
      />
    </button>
  );
}
