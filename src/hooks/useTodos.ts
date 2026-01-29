import { useState, useEffect } from 'react';
import { Todo, FilterType } from '@/types';
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/localStorage';
import { generateId } from '@/utils/uuid';

const LOCAL_STORAGE_KEY = 'todos';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() =>
    loadFromLocalStorage(LOCAL_STORAGE_KEY, [])
  );
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    saveToLocalStorage(LOCAL_STORAGE_KEY, todos);
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    const newTodo: Todo = {
      id: generateId(),
      text,
      completed: false,
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]); // Add to top
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: string, newText: string) => {
    if (newText.trim() === '') return;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return {
    todos: filteredTodos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
    filter,
    setFilter,
  };
};
