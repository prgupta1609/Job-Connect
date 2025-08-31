import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCards = ({ stats = {} }) => {
  const mockStats = {
    totalApplications: 12,
    interviewInvitations: 3,
    profileViews: 45,
    jobMatches: 28
  };

  const displayStats = Object.keys(stats)?.length > 0 ? stats : mockStats;

  const statsConfig = [
    {
      key: 'totalApplications',
      label: 'Total Applications',
      icon: 'FileText',
      color: 'text-primary bg-primary/10',
      trend: '+2 this week'
    },
    {
      key: 'interviewInvitations',
      label: 'Interview Invitations',
      icon: 'Calendar',
      color: 'text-success bg-success/10',
      trend: '+1 this week'
    },
    {
      key: 'profileViews',
      label: 'Profile Views',
      icon: 'Eye',
      color: 'text-warning bg-warning/10',
      trend: '+8 this week'
    },
    {
      key: 'jobMatches',
      label: 'Job Matches',
      icon: 'Target',
      color: 'text-accent bg-accent/10',
      trend: '+5 new today'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsConfig?.map((config) => (
        <div key={config?.key} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config?.color}`}>
              <Icon name={config?.icon} size={20} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">
                {displayStats?.[config?.key] || 0}
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-foreground">{config?.label}</h4>
            <p className="text-xs text-muted-foreground">{config?.trend}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsCards;