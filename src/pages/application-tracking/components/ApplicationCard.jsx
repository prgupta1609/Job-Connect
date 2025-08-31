import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ApplicationCard = ({ application, onWithdraw, onFollowUp, onScheduleInterview }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shortlisted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'interview-scheduled':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'offer-received':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
        return 'Send';
      case 'under-review':
        return 'Clock';
      case 'shortlisted':
        return 'CheckCircle';
      case 'interview-scheduled':
        return 'Calendar';
      case 'rejected':
        return 'X';
      case 'offer-received':
        return 'Award';
      default:
        return 'Circle';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (date) => {
    return new Date(date)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canWithdraw = ['submitted', 'under-review']?.includes(application?.status);
  const canFollowUp = ['submitted', 'under-review', 'shortlisted']?.includes(application?.status);
  const canScheduleInterview = application?.status === 'interview-scheduled';

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
              <Image
                src={application?.company?.logo}
                alt={`${application?.company?.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {application?.position}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {application?.company?.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Applied on {formatDate(application?.appliedDate)}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(application?.status)}`}>
                  <Icon name={getStatusIcon(application?.status)} size={12} className="mr-1" />
                  {application?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                </span>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                >
                  {isExpanded ? 'Less' : 'More'}
                </Button>
              </div>
            </div>

            {application?.hasNewUpdate && (
              <div className="mt-2 flex items-center text-xs text-primary">
                <Icon name="Bell" size={12} className="mr-1" />
                New update available
              </div>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Job Details</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Icon name="MapPin" size={14} className="mr-2" />
                    {application?.location}
                  </div>
                  <div className="flex items-center">
                    <Icon name="Briefcase" size={14} className="mr-2" />
                    {application?.jobType}
                  </div>
                  <div className="flex items-center">
                    <Icon name="DollarSign" size={14} className="mr-2" />
                    {application?.salary}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Application Timeline</h4>
                <div className="space-y-2">
                  {application?.timeline?.map((event, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${
                        index === 0 ? 'bg-primary' : 'bg-muted-foreground'
                      }`} />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-foreground">
                          {event?.action}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(event?.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {application?.lastMessage && (
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <h4 className="text-sm font-medium text-foreground mb-1">Latest Message</h4>
                <p className="text-sm text-muted-foreground">
                  {application?.lastMessage?.content}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  From {application?.lastMessage?.sender} • {formatDateTime(application?.lastMessage?.date)}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {canWithdraw && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onWithdraw(application?.id)}
                  iconName="X"
                  iconPosition="left"
                >
                  Withdraw
                </Button>
              )}
              
              {canFollowUp && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFollowUp(application?.id)}
                  iconName="MessageSquare"
                  iconPosition="left"
                >
                  Follow Up
                </Button>
              )}
              
              {canScheduleInterview && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onScheduleInterview(application?.id)}
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Schedule Interview
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                iconName="ExternalLink"
                iconPosition="left"
              >
                View Job
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;