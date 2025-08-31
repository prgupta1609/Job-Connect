import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingInterviewsCard = ({ interviews = [], onViewInterview, onJoinInterview }) => {
  const mockInterviews = [
    {
      id: 1,
      jobTitle: "Frontend Developer Intern",
      company: "TechCorp Solutions",
      interviewType: "Technical Interview",
      date: "2025-09-02",
      time: "10:00 AM",
      duration: "60 minutes",
      interviewer: "Sarah Johnson",
      interviewerRole: "Senior Frontend Developer",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      isVirtual: true,
      status: "confirmed",
      preparationTips: [
        "Review React concepts and hooks",
        "Practice coding problems on arrays and strings",
        "Prepare questions about the team and projects"
      ]
    },
    {
      id: 2,
      jobTitle: "Software Engineer - Entry Level",
      company: "InnovateLabs",
      interviewType: "HR Round",
      date: "2025-09-03",
      time: "2:00 PM",
      duration: "45 minutes",
      interviewer: "Michael Chen",
      interviewerRole: "HR Manager",
      meetingLink: "https://zoom.us/j/123456789",
      isVirtual: true,
      status: "pending_confirmation",
      preparationTips: [
        "Research company culture and values",
        "Prepare STAR method examples",
        "Review your resume thoroughly"
      ]
    }
  ];

  const displayInterviews = interviews?.length > 0 ? interviews : mockInterviews;

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success bg-success/10';
      case 'pending_confirmation': return 'text-warning bg-warning/10';
      case 'rescheduled': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending_confirmation': return 'Pending Confirmation';
      case 'rescheduled': return 'Rescheduled';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isToday = (dateString) => {
    const today = new Date();
    const interviewDate = new Date(dateString);
    return today?.toDateString() === interviewDate?.toDateString();
  };

  const isTomorrow = (dateString) => {
    const tomorrow = new Date();
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    const interviewDate = new Date(dateString);
    return tomorrow?.toDateString() === interviewDate?.toDateString();
  };

  const getDateLabel = (dateString) => {
    if (isToday(dateString)) return 'Today';
    if (isTomorrow(dateString)) return 'Tomorrow';
    return formatDate(dateString);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
            <Icon name="Calendar" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Upcoming Interviews</h3>
            <p className="text-sm text-muted-foreground">
              {displayInterviews?.length > 0 ? `${displayInterviews?.length} scheduled` : 'No interviews scheduled'}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewInterview && onViewInterview('all')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      {displayInterviews?.length > 0 ? (
        <div className="space-y-4">
          {displayInterviews?.slice(0, 2)?.map((interview) => (
            <div key={interview?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{interview?.jobTitle}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{interview?.company}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview?.status)}`}>
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      {getStatusText(interview?.status)}
                    </span>
                    <span className="text-muted-foreground">{interview?.interviewType}</span>
                  </div>
                </div>
                {interview?.isVirtual && (
                  <div className="flex items-center text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                    <Icon name="Video" size={12} className="mr-1" />
                    Virtual
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  <span className={isToday(interview?.date) || isTomorrow(interview?.date) ? 'font-medium text-foreground' : ''}>
                    {getDateLabel(interview?.date)}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Icon name="Clock" size={16} className="mr-2" />
                  {interview?.time} ({interview?.duration})
                </div>
                <div className="flex items-center text-muted-foreground col-span-2">
                  <Icon name="User" size={16} className="mr-2" />
                  {interview?.interviewer} - {interview?.interviewerRole}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewInterview && onViewInterview(interview?.id)}
                  iconName="Eye"
                  iconPosition="left"
                >
                  View Details
                </Button>
                {interview?.isVirtual && interview?.meetingLink && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onJoinInterview && onJoinInterview(interview?.id, interview?.meetingLink)}
                    iconName="Video"
                    iconPosition="left"
                  >
                    Join Meeting
                  </Button>
                )}
              </div>

              {interview?.preparationTips && interview?.preparationTips?.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs font-medium text-foreground mb-2">Preparation Tips:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {interview?.preparationTips?.slice(0, 2)?.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <Icon name="CheckCircle" size={12} className="mr-2 mt-0.5 text-success flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-2">No upcoming interviews</p>
          <p className="text-sm text-muted-foreground">Keep applying to jobs to schedule interviews</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingInterviewsCard;