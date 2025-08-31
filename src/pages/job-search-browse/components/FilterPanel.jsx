import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onClearFilters,
  onApplyFilters 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const locationOptions = [
    { value: '', label: 'Any Location' },
    { value: 'remote', label: 'Remote' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'boston', label: 'Boston, MA' },
    { value: 'chicago', label: 'Chicago, IL' }
  ];

  const jobTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' }
  ];

  const experienceOptions = [
    { value: '', label: 'Any Experience' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6+ years)' }
  ];

  const companySizeOptions = [
    { value: '', label: 'Any Size' },
    { value: 'startup', label: 'Startup (1-50 employees)' },
    { value: 'medium', label: 'Medium (51-500 employees)' },
    { value: 'large', label: 'Large (500+ employees)' }
  ];

  const industryOptions = [
    { value: '', label: 'Any Industry' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'consulting', label: 'Consulting' }
  ];

  const handleLocalFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleJobTypeChange = (type, checked) => {
    const currentTypes = localFilters?.jobTypes || [];
    const newTypes = checked
      ? [...currentTypes, type]
      : currentTypes?.filter(t => t !== type);
    
    handleLocalFilterChange('jobTypes', newTypes);
  };

  const handleApply = () => {
    onFilterChange(localFilters);
    onApplyFilters();
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
        onClick={onClose}
      />
      {/* Filter Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-card border-l border-border lg:relative lg:inset-auto lg:w-80 lg:border lg:rounded-lg lg:shadow-lg animate-slide-up lg:animate-fade-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Location */}
            <div>
              <Select
                label="Location"
                options={locationOptions}
                value={localFilters?.location || ''}
                onChange={(value) => handleLocalFilterChange('location', value)}
                searchable
                clearable
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Job Type
              </label>
              <div className="space-y-2">
                {jobTypeOptions?.map((option) => (
                  <Checkbox
                    key={option?.value}
                    label={option?.label}
                    checked={(localFilters?.jobTypes || [])?.includes(option?.value)}
                    onChange={(e) => handleJobTypeChange(option?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Salary Range (USD)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Min"
                  value={localFilters?.salaryMin || ''}
                  onChange={(e) => handleLocalFilterChange('salaryMin', e?.target?.value)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={localFilters?.salaryMax || ''}
                  onChange={(e) => handleLocalFilterChange('salaryMax', e?.target?.value)}
                />
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <Select
                label="Experience Level"
                options={experienceOptions}
                value={localFilters?.experience || ''}
                onChange={(value) => handleLocalFilterChange('experience', value)}
              />
            </div>

            {/* Company Size */}
            <div>
              <Select
                label="Company Size"
                options={companySizeOptions}
                value={localFilters?.companySize || ''}
                onChange={(value) => handleLocalFilterChange('companySize', value)}
              />
            </div>

            {/* Industry */}
            <div>
              <Select
                label="Industry"
                options={industryOptions}
                value={localFilters?.industry || ''}
                onChange={(value) => handleLocalFilterChange('industry', value)}
                searchable
              />
            </div>

            {/* Work Arrangement */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Work Arrangement
              </label>
              <div className="space-y-2">
                <Checkbox
                  label="Remote Work Available"
                  checked={localFilters?.remoteWork || false}
                  onChange={(e) => handleLocalFilterChange('remoteWork', e?.target?.checked)}
                />
                <Checkbox
                  label="Hybrid Work Available"
                  checked={localFilters?.hybridWork || false}
                  onChange={(e) => handleLocalFilterChange('hybridWork', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Posted Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Posted Date
              </label>
              <div className="space-y-2">
                {[
                  { value: 'today', label: 'Today' },
                  { value: 'week', label: 'Past Week' },
                  { value: 'month', label: 'Past Month' },
                  { value: 'any', label: 'Any Time' }
                ]?.map((option) => (
                  <Checkbox
                    key={option?.value}
                    label={option?.label}
                    checked={localFilters?.postedDate === option?.value}
                    onChange={(e) => {
                      if (e?.target?.checked) {
                        handleLocalFilterChange('postedDate', option?.value);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleClear}
                className="flex-1"
                iconName="X"
                iconPosition="left"
              >
                Clear All
              </Button>
              <Button
                variant="default"
                onClick={handleApply}
                className="flex-1"
                iconName="Check"
                iconPosition="left"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;