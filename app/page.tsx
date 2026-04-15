'use client';

import { useState } from 'react';
import TodoList from '@/components/TodoList';
import AddTodo from '@/components/AddTodo';
import FilterBar from '@/components/FilterBar';
import { Todo, FilterType } from '@/types/todo';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

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

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-indigo-600 tracking-tight mb-2">
            My Todos
          </h1>
          <p className="text-gray-500 text-sm">
            {activeCount} task{activeCount !== 1 ? 's' : ''} remaining
          </p>
        </div>

        {/* Add Todo */}
        <AddTodo onAdd={addTodo} />

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

        {/* Footer */}
        {todos.length === 0 && (
          <div className="text-center mt-12">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-gray-400 text-lg font-medium">All done! Add a new task above.</p>
          </div>
        )}
      </div>
    </main>
  );
}
