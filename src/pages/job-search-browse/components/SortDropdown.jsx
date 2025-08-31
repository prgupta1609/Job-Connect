import React from 'react';
import Select from '../../../components/ui/Select';

const SortDropdown = ({ value, onChange, className = '' }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'salary-desc', label: 'Highest Salary' },
    { value: 'salary-asc', label: 'Lowest Salary' },
    { value: 'company-asc', label: 'Company A-Z' },
    { value: 'company-desc', label: 'Company Z-A' },
    { value: 'match-desc', label: 'Best Match' }
  ];

  return (
    <Select
      options={sortOptions}
      value={value}
      onChange={onChange}
      placeholder="Sort by"
      className={`w-40 ${className}`}
    />
  );
};

export default SortDropdown;