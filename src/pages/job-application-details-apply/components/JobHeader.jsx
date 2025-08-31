import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const JobHeader = ({ job, onSave, isSaved = false }) => {
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

  const getLocationTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'remote':
        return 'Home';
      case 'hybrid':
        return 'Building2';
      case 'onsite':
        return 'MapPin';
      default:
        return 'MapPin';
    }
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 lg:px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left Section - Job Info */}
          <div className="flex-1">
            <div className="flex items-start gap-4">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border border-border bg-muted">
                  <Image
                    src={job?.company?.logo}
                    alt={`${job?.company?.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Job Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-heading">
                    {job?.title}
                  </h1>
                  <button
                    onClick={onSave}
                    className="flex-shrink-0 p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 lg:hidden"
                  >
                    <Icon 
                      name={isSaved ? "Heart" : "Heart"} 
                      size={20} 
                      className={isSaved ? "fill-current text-error" : ""} 
                    />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-lg font-semibold text-primary">
                    {job?.company?.name}
                  </h2>
                  {job?.company?.verified && (
                    <Icon name="BadgeCheck" size={16} className="text-success" />
                  )}
                </div>

                {/* Job Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Icon name={getLocationTypeIcon(job?.locationType)} size={16} />
                    <span>{job?.location}</span>
                    {job?.locationType && (
                      <span className="text-xs">({job?.locationType})</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={16} />
                    <span>Posted {job?.postedDate}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Icon name="Users" size={16} />
                    <span>{job?.applicants} applicants</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job?.type)}`}>
                    {job?.type}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    {job?.experience} level
                  </span>
                  {job?.urgent && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-error text-error-foreground">
                      Urgent hiring
                    </span>
                  )}
                </div>

                {/* Salary */}
                <div className="text-lg font-semibold text-foreground">
                  {formatSalary(job?.salary?.min, job?.salary?.max)}
                  {job?.salary?.period && (
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      per {job?.salary?.period}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onSave}
              className="p-3 border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary transition-colors duration-200"
            >
              <Icon 
                name={isSaved ? "Heart" : "Heart"} 
                size={20} 
                className={isSaved ? "fill-current text-error" : ""} 
              />
            </button>
            
            <button className="p-3 border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary transition-colors duration-200">
              <Icon name="Share2" size={20} />
            </button>
          </div>
        </div>

        {/* Application Deadline Warning */}
        {job?.deadline && (
          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center gap-2 text-warning">
              <Icon name="Clock" size={16} />
              <span className="text-sm font-medium">
                Application deadline: {job?.deadline}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobHeader;