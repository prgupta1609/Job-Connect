import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExperienceTab = ({ data, onChange, onSave, isLoading }) => {
  const [experienceEntries, setExperienceEntries] = useState(data?.experience || []);

  const jobTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'volunteer', label: 'Volunteer' }
  ];

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'media', label: 'Media & Entertainment' },
    { value: 'nonprofit', label: 'Non-profit' },
    { value: 'government', label: 'Government' },
    { value: 'startup', label: 'Startup' },
    { value: 'other', label: 'Other' }
  ];

  const addExperienceEntry = () => {
    const newEntry = {
      id: Date.now(),
      company: '',
      position: '',
      jobType: '',
      industry: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: '',
      isCurrentPosition: false
    };
    const updatedEntries = [...experienceEntries, newEntry];
    setExperienceEntries(updatedEntries);
    onChange('experience', updatedEntries);
  };

  const removeExperienceEntry = (id) => {
    const updatedEntries = experienceEntries?.filter(entry => entry?.id !== id);
    setExperienceEntries(updatedEntries);
    onChange('experience', updatedEntries);
  };

  const updateExperienceEntry = (id, field, value) => {
    const updatedEntries = experienceEntries?.map(entry =>
      entry?.id === id ? { ...entry, [field]: value } : entry
    );
    setExperienceEntries(updatedEntries);
    onChange('experience', updatedEntries);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Work Experience</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Add your work experience, internships, and relevant projects
          </p>
        </div>
        <Button
          onClick={addExperienceEntry}
          variant="outline"
          iconName="Plus"
          iconPosition="left"
        >
          Add Experience
        </Button>
      </div>
      {experienceEntries?.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <Icon name="Briefcase" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Experience Added</h4>
          <p className="text-muted-foreground mb-4">
            Add your work experience, internships, or relevant projects to showcase your background
          </p>
          <Button
            onClick={addExperienceEntry}
            iconName="Plus"
            iconPosition="left"
          >
            Add Your First Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {experienceEntries?.map((entry, index) => (
            <div key={entry?.id} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-foreground">
                  Experience #{index + 1}
                </h4>
                <Button
                  onClick={() => removeExperienceEntry(entry?.id)}
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  className="text-error hover:text-error hover:bg-error/10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  type="text"
                  placeholder="e.g., Google Inc."
                  value={entry?.company}
                  onChange={(e) => updateExperienceEntry(entry?.id, 'company', e?.target?.value)}
                  required
                />

                <Input
                  label="Position/Role"
                  type="text"
                  placeholder="e.g., Software Engineer Intern"
                  value={entry?.position}
                  onChange={(e) => updateExperienceEntry(entry?.id, 'position', e?.target?.value)}
                  required
                />

                <Select
                  label="Job Type"
                  options={jobTypeOptions}
                  value={entry?.jobType}
                  onChange={(value) => updateExperienceEntry(entry?.id, 'jobType', value)}
                  placeholder="Select job type"
                  required
                />

                <Select
                  label="Industry"
                  options={industryOptions}
                  value={entry?.industry}
                  onChange={(value) => updateExperienceEntry(entry?.id, 'industry', value)}
                  placeholder="Select industry"
                  searchable
                />

                <Input
                  label="Location"
                  type="text"
                  placeholder="e.g., San Francisco, CA or Remote"
                  value={entry?.location}
                  onChange={(e) => updateExperienceEntry(entry?.id, 'location', e?.target?.value)}
                />

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`current-position-${entry?.id}`}
                    checked={entry?.isCurrentPosition}
                    onChange={(e) => {
                      updateExperienceEntry(entry?.id, 'isCurrentPosition', e?.target?.checked);
                      if (e?.target?.checked) {
                        updateExperienceEntry(entry?.id, 'endDate', '');
                      }
                    }}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-ring focus:ring-2"
                  />
                  <label
                    htmlFor={`current-position-${entry?.id}`}
                    className="text-sm font-medium text-foreground"
                  >
                    Currently working here
                  </label>
                </div>

                <Input
                  label="Start Date"
                  type="date"
                  value={entry?.startDate}
                  onChange={(e) => updateExperienceEntry(entry?.id, 'startDate', e?.target?.value)}
                  required
                />

                <Input
                  label="End Date"
                  type="date"
                  value={entry?.endDate}
                  onChange={(e) => updateExperienceEntry(entry?.id, 'endDate', e?.target?.value)}
                  disabled={entry?.isCurrentPosition}
                  required={!entry?.isCurrentPosition}
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Job Description
                  </label>
                  <textarea
                    className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                    placeholder="Describe your role, responsibilities, and daily tasks..."
                    value={entry?.description}
                    onChange={(e) => updateExperienceEntry(entry?.id, 'description', e?.target?.value)}
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {(entry?.description || '')?.length}/500 characters
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Key Achievements (Optional)
                  </label>
                  <textarea
                    className="w-full min-h-[100px] px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                    placeholder="List your key achievements, projects completed, or impact made..."
                    value={entry?.achievements}
                    onChange={(e) => updateExperienceEntry(entry?.id, 'achievements', e?.target?.value)}
                    maxLength={400}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {(entry?.achievements || '')?.length}/400 characters
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Projects Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Personal Projects</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notable Projects
            </label>
            <textarea
              className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              placeholder="Describe your personal projects, hackathon participation, or side projects that demonstrate your skills..."
              value={data?.projects || ''}
              onChange={(e) => onChange('projects', e?.target?.value)}
              maxLength={600}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {(data?.projects || '')?.length}/600 characters
            </p>
          </div>
        </div>
      </div>
      {/* Volunteer Experience */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Volunteer Experience</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Volunteer Work
            </label>
            <textarea
              className="w-full min-h-[100px] px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              placeholder="Describe any volunteer work, community service, or extracurricular activities..."
              value={data?.volunteerWork || ''}
              onChange={(e) => onChange('volunteerWork', e?.target?.value)}
              maxLength={400}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {(data?.volunteerWork || '')?.length}/400 characters
            </p>
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={onSave}
          loading={isLoading}
          iconName="Save"
          iconPosition="left"
        >
          Save Experience Information
        </Button>
      </div>
    </div>
  );
};

export default ExperienceTab;