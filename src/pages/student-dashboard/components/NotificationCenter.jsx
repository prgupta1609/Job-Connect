import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications = [], onMarkAsRead, onViewAll }) => {
  const [expandedNotifications, setExpandedNotifications] = useState(new Set());

  const mockNotifications = [
    {
      id: 1,
      type: 'job_match',
      title: 'New Job Match Found!',
      message: 'Frontend Developer position at TechCorp Solutions matches your profile perfectly.',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      isRead: false,
      actionText: 'View Job',
      actionUrl: '/job-search-browse'
    },
    {
      id: 2,
      type: 'recruiter_message',
      title: 'Message from InnovateLabs',
      message: 'We would like to schedule an interview for the Software Engineer position.',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: false,
      actionText: 'Reply',
      actionUrl: '/messages'
    },
    {
      id: 3,
      type: 'application_update',
      title: 'Application Status Updated',
      message: 'Your application for UI/UX Designer Intern has been moved to interview stage.',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isRead: true,
      actionText: 'View Application',
      actionUrl: '/application-tracking'
    },
    {
      id: 4,
      type: 'profile_view',
      title: 'Profile Viewed',
      message: 'DataInsights Inc viewed your profile. Complete your skills section to increase visibility.',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      isRead: true,
      actionText: 'Update Profile',
      actionUrl: '/student-profile-management'
    },
    {
      id: 5,
      type: 'skill_recommendation',
      title: 'Skill Gap Analysis Ready',
      message: 'Based on your target jobs, we recommend learning React Native and TypeScript.',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      isRead: false,
      actionText: 'View Recommendations',
      actionUrl: '/skill-analysis'
    }
  ];

  const displayNotifications = notifications?.length > 0 ? notifications : mockNotifications;
  const unreadCount = displayNotifications?.filter(n => !n?.isRead)?.length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'job_match': return 'Briefcase';
      case 'recruiter_message': return 'MessageCircle';
      case 'application_update': return 'FileText';
      case 'profile_view': return 'Eye';
      case 'skill_recommendation': return 'BookOpen';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'job_match': return 'text-success bg-success/10';
      case 'recruiter_message': return 'text-primary bg-primary/10';
      case 'application_update': return 'text-warning bg-warning/10';
      case 'profile_view': return 'text-accent bg-accent/10';
      case 'skill_recommendation': return 'text-secondary bg-secondary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const toggleExpanded = (notificationId) => {
    const newExpanded = new Set(expandedNotifications);
    if (newExpanded?.has(notificationId)) {
      newExpanded?.delete(notificationId);
    } else {
      newExpanded?.add(notificationId);
    }
    setExpandedNotifications(newExpanded);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 relative">
            <Icon name="Bell" size={20} className="text-primary" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewAll && onViewAll()}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {displayNotifications?.slice(0, 5)?.map((notification) => (
          <div 
            key={notification?.id} 
            className={`border border-border rounded-lg p-4 transition-colors duration-200 cursor-pointer ${
              !notification?.isRead ? 'bg-primary/5 border-primary/20' : 'hover:bg-muted/30'
            }`}
            onClick={() => toggleExpanded(notification?.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification?.type)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className={`text-sm font-medium ${!notification?.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {notification?.title}
                  </h4>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(notification?.timestamp)}
                    </span>
                    {!notification?.isRead && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                </div>
                
                <p className={`text-sm ${expandedNotifications?.has(notification?.id) ? '' : 'line-clamp-2'} ${
                  !notification?.isRead ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {notification?.message}
                </p>
                
                {notification?.actionText && expandedNotifications?.has(notification?.id) && (
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        if (onMarkAsRead) onMarkAsRead(notification?.id);
                      }}
                    >
                      {notification?.actionText}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {displayNotifications?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No notifications yet</p>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;