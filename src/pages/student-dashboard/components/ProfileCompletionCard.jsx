import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileCompletionCard = ({ completionPercentage = 65, onUpdateProfile }) => {
  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const getCompletionMessage = (percentage) => {
    if (percentage >= 80) return 'Great! Your profile is almost complete';
    if (percentage >= 60) return 'Good progress! Add more details to stand out';
    return 'Complete your profile to get better job matches';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Profile Completion</h3>
            <p className="text-sm text-muted-foreground">{getCompletionMessage(completionPercentage)}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{completionPercentage}%</div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getCompletionColor(completionPercentage)}`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Target" size={16} className="mr-1" />
          Complete your profile to get 3x more job matches
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onUpdateProfile}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileCompletionCard;