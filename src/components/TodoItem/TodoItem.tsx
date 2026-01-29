import React, { useState } from 'react';
import { Todo } from '@/types';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onEditTodo: (id: string, newText: string) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onEditTodo,
  onDeleteTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleSaveEdit = () => {
    if (editText.trim() !== '') {
      onEditTodo(todo.id, editText.trim());
      setIsEditing(false);
    } else {
      // If edited text is empty, revert to original or delete? Requirements say prevent saving empty.
      // For now, we will just exit editing mode and keep the original text.
      setEditText(todo.text); 
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <li className={styles.todoItem}>
      {isEditing ? (
        <input
          type="text"
          className={styles.editInput}
          value={editText}
          onChange={handleEditChange}
          onBlur={handleSaveEdit}
          onKeyDown={handleKeyPress}
          autoFocus
          aria-label="Edit todo item"
        />
      ) : (
        <>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
            aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
          />
          <span
            className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}
            onDoubleClick={handleDoubleClick}
            aria-label={`Todo item: ${todo.text}`}
          >
            {todo.text}
          </span>
          <button
            className={styles.deleteButton}
            onClick={() => onDeleteTodo(todo.id)}
            aria-label={`Delete ${todo.text}`}
          >
            X
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
