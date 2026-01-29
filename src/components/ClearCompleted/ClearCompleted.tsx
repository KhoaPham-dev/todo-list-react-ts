import React from 'react';
import styles from './ClearCompleted.module.css';

interface ClearCompletedProps {
  onClearCompleted: () => void;
  hasCompletedTodos: boolean;
}

const ClearCompleted: React.FC<ClearCompletedProps> = ({
  onClearCompleted,
  hasCompletedTodos,
}) => {
  return (
    <div className={styles.clearCompletedContainer}>
      <button
        className={styles.clearButton}
        onClick={onClearCompleted}
        disabled={!hasCompletedTodos}
        aria-label="Clear all completed todo items"
      >
        Clear Completed
      </button>
    </div>
  );
};

export default ClearCompleted;
