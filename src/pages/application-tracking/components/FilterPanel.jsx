import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';


const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  searchValue, 
  onSearchChange,
  isExpanded,
  onToggleExpanded 
}) => {
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'interview-scheduled', label: 'Interview Scheduled' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'offer-received', label: 'Offer Received' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' }
  ];

  const jobTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' }
  ];

  const quickFilters = [
    { key: 'active', label: 'Active Applications', icon: 'Activity' },
    { key: 'interview-pending', label: 'Interview Pending', icon: 'Calendar' },
    { key: 'recent', label: 'Recent Applications', icon: 'Clock' },
    { key: 'offers', label: 'Offers Received', icon: 'Award' }
  ];

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => 
      value !== '' && value !== null && value !== undefined
    )?.length;
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="p-4">
        {/* Search and Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search by company or position..."
              value={searchValue}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={onToggleExpanded}
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
            
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickFilters?.map((filter) => (
            <Button
              key={filter?.key}
              variant={filters?.quickFilter === filter?.key ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange('quickFilter', 
                filters?.quickFilter === filter?.key ? '' : filter?.key
              )}
              iconName={filter?.icon}
              iconPosition="left"
            >
              {filter?.label}
            </Button>
          ))}
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="pt-4 border-t border-border animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select
                label="Status"
                options={statusOptions}
                value={filters?.status || ''}
                onChange={(value) => onFilterChange('status', value)}
                placeholder="Select status"
              />

              <Select
                label="Date Range"
                options={dateRangeOptions}
                value={filters?.dateRange || ''}
                onChange={(value) => onFilterChange('dateRange', value)}
                placeholder="Select period"
              />

              <Select
                label="Job Type"
                options={jobTypeOptions}
                value={filters?.jobType || ''}
                onChange={(value) => onFilterChange('jobType', value)}
                placeholder="Select type"
              />

              <div className="flex items-end">
                <Button
                  variant="ghost"
                  onClick={onClearFilters}
                  iconName="X"
                  iconPosition="left"
                  fullWidth
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;