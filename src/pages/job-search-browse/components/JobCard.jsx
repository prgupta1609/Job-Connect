import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const JobCard = ({ job, onApply, onSave, onViewDetails, isSaved = false }) => {
  const [isBookmarked, setIsBookmarked] = useState(isSaved);

  const handleSave = () => {
    setIsBookmarked(!isBookmarked);
    onSave(job?.id, !isBookmarked);
  };

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
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={job?.company?.logo}
              alt={`${job?.company?.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {job?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {job?.company?.name}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleSave}
          className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
        >
          <Icon
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"}
            size={20}
            color={isBookmarked ? "var(--color-primary)" : "var(--color-muted-foreground)"}
          />
        </button>
      </div>
      {/* Job Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={16} />
            <span>{job?.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{job?.postedDate}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
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

        <div className="text-sm">
          <span className="font-medium text-foreground">
            {formatSalary(job?.salary?.min, job?.salary?.max)}
          </span>
          {job?.salary?.period && (
            <span className="text-muted-foreground ml-1">
              / {job?.salary?.period}
            </span>
          )}
        </div>
      </div>
      {/* Skills */}
      {job?.skills && job?.skills?.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {job?.skills?.slice(0, 4)?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
            {job?.skills?.length > 4 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{job?.skills?.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}
      {/* Match Score */}
      {job?.matchScore && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Profile Match</span>
            <span className="font-medium text-foreground">{job?.matchScore}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-1">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${job?.matchScore}%` }}
            />
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center space-x-3">
        <Button
          variant="default"
          onClick={() => onApply(job)}
          className="flex-1"
          iconName="Send"
          iconPosition="left"
        >
          Quick Apply
        </Button>
        <Button
          variant="outline"
          onClick={() => onViewDetails(job)}
          iconName="Eye"
          iconPosition="left"
        >
          View Details
        </Button>
      </div>
      {/* Perfect Match Banner */}
      {job?.isPerfectMatch && (
        <div className="mt-3 p-2 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={16} color="var(--color-accent)" />
            <span className="text-sm font-medium text-accent">
              Perfect Match - AI Recommended
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;