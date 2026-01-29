import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';
import '@testing-library/jest-dom';
import { Todo } from '@/types';

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    text: 'Learn React',
    completed: false,
  };

  const mockOnToggleComplete = jest.fn();
  const mockOnEditTodo = jest.fn();
  const mockOnDeleteTodo = jest.fn();

  beforeEach(() => {
    mockOnToggleComplete.mockClear();
    mockOnEditTodo.mockClear();
    mockOnDeleteTodo.mockClear();
  });

  test('renders todo item correctly when not editing', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onEditTodo={mockOnEditTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByRole('button', { name: /Delete Learn React/i })).toBeInTheDocument();
  });

  test('applies completed style when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(
      <TodoItem
        todo={completedTodo}
        onToggleComplete={mockOnToggleComplete}
        onEditTodo={mockOnEditTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    const todoText = screen.getByText('Learn React');
    expect(todoText).toHaveClass('completed');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('calls onToggleComplete when checkbox is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onEditTodo={mockOnEditTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockOnToggleComplete).toHaveBeenCalledTimes(1);
    expect(mockOnToggleComplete).toHaveBeenCalledWith(mockTodo.id);
  });

  test('calls onDeleteTodo when delete button is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onEditTodo={mockOnEditTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Delete Learn React/i }));
    expect(mockOnDeleteTodo).toHaveBeenCalledTimes(1);
    expect(mockOnDeleteTodo).toHaveBeenCalledWith(mockTodo.id);
  });

  test('enters editing mode on double click', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onEditTodo={mockOnEditTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    fireEvent.doubleClick(screen.getByText('Learn React'));
    const editInput = screen.getByDisplayValue('Learn React');
    expect(editInput).toBeInTheDocument();
    expect(editInput).toHaveFocus();
  });

  test('saves edit on blur with valid text', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onEditTodo={mockOnEditTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    fireEvent.doubleClick(screen.getByText('Learn React'));
    const editInput = screen.getByDisplayValue('Learn React');
    fireEvent.change(editInput, { target: { value: 'Learn Jest' } });
    fireEvent.blur(editInput);

    expect(mockOnEditTodo).toHaveBeenCalledTimes(1);
    expect(mockOnEditTodo).toHaveBeenCalledWith(mockTodo.id, 'Learn Jest');
    expect(screen.queryByDisplayValue('Learn Jest')).not.toBeInTheDocument(); // Exited editing mode
    expect(screen.getByText('Learn Jest')).toBeInTheDocument(); // Display updated text
  });

  test('saves edit on Enter key press with valid text', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onEditTodo={mockOnEditTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    fireEvent.doubleClick(screen.getByText('Learn React'));
    const editInput = screen.getByDisplayValue('Learn React');
    fireEvent.change(editInput, { target: { value: 'Learn TypeScript' } });
    fireEvent.keyDown(editInput, { key: 'Enter', code: 'Enter' });

    expect(mockOnEditTodo).toHaveBeenCalledTimes(1);
    expect(mockOnEditTodo).toHaveBeenCalledWith(mockTodo.id, 'Learn TypeScript');
    expect(screen.queryByDisplayValue('Learn TypeScript')).not.toBeInTheDocument();
    expect(screen.getByText('Learn TypeScript')).toBeInTheDocument();
  });

  test('cancels edit on Escape key press', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onEditTodo={mockOnEditTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    fireEvent.doubleClick(screen.getByText('Learn React'));
    const editInput = screen.getByDisplayValue('Learn React');
    fireEvent.change(editInput, { target: { value: 'Temporary change' } });
    fireEvent.keyDown(editInput, { key: 'Escape', code: 'Escape' });

    expect(mockOnEditTodo).not.toHaveBeenCalled();
    expect(screen.queryByDisplayValue('Temporary change')).not.toBeInTheDocument();
    expect(screen.getByText('Learn React')).toBeInTheDocument(); // Original text is preserved
  });

  test('does not save edit with empty text on blur and reverts', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onEditTodo={mockOnEditTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    fireEvent.doubleClick(screen.getByText('Learn React'));
    const editInput = screen.getByDisplayValue('Learn React');
    fireEvent.change(editInput, { target: { value: '' } });
    fireEvent.blur(editInput);

    expect(mockOnEditTodo).not.toHaveBeenCalled();
    expect(screen.queryByDisplayValue('')).not.toBeInTheDocument();
    expect(screen.getByText('Learn React')).toBeInTheDocument(); // Original text is preserved
  });

  test('does not save edit with whitespace only text on blur and reverts', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onEditTodo={mockOnEditTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    fireEvent.doubleClick(screen.getByText('Learn React'));
    const editInput = screen.getByDisplayValue('Learn React');
    fireEvent.change(editInput, { target: { value: '   ' } });
    fireEvent.blur(editInput);

    expect(mockOnEditTodo).not.toHaveBeenCalled();
    expect(screen.queryByDisplayValue('   ')).not.toBeInTheDocument();
    expect(screen.getByText('Learn React')).toBeInTheDocument(); // Original text is preserved
  });
});
