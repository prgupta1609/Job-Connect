import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const JobPreviewPanel = ({ job, onApply, onSave, onClose, isSaved = false }) => {
  if (!job) {
    return (
      <div className="hidden lg:block w-80 bg-card border-l border-border">
        <div className="p-6 h-full flex items-center justify-center">
          <div className="text-center">
            <Icon name="Briefcase" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Select a job to preview
            </h3>
            <p className="text-sm text-muted-foreground">
              Click on any job card to see detailed information here
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formatSalary = (min, max) => {
    if (!min && !max) return 'Salary not disclosed';
    if (min && max) return `$${min?.toLocaleString()} - $${max?.toLocaleString()}`;
    if (min) return `$${min?.toLocaleString()}+`;
    return `Up to $${max?.toLocaleString()}`;
  };

  const getJobTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'full-time':
        return 'bg-success text-success-foreground';
      case 'part-time':
        return 'bg-warning text-warning-foreground';
      case 'internship':
        return 'bg-primary text-primary-foreground';
      case 'contract':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="hidden lg:block w-80 bg-card border-l border-border">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Job Details</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Company & Job Info */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={job?.company?.logo}
                  alt={`${job?.company?.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {job?.title}
                </h3>
                <p className="text-muted-foreground">
                  {job?.company?.name}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="MapPin" size={16} />
                <span>{job?.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Posted {job?.postedDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={16} color="var(--color-success)" />
                <span className="font-medium text-foreground">
                  {formatSalary(job?.salary?.min, job?.salary?.max)}
                </span>
                {job?.salary?.period && (
                  <span className="text-muted-foreground">/ {job?.salary?.period}</span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job?.type)}`}>
                {job?.type}
              </span>
              {job?.isRemote && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                  Remote
                </span>
              )}
              {job?.isUrgent && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-error text-error-foreground">
                  Urgent
                </span>
              )}
            </div>
          </div>

          {/* Match Score */}
          {job?.matchScore && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium text-foreground">Profile Match</span>
                <span className="font-semibold text-primary">{job?.matchScore}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${job?.matchScore}%` }}
                />
              </div>
            </div>
          )}

          {/* Job Description */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Job Description</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>{job?.description}</p>
            </div>
          </div>

          {/* Requirements */}
          {job?.requirements && job?.requirements?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {job?.requirements?.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="Check" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {job?.skills && job?.skills?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {job?.benefits && job?.benefits?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Benefits</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {job?.benefits?.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="Gift" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Company Info */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">About {job?.company?.name}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {job?.company?.description}
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span>{job?.company?.size} employees</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Building" size={16} />
                <span>{job?.company?.industry}</span>
              </div>
              {job?.company?.website && (
                <div className="flex items-center space-x-2">
                  <Icon name="Globe" size={16} />
                  <a 
                    href={job?.company?.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-border">
          <div className="space-y-3">
            <Button
              variant="default"
              onClick={() => onApply(job)}
              className="w-full"
              iconName="Send"
              iconPosition="left"
            >
              Apply Now
            </Button>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => onSave(job?.id, !isSaved)}
                className="flex-1"
                iconName={isSaved ? "Bookmark" : "BookmarkPlus"}
                iconPosition="left"
              >
                {isSaved ? 'Saved' : 'Save Job'}
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(`mailto:?subject=${encodeURIComponent(job?.title)}&body=${encodeURIComponent(`Check out this job: ${job?.title} at ${job?.company?.name}`)}`)}
                iconName="Share"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPreviewPanel;