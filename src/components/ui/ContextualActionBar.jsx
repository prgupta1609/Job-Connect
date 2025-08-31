import React, { useState } from 'react';

import Button from './Button';
import Select from './Select';
import Input from './Input';

const ContextualActionBar = ({ 
  context = 'default',
  filters = {},
  onFilterChange = () => {},
  actions = [],
  searchValue = '',
  onSearchChange = () => {},
  sortOptions = [],
  sortValue = '',
  onSortChange = () => {},
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.filter(value => 
      value !== '' && value !== null && value !== undefined
    )?.length;
  };

  const renderJobSearchActions = () => (
    <>
      <div className="flex items-center space-x-3">
        <Input
          type="search"
          placeholder="Search jobs..."
          value={searchValue}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-64"
        />
        
        {sortOptions?.length > 0 && (
          <Select
            options={sortOptions}
            value={sortValue}
            onChange={onSortChange}
            placeholder="Sort by"
            className="w-40"
          />
        )}
        
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName="Filter"
          iconPosition="left"
        >
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
              {getActiveFilterCount()}
            </span>
          )}
        </Button>
      </div>

      {actions?.map((action, index) => (
        <Button
          key={index}
          variant={action?.variant || 'default'}
          onClick={action?.onClick}
          iconName={action?.icon}
          iconPosition="left"
          disabled={action?.disabled}
        >
          {action?.label}
        </Button>
      ))}
    </>
  );

  const renderApplicationTrackingActions = () => (
    <>
      <div className="flex items-center space-x-3">
        <Select
          options={[
            { value: '', label: 'All Applications' },
            { value: 'pending', label: 'Pending' },
            { value: 'reviewing', label: 'Under Review' },
            { value: 'interview', label: 'Interview Scheduled' },
            { value: 'accepted', label: 'Accepted' },
            { value: 'rejected', label: 'Rejected' }
          ]}
          value={activeFilters?.status || ''}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Filter by status"
          className="w-48"
        />

        <Select
          options={[
            { value: '', label: 'All Time' },
            { value: 'today', label: 'Today' },
            { value: 'week', label: 'This Week' },
            { value: 'month', label: 'This Month' }
          ]}
          value={activeFilters?.timeframe || ''}
          onChange={(value) => handleFilterChange('timeframe', value)}
          placeholder="Time period"
          className="w-40"
        />

        {getActiveFilterCount() > 0 && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear
          </Button>
        )}
      </div>

      {actions?.map((action, index) => (
        <Button
          key={index}
          variant={action?.variant || 'default'}
          onClick={action?.onClick}
          iconName={action?.icon}
          iconPosition="left"
          disabled={action?.disabled}
        >
          {action?.label}
        </Button>
      ))}
    </>
  );

  const renderProfileActions = () => (
    <>
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName="Eye"
          iconPosition="left"
        >
          Preview Profile
        </Button>
      </div>

      {actions?.map((action, index) => (
        <Button
          key={index}
          variant={action?.variant || 'default'}
          onClick={action?.onClick}
          iconName={action?.icon}
          iconPosition="left"
          disabled={action?.disabled}
        >
          {action?.label}
        </Button>
      ))}
    </>
  );

  const renderDefaultActions = () => (
    <>
      {actions?.map((action, index) => (
        <Button
          key={index}
          variant={action?.variant || 'default'}
          onClick={action?.onClick}
          iconName={action?.icon}
          iconPosition="left"
          disabled={action?.disabled}
        >
          {action?.label}
        </Button>
      ))}
    </>
  );

  const renderContextualActions = () => {
    switch (context) {
      case 'job-search':
        return renderJobSearchActions();
      case 'application-tracking':
        return renderApplicationTrackingActions();
      case 'profile-management':
        return renderProfileActions();
      default:
        return renderDefaultActions();
    }
  };

  const renderExpandedFilters = () => {
    if (!isExpanded || context !== 'job-search') return null;

    return (
      <div className="mt-4 p-4 bg-muted rounded-lg animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Select
            label="Location"
            options={[
              { value: '', label: 'Any Location' },
              { value: 'remote', label: 'Remote' },
              { value: 'onsite', label: 'On-site' },
              { value: 'hybrid', label: 'Hybrid' }
            ]}
            value={activeFilters?.location || ''}
            onChange={(value) => handleFilterChange('location', value)}
          />

          <Select
            label="Job Type"
            options={[
              { value: '', label: 'Any Type' },
              { value: 'full-time', label: 'Full-time' },
              { value: 'part-time', label: 'Part-time' },
              { value: 'internship', label: 'Internship' },
              { value: 'contract', label: 'Contract' }
            ]}
            value={activeFilters?.jobType || ''}
            onChange={(value) => handleFilterChange('jobType', value)}
          />

          <Select
            label="Experience Level"
            options={[
              { value: '', label: 'Any Level' },
              { value: 'entry', label: 'Entry Level' },
              { value: 'mid', label: 'Mid Level' },
              { value: 'senior', label: 'Senior Level' }
            ]}
            value={activeFilters?.experience || ''}
            onChange={(value) => handleFilterChange('experience', value)}
          />

          <Select
            label="Company Size"
            options={[
              { value: '', label: 'Any Size' },
              { value: 'startup', label: 'Startup (1-50)' },
              { value: 'medium', label: 'Medium (51-500)' },
              { value: 'large', label: 'Large (500+)' }
            ]}
            value={activeFilters?.companySize || ''}
            onChange={(value) => handleFilterChange('companySize', value)}
          />
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <Button
            variant="ghost"
            onClick={clearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsExpanded(false)}
          >
            Done
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-card border-b border-border ${className}`}>
      <div className="px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 overflow-x-auto">
            {renderContextualActions()}
          </div>
        </div>
        
        {renderExpandedFilters()}
      </div>
    </div>
  );
};

export default ContextualActionBar;