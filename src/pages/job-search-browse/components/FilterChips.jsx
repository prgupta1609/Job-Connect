import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];

    // Location filter
    if (activeFilters?.location) {
      chips?.push({
        key: 'location',
        label: `Location: ${activeFilters?.location}`,
        value: activeFilters?.location
      });
    }

    // Job types filter
    if (activeFilters?.jobTypes && activeFilters?.jobTypes?.length > 0) {
      activeFilters?.jobTypes?.forEach(type => {
        chips?.push({
          key: 'jobTypes',
          label: `Type: ${type}`,
          value: type
        });
      });
    }

    // Salary range filter
    if (activeFilters?.salaryMin || activeFilters?.salaryMax) {
      const min = activeFilters?.salaryMin ? `$${parseInt(activeFilters?.salaryMin)?.toLocaleString()}` : '';
      const max = activeFilters?.salaryMax ? `$${parseInt(activeFilters?.salaryMax)?.toLocaleString()}` : '';
      let salaryLabel = 'Salary: ';
      
      if (min && max) {
        salaryLabel += `${min} - ${max}`;
      } else if (min) {
        salaryLabel += `${min}+`;
      } else if (max) {
        salaryLabel += `Up to ${max}`;
      }

      chips?.push({
        key: 'salary',
        label: salaryLabel,
        value: 'salary'
      });
    }

    // Experience filter
    if (activeFilters?.experience) {
      const experienceLabels = {
        'entry': 'Entry Level',
        'mid': 'Mid Level',
        'senior': 'Senior Level'
      };
      
      chips?.push({
        key: 'experience',
        label: `Experience: ${experienceLabels?.[activeFilters?.experience] || activeFilters?.experience}`,
        value: activeFilters?.experience
      });
    }

    // Company size filter
    if (activeFilters?.companySize) {
      const sizeLabels = {
        'startup': 'Startup',
        'medium': 'Medium',
        'large': 'Large'
      };
      
      chips?.push({
        key: 'companySize',
        label: `Company: ${sizeLabels?.[activeFilters?.companySize] || activeFilters?.companySize}`,
        value: activeFilters?.companySize
      });
    }

    // Industry filter
    if (activeFilters?.industry) {
      chips?.push({
        key: 'industry',
        label: `Industry: ${activeFilters?.industry}`,
        value: activeFilters?.industry
      });
    }

    // Remote work filter
    if (activeFilters?.remoteWork) {
      chips?.push({
        key: 'remoteWork',
        label: 'Remote Work',
        value: 'remoteWork'
      });
    }

    // Hybrid work filter
    if (activeFilters?.hybridWork) {
      chips?.push({
        key: 'hybridWork',
        label: 'Hybrid Work',
        value: 'hybridWork'
      });
    }

    // Posted date filter
    if (activeFilters?.postedDate && activeFilters?.postedDate !== 'any') {
      const dateLabels = {
        'today': 'Today',
        'week': 'Past Week',
        'month': 'Past Month'
      };
      
      chips?.push({
        key: 'postedDate',
        label: `Posted: ${dateLabels?.[activeFilters?.postedDate] || activeFilters?.postedDate}`,
        value: activeFilters?.postedDate
      });
    }

    return chips;
  };

  const handleRemoveFilter = (chip) => {
    if (chip?.key === 'salary') {
      onRemoveFilter('salaryMin', '');
      onRemoveFilter('salaryMax', '');
    } else if (chip?.key === 'jobTypes') {
      const currentTypes = activeFilters?.jobTypes || [];
      const newTypes = currentTypes?.filter(type => type !== chip?.value);
      onRemoveFilter('jobTypes', newTypes);
    } else {
      onRemoveFilter(chip?.key, chip?.key === 'remoteWork' || chip?.key === 'hybridWork' ? false : '');
    }
  };

  const chips = getFilterChips();

  if (chips?.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 py-3 overflow-x-auto">
      <div className="flex items-center space-x-2 min-w-0">
        {chips?.map((chip, index) => (
          <div
            key={`${chip?.key}-${chip?.value}-${index}`}
            className="flex items-center space-x-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm whitespace-nowrap"
          >
            <span>{chip?.label}</span>
            <button
              onClick={() => handleRemoveFilter(chip)}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        ))}
      </div>
      {chips?.length > 0 && (
        <button
          onClick={onClearAll}
          className="flex items-center space-x-1 text-muted-foreground hover:text-foreground text-sm whitespace-nowrap ml-4 px-2 py-1 hover:bg-muted rounded-md transition-colors duration-200"
        >
          <Icon name="X" size={14} />
          <span>Clear all</span>
        </button>
      )}
    </div>
  );
};

export default FilterChips;