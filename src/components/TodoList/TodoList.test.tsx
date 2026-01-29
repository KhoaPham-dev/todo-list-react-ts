import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import '@testing-library/jest-dom';
import { Todo } from '@/types';

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    { id: '1', text: 'Buy groceries', completed: false },
    { id: '2', text: 'Walk the dog', completed: true },
  ];

  const mockOnToggleComplete = jest.fn();
  const mockOnEditTodo = jest.fn();
  const mockOnDeleteTodo = jest.fn();

  beforeEach(() => {
    mockOnToggleComplete.mockClear();
    mockOnEditTodo.mockClear();
    mockOnDeleteTodo.mockClear();
  });

  test('renders a list of todo items', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleComplete={mockOnToggleComplete}
        onEditTodo={mockOnEditTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Walk the dog')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  test('renders empty message when no todos are present', () => {
    render(
      <TodoList
        todos={[]}
        onToggleComplete={mockOnToggleComplete}
        onEditTodo={mockOnEditTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    expect(screen.getByText('No todos here yet!')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('passes correct props to TodoItem components', () => {
    const { getAllByRole } = render(
      <TodoList
        todos={mockTodos}
        onToggleComplete={mockOnToggleComplete}
        onEditTodo={mockOnEditTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );

    const todoItems = getAllByRole('listitem');
    // We can't directly check the props passed to TodoItem from here without mocking TodoItem itself.
    // However, we can assert that the TodoItem components are rendered with the correct text,
    // and trust the TodoItem's own tests to ensure it handles its props correctly.
    expect(todoItems[0]).toHaveTextContent('Buy groceries');
    expect(todoItems[1]).toHaveTextContent('Walk the dog');
  });
});
