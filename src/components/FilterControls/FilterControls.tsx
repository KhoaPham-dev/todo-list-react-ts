import React from 'react';
import { FilterType } from '@/types';
import styles from './FilterControls.module.css';

interface FilterControlsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className={styles.filterControls}>
      {filters.map((filter) => (
        <button
          key={filter}
          className={`${styles.filterButton} ${activeFilter === filter ? styles.active : ''}`}
          onClick={() => onFilterChange(filter)}
          aria-pressed={activeFilter === filter}
          aria-label={`Show ${filter} todos`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterControls;
