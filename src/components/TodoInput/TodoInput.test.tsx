import { render, screen, fireEvent } from '@testing-library/react';
import TodoInput from './TodoInput';
import '@testing-library/jest-dom';

describe('TodoInput', () => {
  const mockOnAddTodo = jest.fn();

  beforeEach(() => {
    mockOnAddTodo.mockClear();
  });

  test('renders input field and add button', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add todo item/i })).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const inputElement = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    expect(inputElement.value).toBe('New Todo');
  });

  test('calls onAddTodo and clears input on button click with valid text', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const inputElement = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
    const addButton = screen.getByRole('button', { name: /Add todo item/i });

    fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
    expect(mockOnAddTodo).toHaveBeenCalledWith('Test Todo');
    expect(inputElement.value).toBe('');
  });

  test('calls onAddTodo and clears input on Enter key press with valid text', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const inputElement = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'Another Todo' } });
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 13, charCode: 13 });

    expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
    expect(mockOnAddTodo).toHaveBeenCalledWith('Another Todo');
    expect(inputElement.value).toBe('');
  });

  test('does not call onAddTodo with empty text on button click', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const addButton = screen.getByRole('button', { name: /Add todo item/i });

    fireEvent.click(addButton);

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test('does not call onAddTodo with whitespace only text on button click', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const inputElement = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
    const addButton = screen.getByRole('button', { name: /Add todo item/i });

    fireEvent.change(inputElement, { target: { value: '   ' } });
    fireEvent.click(addButton);

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test('does not call onAddTodo with empty text on Enter key press', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const inputElement = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;

    fireEvent.keyPress(inputElement, { key: 'Enter', code: 13, charCode: 13 });

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test('does not call onAddTodo with whitespace only text on Enter key press', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const inputElement = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: '   ' } });
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 13, charCode: 13 });

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });
});
