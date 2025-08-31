import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileProgressBar = ({ completionPercentage, completedSections, totalSections }) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const getProgressTextColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getProgressMessage = (percentage) => {
    if (percentage >= 90) return 'Excellent! Your profile is almost complete.';
    if (percentage >= 80) return 'Great progress! Just a few more details needed.';
    if (percentage >= 60) return 'Good start! Keep adding more information.';
    if (percentage >= 40) return 'You\'re making progress! Continue building your profile.';
    return 'Let\'s get started! Complete your profile to attract employers.';
  };

  const getProgressIcon = (percentage) => {
    if (percentage >= 80) return 'CheckCircle';
    if (percentage >= 60) return 'Clock';
    return 'AlertCircle';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon 
            name={getProgressIcon(completionPercentage)} 
            size={24} 
            className={getProgressTextColor(completionPercentage)} 
          />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Profile Completion</h3>
            <p className="text-sm text-muted-foreground">
              {completedSections} of {totalSections} sections completed
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${getProgressTextColor(completionPercentage)}`}>
            {completionPercentage}%
          </div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ease-out ${getProgressColor(completionPercentage)}`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Progress Message */}
      <div className="flex items-start space-x-3">
        <Icon name="Info" size={16} className="text-primary mt-0.5" />
        <p className="text-sm text-foreground">
          {getProgressMessage(completionPercentage)}
        </p>
      </div>

      {/* Milestone Indicators */}
      <div className="mt-4 flex justify-between text-xs">
        <div className={`flex items-center space-x-1 ${completionPercentage >= 25 ? 'text-success' : 'text-muted-foreground'}`}>
          <Icon name={completionPercentage >= 25 ? 'CheckCircle' : 'Circle'} size={12} />
          <span>Basic Info</span>
        </div>
        <div className={`flex items-center space-x-1 ${completionPercentage >= 50 ? 'text-success' : 'text-muted-foreground'}`}>
          <Icon name={completionPercentage >= 50 ? 'CheckCircle' : 'Circle'} size={12} />
          <span>Education</span>
        </div>
        <div className={`flex items-center space-x-1 ${completionPercentage >= 75 ? 'text-success' : 'text-muted-foreground'}`}>
          <Icon name={completionPercentage >= 75 ? 'CheckCircle' : 'Circle'} size={12} />
          <span>Skills</span>
        </div>
        <div className={`flex items-center space-x-1 ${completionPercentage >= 100 ? 'text-success' : 'text-muted-foreground'}`}>
          <Icon name={completionPercentage >= 100 ? 'CheckCircle' : 'Circle'} size={12} />
          <span>Complete</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileProgressBar;