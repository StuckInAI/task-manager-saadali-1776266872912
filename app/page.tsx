'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import TodoList from '@/components/TodoList';
import AddTodo from '@/components/AddTodo';
import FilterBar from '@/components/FilterBar';
import ShortcutsModal from '@/components/ShortcutsModal';
import ParticleBackground from '@/components/ParticleBackground';
import DarkModeToggle from '@/components/DarkModeToggle';
import { Todo, FilterType } from '@/types/todo';

function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  }, []);

  return { isDark, toggle };
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [showShortcuts, setShowShortcuts] = useState(false);
  const addInputRef = useRef<HTMLInputElement>(null);
  const { isDark, toggle: toggleDark } = useDarkMode();

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      const isTyping = tag === 'input' || tag === 'textarea';

      if (e.key === '?' && !isTyping) {
        e.preventDefault();
        setShowShortcuts((v) => !v);
        return;
      }

      if (e.key === 'Escape') {
        setShowShortcuts(false);
        return;
      }

      if (isTyping) return;

      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        addInputRef.current?.focus();
        return;
      }

      if (e.key === '1') {
        e.preventDefault();
        setFilter('all');
        return;
      }

      if (e.key === '2') {
        e.preventDefault();
        setFilter('active');
        return;
      }

      if (e.key === '3') {
        e.preventDefault();
        setFilter('completed');
        return;
      }

      if (e.key === 'x' || e.key === 'X') {
        e.preventDefault();
        clearCompleted();
        return;
      }

      if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        toggleDark();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearCompleted, toggleDark]);

  return (
    <>
      <ParticleBackground isDark={isDark} />
      <main className="relative min-h-screen py-12 px-4" style={{ zIndex: 1 }}>
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <h1 className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
                My Todos
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => setShowShortcuts(true)}
                  title="Keyboard shortcuts (?)"
                  className="text-xs font-semibold text-gray-400 dark:text-gray-500 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                >
                  shortcuts
                </button>
                <DarkModeToggle isDark={isDark} onToggle={toggleDark} />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {activeCount} task{activeCount !== 1 ? 's' : ''} remaining
            </p>
          </div>

          {/* Add Todo */}
          <AddTodo onAdd={addTodo} inputRef={addInputRef} />

          {/* Filter Bar */}
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />

          {/* Todo List */}
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />

          {/* Empty state */}
          {todos.length === 0 && (
            <div className="text-center mt-12">
              <p className="text-gray-400 dark:text-gray-500 text-lg font-medium">No tasks yet. Add one above.</p>
            </div>
          )}
        </div>

        {/* Shortcuts Modal */}
        <ShortcutsModal open={showShortcuts} onClose={() => setShowShortcuts(false)} />
      </main>
    </>
  );
}
