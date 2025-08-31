import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationPreview = ({ 
  formData, 
  jobTitle, 
  companyName, 
  onEdit, 
  onConfirm, 
  isSubmitting = false 
}) => {
  const selectedResume = formData?.selectedResume ? 
    `Resume_${formData?.selectedResume?.substring(0, 8)}.pdf` : 'No resume selected';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Icon name="Eye" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Application Preview</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Job Information */}
          <div className="mb-6">
            <h4 className="font-semibold text-foreground mb-2">Applying for:</h4>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="font-medium text-foreground">{jobTitle}</p>
              <p className="text-sm text-muted-foreground">at {companyName}</p>
            </div>
          </div>

          {/* Resume */}
          <div className="mb-6">
            <h4 className="font-semibold text-foreground mb-2">Resume:</h4>
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Icon name="FileText" size={16} className="text-primary" />
              <span className="text-sm text-foreground">{selectedResume}</span>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="mb-6">
            <h4 className="font-semibold text-foreground mb-2">Cover Letter:</h4>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                {formData?.coverLetter || 'No cover letter provided'}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {formData?.coverLetter?.length || 0} characters
              </div>
            </div>
          </div>

          {/* Additional Documents */}
          {formData?.additionalDocuments && formData?.additionalDocuments?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-2">Additional Documents:</h4>
              <div className="space-y-2">
                {formData?.additionalDocuments?.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                    <Icon name="File" size={14} className="text-primary" />
                    <span className="text-sm text-foreground">{doc?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(doc?.size / 1024)?.toFixed(1)} KB)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {formData?.availableStartDate && (
              <div>
                <h4 className="font-semibold text-foreground mb-1">Available Start Date:</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(formData.availableStartDate)?.toLocaleDateString()}
                </p>
              </div>
            )}
            
            {formData?.expectedSalary && (
              <div>
                <h4 className="font-semibold text-foreground mb-1">Expected Salary:</h4>
                <p className="text-sm text-muted-foreground">{formData?.expectedSalary}</p>
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="mb-6">
            <h4 className="font-semibold text-foreground mb-2">Preferences:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon 
                  name={formData?.willingToRelocate ? "CheckCircle" : "XCircle"} 
                  size={16} 
                  className={formData?.willingToRelocate ? "text-success" : "text-muted-foreground"} 
                />
                <span className="text-sm text-foreground">
                  {formData?.willingToRelocate ? "Willing to relocate" : "Not willing to relocate"}
                </span>
              </div>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="mb-6">
            <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-foreground">
                Agreed to terms and conditions
              </span>
            </div>
          </div>

          {/* Submission Note */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Ready to Submit
                </p>
                <p className="text-xs text-muted-foreground">
                  Once submitted, you'll receive a confirmation email and can track your application status in your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-muted/20">
          <Button
            variant="outline"
            onClick={onEdit}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Application
          </Button>
          
          <Button
            onClick={onConfirm}
            loading={isSubmitting}
            iconName="Send"
            iconPosition="left"
          >
            Confirm & Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPreview;