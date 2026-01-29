import { render, screen, fireEvent } from '@testing-library/react';
import ClearCompleted from './ClearCompleted';
import '@testing-library/jest-dom';

describe('ClearCompleted', () => {
  const mockOnClearCompleted = jest.fn();

  beforeEach(() => {
    mockOnClearCompleted.mockClear();
  });

  test('renders button correctly', () => {
    render(
      <ClearCompleted onClearCompleted={mockOnClearCompleted} hasCompletedTodos={false} />
    );
    expect(screen.getByRole('button', { name: /Clear all completed todo items/i })).toBeInTheDocument();
  });

  test('button is disabled when no completed todos', () => {
    render(
      <ClearCompleted onClearCompleted={mockOnClearCompleted} hasCompletedTodos={false} />
    );
    expect(screen.getByRole('button', { name: /Clear all completed todo items/i })).toBeDisabled();
  });

  test('button is enabled when there are completed todos', () => {
    render(
      <ClearCompleted onClearCompleted={mockOnClearCompleted} hasCompletedTodos={true} />
    );
    expect(screen.getByRole('button', { name: /Clear all completed todo items/i })).not.toBeDisabled();
  });

  test('calls onClearCompleted when button is clicked and enabled', () => {
    render(
      <ClearCompleted onClearCompleted={mockOnClearCompleted} hasCompletedTodos={true} />
    );
    fireEvent.click(screen.getByRole('button', { name: /Clear all completed todo items/i }));
    expect(mockOnClearCompleted).toHaveBeenCalledTimes(1);
  });

  test('does not call onClearCompleted when button is clicked and disabled', () => {
    render(
      <ClearCompleted onClearCompleted={mockOnClearCompleted} hasCompletedTodos={false} />
    );
    fireEvent.click(screen.getByRole('button', { name: /Clear all completed todo items/i }));
    expect(mockOnClearCompleted).not.toHaveBeenCalled();
  });
});
