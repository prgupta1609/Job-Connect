import React from 'react';
import Icon from '../../../components/AppIcon';

const SmartMatchingIndicator = ({ matchPercentage, skillGaps, strengths }) => {
  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getMatchBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const getMatchMessage = (percentage) => {
    if (percentage >= 80) return 'Excellent match! You meet most requirements.';
    if (percentage >= 60) return 'Good match! Consider highlighting relevant experience.';
    return 'Partial match. Focus on transferable skills in your application.';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Target" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Profile Match</h3>
          <p className="text-sm text-muted-foreground">AI-powered compatibility analysis</p>
        </div>
      </div>
      {/* Match Percentage */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Match</span>
          <span className={`text-lg font-bold ${getMatchColor(matchPercentage)}`}>
            {matchPercentage}%
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getMatchBgColor(matchPercentage)}`}
            style={{ width: `${matchPercentage}%` }}
          />
        </div>
        
        <p className="text-xs text-muted-foreground mt-2">
          {getMatchMessage(matchPercentage)}
        </p>
      </div>
      {/* Strengths */}
      {strengths && strengths?.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <h4 className="font-medium text-foreground">Your Strengths</h4>
          </div>
          <div className="space-y-2">
            {strengths?.map((strength, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-success rounded-full" />
                <span className="text-muted-foreground">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Skill Gaps */}
      {skillGaps && skillGaps?.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <h4 className="font-medium text-foreground">Areas to Highlight</h4>
          </div>
          <div className="space-y-2">
            {skillGaps?.map((gap, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-warning rounded-full mt-2" />
                <div>
                  <span className="text-muted-foreground">{gap?.skill}</span>
                  {gap?.suggestion && (
                    <p className="text-xs text-muted-foreground mt-1">
                      💡 {gap?.suggestion}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Improvement Tips */}
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Lightbulb" size={14} className="text-primary" />
          <span className="text-xs font-medium text-foreground">Pro Tip</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Customize your cover letter to address the highlighted areas and emphasize your strengths for better chances.
        </p>
      </div>
    </div>
  );
};

export default SmartMatchingIndicator;