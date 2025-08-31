import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SimilarJobs = ({ jobs, currentJobId }) => {
  const navigate = useNavigate();

  const filteredJobs = jobs?.filter(job => job?.id !== currentJobId)?.slice(0, 3);

  const formatSalary = (min, max) => {
    if (!min && !max) return 'Competitive';
    if (min && max) return `$${min?.toLocaleString()} - $${max?.toLocaleString()}`;
    if (min) return `$${min?.toLocaleString()}+`;
    return `Up to $${max?.toLocaleString()}`;
  };

  const getJobTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'full-time':
        return 'bg-success/10 text-success';
      case 'part-time':
        return 'bg-warning/10 text-warning';
      case 'internship':
        return 'bg-primary/10 text-primary';
      case 'contract':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleJobClick = (jobId) => {
    // Navigate to the same page but with different job data
    // In a real app, this would update the URL parameter
    window.scrollTo(0, 0);
    // navigate(`/job-application-details-apply?id=${jobId}`);
  };

  if (filteredJobs?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="Briefcase" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Similar Jobs</h3>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {filteredJobs?.map((job) => (
          <div
            key={job?.id}
            className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200 cursor-pointer"
            onClick={() => handleJobClick(job?.id)}
          >
            <div className="flex items-start gap-3">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-border bg-muted">
                  <Image
                    src={job?.company?.logo}
                    alt={`${job?.company?.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Job Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
                  {job?.title}
                </h4>
                
                <div className="flex items-center gap-1 mb-2">
                  <p className="text-sm text-primary font-medium">
                    {job?.company?.name}
                  </p>
                  {job?.company?.verified && (
                    <Icon name="BadgeCheck" size={12} className="text-success" />
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    <span>{job?.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    <span>{job?.postedDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getJobTypeColor(job?.type)}`}>
                      {job?.type}
                    </span>
                    {job?.urgent && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-error/10 text-error">
                        Urgent
                      </span>
                    )}
                  </div>
                  
                  <div className="text-xs font-semibold text-foreground">
                    {formatSalary(job?.salary?.min, job?.salary?.max)}
                  </div>
                </div>

                {/* Match Percentage */}
                {job?.matchPercentage && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${job?.matchPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-primary">
                      {job?.matchPercentage}% match
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e?.stopPropagation();
                  handleJobClick(job?.id);
                }}
                iconName="Eye"
                iconPosition="left"
                className="flex-1"
              >
                View Details
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e?.stopPropagation();
                  // Handle save job
                }}
                iconName="Heart"
              />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e?.stopPropagation();
                  // Handle share job
                }}
                iconName="Share2"
              />
            </div>
          </div>
        ))}

        {/* View More Button */}
        <div className="pt-2">
          <Button
            variant="ghost"
            onClick={() => navigate('/job-search-browse')}
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full"
          >
            View More Similar Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SimilarJobs;