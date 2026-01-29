import React from 'react';
import { useTodos } from './hooks/useTodos';
import TodoInput from './components/TodoInput/TodoInput';
import TodoList from './components/TodoList/TodoList';
import FilterControls from './components/FilterControls/FilterControls';
import ClearCompleted from './components/ClearCompleted/ClearCompleted';
import './App.css'; // Assuming App.css for general app styling

function App() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo, clearCompleted, filter, setFilter } = useTodos();

  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoInput onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onToggleComplete={toggleTodo}
        onEditTodo={editTodo}
        onDeleteTodo={deleteTodo}
      />
      <FilterControls activeFilter={filter} onFilterChange={setFilter} />
      <ClearCompleted onClearCompleted={clearCompleted} hasCompletedTodos={hasCompletedTodos} />
    </div>
  );
}

export default App;
