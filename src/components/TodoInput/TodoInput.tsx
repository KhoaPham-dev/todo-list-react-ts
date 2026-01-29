import React, { useState } from 'react';
import styles from './TodoInput.module.css';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      onAddTodo(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className={styles.todoInputContainer}>
      <input
        type="text"
        className={styles.todoInput}
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="What needs to be done?"
        aria-label="New todo item text"
      />
      <button className={styles.addButton} onClick={handleAddTodo} aria-label="Add todo item">
        Add
      </button>
    </div>
  );
};

export default TodoInput;
