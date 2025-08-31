import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationStatusTracker = ({ applications = [], onViewApplication }) => {
  const mockApplications = [
    {
      id: 1,
      jobTitle: "Frontend Developer Intern",
      company: "TechCorp Solutions",
      appliedDate: "2025-08-29",
      status: "interview",
      statusText: "Interview Scheduled",
      nextStep: "Technical Interview on Sep 2, 2025",
      timeline: [
        { step: "Applied", completed: true, date: "Aug 29" },
        { step: "Reviewed", completed: true, date: "Aug 30" },
        { step: "Interview", completed: false, date: "Sep 2" },
        { step: "Decision", completed: false, date: "TBD" }
      ]
    },
    {
      id: 2,
      jobTitle: "Software Engineer - Entry Level",
      company: "InnovateLabs",
      appliedDate: "2025-08-28",
      status: "reviewing",
      statusText: "Under Review",
      nextStep: "Application being reviewed by hiring team",
      timeline: [
        { step: "Applied", completed: true, date: "Aug 28" },
        { step: "Reviewed", completed: false, date: "TBD" },
        { step: "Interview", completed: false, date: "TBD" },
        { step: "Decision", completed: false, date: "TBD" }
      ]
    },
    {
      id: 3,
      jobTitle: "UI/UX Designer Intern",
      company: "DesignStudio Pro",
      appliedDate: "2025-08-27",
      status: "accepted",
      statusText: "Offer Received",
      nextStep: "Respond to offer by Sep 5, 2025",
      timeline: [
        { step: "Applied", completed: true, date: "Aug 27" },
        { step: "Reviewed", completed: true, date: "Aug 28" },
        { step: "Interview", completed: true, date: "Aug 30" },
        { step: "Decision", completed: true, date: "Aug 31" }
      ]
    },
    {
      id: 4,
      jobTitle: "Data Analyst Trainee",
      company: "DataInsights Inc",
      appliedDate: "2025-08-26",
      status: "rejected",
      statusText: "Not Selected",
      nextStep: "Thank you for your interest",
      timeline: [
        { step: "Applied", completed: true, date: "Aug 26" },
        { step: "Reviewed", completed: true, date: "Aug 27" },
        { step: "Interview", completed: false, date: "N/A" },
        { step: "Decision", completed: true, date: "Aug 28" }
      ]
    }
  ];

  const displayApplications = applications?.length > 0 ? applications : mockApplications;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return 'Clock';
      case 'reviewing': return 'Eye';
      case 'interview': return 'Calendar';
      case 'accepted': return 'CheckCircle';
      case 'rejected': return 'XCircle';
      default: return 'FileText';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-muted-foreground bg-muted';
      case 'reviewing': return 'text-warning bg-warning/10';
      case 'interview': return 'text-primary bg-primary/10';
      case 'accepted': return 'text-success bg-success/10';
      case 'rejected': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
            <Icon name="FileText" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Application Status</h3>
            <p className="text-sm text-muted-foreground">Track your recent applications</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewApplication && onViewApplication('all')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {displayApplications?.slice(0, 3)?.map((application) => (
          <div key={application?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{application?.jobTitle}</h4>
                <p className="text-sm text-muted-foreground mb-2">{application?.company}</p>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application?.status)}`}>
                    <Icon name={getStatusIcon(application?.status)} size={12} className="mr-1" />
                    {application?.statusText}
                  </span>
                  <span className="text-xs text-muted-foreground ml-3">
                    Applied on {new Date(application.appliedDate)?.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewApplication && onViewApplication(application?.id)}
                iconName="ExternalLink"
                iconPosition="right"
              >
                View
              </Button>
            </div>

            <div className="mb-3">
              <p className="text-sm text-muted-foreground">{application?.nextStep}</p>
            </div>

            <div className="flex items-center space-x-2">
              {application?.timeline?.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      step?.completed 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step?.completed ? (
                        <Icon name="Check" size={12} />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">{step?.step}</span>
                    <span className="text-xs text-muted-foreground">{step?.date}</span>
                  </div>
                  {index < application?.timeline?.length - 1 && (
                    <div className={`flex-1 h-0.5 ${
                      step?.completed ? 'bg-success' : 'bg-muted'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationStatusTracker;