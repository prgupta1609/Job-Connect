import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EducationTab = ({ data, onChange, onSave, isLoading }) => {
  const [educationEntries, setEducationEntries] = useState(data?.education || []);

  const degreeOptions = [
    { value: 'high-school', label: 'High School Diploma' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'PhD' },
    { value: 'certificate', label: 'Certificate' },
    { value: 'diploma', label: 'Diploma' }
  ];

  const fieldOfStudyOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'information-technology', label: 'Information Technology' },
    { value: 'software-engineering', label: 'Software Engineering' },
    { value: 'electrical-engineering', label: 'Electrical Engineering' },
    { value: 'mechanical-engineering', label: 'Mechanical Engineering' },
    { value: 'business-administration', label: 'Business Administration' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'accounting', label: 'Accounting' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'biology', label: 'Biology' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'physics', label: 'Physics' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'english', label: 'English Literature' },
    { value: 'communications', label: 'Communications' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'other', label: 'Other' }
  ];

  const addEducationEntry = () => {
    const newEntry = {
      id: Date.now(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
      isCurrentlyStudying: false
    };
    const updatedEntries = [...educationEntries, newEntry];
    setEducationEntries(updatedEntries);
    onChange('education', updatedEntries);
  };

  const removeEducationEntry = (id) => {
    const updatedEntries = educationEntries?.filter(entry => entry?.id !== id);
    setEducationEntries(updatedEntries);
    onChange('education', updatedEntries);
  };

  const updateEducationEntry = (id, field, value) => {
    const updatedEntries = educationEntries?.map(entry =>
      entry?.id === id ? { ...entry, [field]: value } : entry
    );
    setEducationEntries(updatedEntries);
    onChange('education', updatedEntries);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Education History</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Add your educational background to showcase your qualifications
          </p>
        </div>
        <Button
          onClick={addEducationEntry}
          variant="outline"
          iconName="Plus"
          iconPosition="left"
        >
          Add Education
        </Button>
      </div>
      {educationEntries?.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <Icon name="GraduationCap" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Education Added</h4>
          <p className="text-muted-foreground mb-4">
            Start by adding your most recent educational experience
          </p>
          <Button
            onClick={addEducationEntry}
            iconName="Plus"
            iconPosition="left"
          >
            Add Your First Education
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {educationEntries?.map((entry, index) => (
            <div key={entry?.id} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-foreground">
                  Education #{index + 1}
                </h4>
                <Button
                  onClick={() => removeEducationEntry(entry?.id)}
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  className="text-error hover:text-error hover:bg-error/10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Institution Name"
                    type="text"
                    placeholder="e.g., Stanford University"
                    value={entry?.institution}
                    onChange={(e) => updateEducationEntry(entry?.id, 'institution', e?.target?.value)}
                    required
                  />
                </div>

                <Select
                  label="Degree Type"
                  options={degreeOptions}
                  value={entry?.degree}
                  onChange={(value) => updateEducationEntry(entry?.id, 'degree', value)}
                  placeholder="Select degree type"
                  required
                />

                <Select
                  label="Field of Study"
                  options={fieldOfStudyOptions}
                  value={entry?.fieldOfStudy}
                  onChange={(value) => updateEducationEntry(entry?.id, 'fieldOfStudy', value)}
                  placeholder="Select field of study"
                  searchable
                  required
                />

                <Input
                  label="Start Date"
                  type="date"
                  value={entry?.startDate}
                  onChange={(e) => updateEducationEntry(entry?.id, 'startDate', e?.target?.value)}
                  required
                />

                <Input
                  label="End Date"
                  type="date"
                  value={entry?.endDate}
                  onChange={(e) => updateEducationEntry(entry?.id, 'endDate', e?.target?.value)}
                  disabled={entry?.isCurrentlyStudying}
                  required={!entry?.isCurrentlyStudying}
                />

                <Input
                  label="GPA (Optional)"
                  type="number"
                  placeholder="e.g., 3.8"
                  value={entry?.gpa}
                  onChange={(e) => updateEducationEntry(entry?.id, 'gpa', e?.target?.value)}
                  min="0"
                  max="4"
                  step="0.1"
                />

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`currently-studying-${entry?.id}`}
                    checked={entry?.isCurrentlyStudying}
                    onChange={(e) => {
                      updateEducationEntry(entry?.id, 'isCurrentlyStudying', e?.target?.checked);
                      if (e?.target?.checked) {
                        updateEducationEntry(entry?.id, 'endDate', '');
                      }
                    }}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-ring focus:ring-2"
                  />
                  <label
                    htmlFor={`currently-studying-${entry?.id}`}
                    className="text-sm font-medium text-foreground"
                  >
                    Currently studying here
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    className="w-full min-h-[100px] px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                    placeholder="Describe your coursework, achievements, relevant projects, or activities..."
                    value={entry?.description}
                    onChange={(e) => updateEducationEntry(entry?.id, 'description', e?.target?.value)}
                    maxLength={300}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {(entry?.description || '')?.length}/300 characters
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Certifications Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Additional Certifications</h4>
        <div className="space-y-4">
          <Input
            label="Certifications"
            type="text"
            placeholder="e.g., AWS Certified Developer, Google Analytics Certified"
            value={data?.certifications || ''}
            onChange={(e) => onChange('certifications', e?.target?.value)}
            description="List any relevant certifications, separated by commas"
          />
          <Input
            label="Languages"
            type="text"
            placeholder="e.g., English (Native), Spanish (Fluent), French (Intermediate)"
            value={data?.languages || ''}
            onChange={(e) => onChange('languages', e?.target?.value)}
            description="List languages and proficiency levels"
          />
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
          Save Education Information
        </Button>
      </div>
    </div>
  );
};

export default EducationTab;