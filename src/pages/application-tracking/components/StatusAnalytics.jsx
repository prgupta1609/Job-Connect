import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusAnalytics = ({ analytics }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'text-blue-600';
      case 'under-review':
        return 'text-yellow-600';
      case 'shortlisted':
        return 'text-green-600';
      case 'interview-scheduled':
        return 'text-purple-600';
      case 'rejected':
        return 'text-red-600';
      case 'offer-received':
        return 'text-emerald-600';
      default:
        return 'text-gray-600';
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

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Application Analytics</h3>
        <Icon name="BarChart3" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{analytics?.totalApplications}</div>
          <div className="text-sm text-muted-foreground">Total Applications</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{analytics?.successRate}%</div>
          <div className="text-sm text-muted-foreground">Success Rate</div>
        </div>
        <div className="text-center col-span-2 lg:col-span-1">
          <div className="text-2xl font-bold text-primary">{analytics?.avgResponseTime}</div>
          <div className="text-sm text-muted-foreground">Avg Response Time</div>
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Status Breakdown</h4>
        {analytics?.statusBreakdown?.map((item) => (
          <div key={item?.status} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(item?.status)} 
                size={16} 
                className={getStatusColor(item?.status)} 
              />
              <span className="text-sm text-foreground capitalize">
                {item?.status?.replace('-', ' ')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    item?.status === 'submitted' ? 'bg-blue-500' :
                    item?.status === 'under-review' ? 'bg-yellow-500' :
                    item?.status === 'shortlisted' ? 'bg-green-500' :
                    item?.status === 'interview-scheduled' ? 'bg-purple-500' :
                    item?.status === 'rejected' ? 'bg-red-500' :
                    item?.status === 'offer-received'? 'bg-emerald-500' : 'bg-gray-500'
                  }`}
                  style={{ width: `${item?.percentage}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground w-8 text-right">
                {item?.count}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">This Month</span>
          <span className="font-medium text-foreground">
            +{analytics?.monthlyGrowth} applications
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusAnalytics;