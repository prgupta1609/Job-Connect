import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ApplicationForm = ({ 
  resumes, 
  onSubmit, 
  onPreview, 
  isSubmitting = false,
  hasApplied = false 
}) => {
  const [formData, setFormData] = useState({
    selectedResume: '',
    coverLetter: '',
    additionalDocuments: [],
    useTemplate: false,
    agreedToTerms: false,
    availableStartDate: '',
    expectedSalary: '',
    willingToRelocate: false
  });

  const [showQuickApply, setShowQuickApply] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const coverLetterTemplates = [
    {
      id: 'professional',
      name: 'Professional Template',
      preview: `Dear Hiring Manager,\n\nI am writing to express my strong interest in the [Position] role at [Company]. With my background in [Field], I am confident that I would be a valuable addition to your team.\n\nI am particularly drawn to this opportunity because...\n\nThank you for your consideration.\n\nBest regards,\n[Your Name]`
    },
    {
      id: 'enthusiastic',
      name: 'Enthusiastic Template',
      preview: `Dear [Company] Team,\n\nI am thrilled to apply for the [Position] role! As a passionate [Field] professional, I am excited about the opportunity to contribute to [Company]'s mission.\n\nWhat excites me most about this role is...\n\nI look forward to discussing how I can contribute to your team's success.\n\nWarm regards,\n[Your Name]`
    }
  ];

  const resumeOptions = resumes?.map(resume => ({
    value: resume?.id,
    label: `${resume?.name} (${resume?.type})`,
    description: `Updated ${resume?.lastModified}`
  }));

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTemplateSelect = (template) => {
    setFormData(prev => ({
      ...prev,
      coverLetter: template?.preview,
      useTemplate: true
    }));
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileUpload(e?.dataTransfer?.files);
    }
  };

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files)?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      file: file
    }));
    
    setFormData(prev => ({
      ...prev,
      additionalDocuments: [...prev?.additionalDocuments, ...newFiles]
    }));
  };

  const removeDocument = (fileId) => {
    setFormData(prev => ({
      ...prev,
      additionalDocuments: prev?.additionalDocuments?.filter(doc => doc?.id !== fileId)
    }));
  };

  const handleQuickApply = () => {
    if (resumes?.length > 0) {
      const defaultResume = resumes?.find(r => r?.isDefault) || resumes?.[0];
      const quickFormData = {
        ...formData,
        selectedResume: defaultResume?.id,
        coverLetter: `Dear Hiring Manager,\n\nI am interested in applying for this position. Please find my resume attached for your review.\n\nThank you for your consideration.\n\nBest regards,\n[Your Name]`,
        agreedToTerms: true
      };
      onSubmit(quickFormData);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = () => {
    return formData?.selectedResume && 
           formData?.coverLetter?.trim() && 
           formData?.agreedToTerms;
  };

  if (hasApplied) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Already Applied</h3>
        <p className="text-muted-foreground mb-4">
          You have already submitted an application for this position.
        </p>
        <Button
          variant="outline"
          onClick={() => window.location.href = '/application-tracking'}
          iconName="Eye"
          iconPosition="left"
        >
          View Application Status
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Apply Option */}
      {resumes?.length > 0 && !showQuickApply && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Quick Apply</h3>
              <p className="text-sm text-muted-foreground">
                Apply instantly with your default resume and auto-generated cover letter
              </p>
            </div>
            <Button
              variant="default"
              onClick={handleQuickApply}
              loading={isSubmitting}
              iconName="Zap"
              iconPosition="left"
            >
              Quick Apply
            </Button>
          </div>
        </div>
      )}
      {/* Detailed Application Form */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Icon name="FileText" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Complete Application</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Resume Selection */}
          <div>
            <Select
              label="Select Resume"
              description="Choose which resume version to submit"
              required
              options={resumeOptions}
              value={formData?.selectedResume}
              onChange={(value) => handleInputChange('selectedResume', value)}
              placeholder="Choose your resume"
            />
          </div>

          {/* Cover Letter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">
                Cover Letter *
              </label>
              <div className="flex gap-2">
                {coverLetterTemplates?.map(template => (
                  <Button
                    key={template?.id}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    {template?.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <textarea
              required
              rows={8}
              className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              placeholder="Write your cover letter here..."
              value={formData?.coverLetter}
              onChange={(e) => handleInputChange('coverLetter', e?.target?.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData?.coverLetter?.length} characters
            </p>
          </div>

          {/* Additional Documents */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Additional Documents (Optional)
            </label>
            
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                dragActive 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Icon name="Upload" size={24} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or click to browse
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => handleFileUpload(e?.target?.files)}
                className="hidden"
                id="file-upload"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Browse Files
              </Button>
            </div>

            {/* Uploaded Files */}
            {formData?.additionalDocuments?.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData?.additionalDocuments?.map(doc => (
                  <div key={doc?.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon name="File" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{doc?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(doc?.size / 1024)?.toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(doc?.id)}
                      iconName="X"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Available Start Date"
              type="date"
              value={formData?.availableStartDate}
              onChange={(e) => handleInputChange('availableStartDate', e?.target?.value)}
            />
            
            <Input
              label="Expected Salary (Optional)"
              type="text"
              placeholder="e.g., $60,000 - $70,000"
              value={formData?.expectedSalary}
              onChange={(e) => handleInputChange('expectedSalary', e?.target?.value)}
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <Checkbox
              label="I am willing to relocate for this position"
              checked={formData?.willingToRelocate}
              onChange={(e) => handleInputChange('willingToRelocate', e?.target?.checked)}
            />
            
            <Checkbox
              label="I agree to the terms and conditions and privacy policy *"
              required
              checked={formData?.agreedToTerms}
              onChange={(e) => handleInputChange('agreedToTerms', e?.target?.checked)}
            />
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => onPreview(formData)}
              disabled={!isFormValid()}
              iconName="Eye"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Preview Application
            </Button>
            
            <Button
              type="submit"
              disabled={!isFormValid()}
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
              className="flex-1"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;