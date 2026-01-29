import React from 'react';
import { Todo } from '@/types';
import TodoItem from '@/components/TodoItem/TodoItem';
import styles from './TodoList.module.css';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onEditTodo: (id: string, newText: string) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onEditTodo,
  onDeleteTodo,
}) => {
  return (
    <ul className={styles.todoList}>
      {todos.length === 0 ? (
        <p className={styles.emptyListMessage}>No todos here yet!</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onEditTodo={onEditTodo}
            onDeleteTodo={onDeleteTodo}
          />
        ))
      )}
    </ul>
  );
};

export default TodoList;
