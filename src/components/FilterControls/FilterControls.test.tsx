import { render, screen, fireEvent } from '@testing-library/react';
import FilterControls from './FilterControls';
import '@testing-library/jest-dom';
import { FilterType } from '@/types';

describe('FilterControls', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  const filters: FilterType[] = ['all', 'active', 'completed'];

  test('renders all filter buttons', () => {
    render(<FilterControls activeFilter='all' onFilterChange={mockOnFilterChange} />);
    filters.forEach((filter) => {
      expect(screen.getByRole('button', { name: new RegExp(`Show ${filter} todos`, 'i') })).toBeInTheDocument();
    });
  });

  test('highlights the active filter button', () => {
    render(<FilterControls activeFilter='active' onFilterChange={mockOnFilterChange} />);

    const allButton = screen.getByRole('button', { name: /Show all todos/i });
    const activeButton = screen.getByRole('button', { name: /Show active todos/i });
    const completedButton = screen.getByRole('button', { name: /Show completed todos/i });

    expect(allButton).not.toHaveClass('active');
    expect(activeButton).toHaveClass('active');
    expect(completedButton).not.toHaveClass('active');
  });

  test('calls onFilterChange with correct filter when button is clicked', () => {
    render(<FilterControls activeFilter='all' onFilterChange={mockOnFilterChange} />);

    const activeButton = screen.getByRole('button', { name: /Show active todos/i });
    fireEvent.click(activeButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith('active');
  });

  test('aria-pressed attribute is correctly set', () => {
    render(<FilterControls activeFilter='completed' onFilterChange={mockOnFilterChange} />);

    const allButton = screen.getByRole('button', { name: /Show all todos/i });
    const activeButton = screen.getByRole('button', { name: /Show active todos/i });
    const completedButton = screen.getByRole('button', { name: /Show completed todos/i });

    expect(allButton).toHaveAttribute('aria-pressed', 'false');
    expect(activeButton).toHaveAttribute('aria-pressed', 'false');
    expect(completedButton).toHaveAttribute('aria-pressed', 'true');
  });
});
