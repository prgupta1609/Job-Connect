import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfilePreview = ({ data, completionPercentage }) => {
  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  const getProficiencyBadge = (proficiency) => {
    const colors = {
      beginner: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
      advanced: 'bg-green-100 text-green-800 border-green-200',
      expert: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors?.[proficiency] || colors?.intermediate;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Profile Preview</h3>
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <span className={`text-sm font-semibold ${getCompletionColor(completionPercentage)}`}>
              {completionPercentage}%
            </span>
          </div>
        </div>
      </div>
      {/* Profile Header */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-muted border-2 border-border mx-auto mb-3">
          {data?.profileImage ? (
            <Image
              src={data?.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon name="User" size={32} className="text-muted-foreground" />
            </div>
          )}
        </div>
        <h4 className="text-lg font-semibold text-foreground">
          {data?.firstName || data?.lastName ? `${data?.firstName || ''} ${data?.lastName || ''}`?.trim() : 'Your Name'}
        </h4>
        <p className="text-sm text-muted-foreground">
          {data?.email || 'your.email@example.com'}
        </p>
        {data?.phone && (
          <p className="text-sm text-muted-foreground">{data?.phone}</p>
        )}
      </div>
      {/* Completion Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Profile Completion</span>
          <span className={`text-sm font-semibold ${getCompletionColor(completionPercentage)}`}>
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              completionPercentage >= 80 ? 'bg-success' :
              completionPercentage >= 60 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">
            {(data?.skills || [])?.length}
          </div>
          <div className="text-xs text-muted-foreground">Skills</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">
            {(data?.experience || [])?.length}
          </div>
          <div className="text-xs text-muted-foreground">Experience</div>
        </div>
      </div>
      {/* Summary */}
      {data?.summary && (
        <div className="mb-6">
          <h5 className="text-sm font-semibold text-foreground mb-2">Summary</h5>
          <p className="text-xs text-muted-foreground line-clamp-3">
            {data?.summary}
          </p>
        </div>
      )}
      {/* Top Skills */}
      {data?.skills && data?.skills?.length > 0 && (
        <div className="mb-6">
          <h5 className="text-sm font-semibold text-foreground mb-2">Top Skills</h5>
          <div className="space-y-2">
            {data?.skills?.slice(0, 5)?.map((skill) => (
              <div key={skill?.id} className="flex items-center justify-between">
                <span className="text-xs text-foreground">{skill?.name}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full border ${getProficiencyBadge(skill?.proficiency)}`}>
                  {skill?.proficiency}
                </span>
              </div>
            ))}
            {data?.skills?.length > 5 && (
              <p className="text-xs text-muted-foreground">
                +{data?.skills?.length - 5} more skills
              </p>
            )}
          </div>
        </div>
      )}
      {/* Latest Experience */}
      {data?.experience && data?.experience?.length > 0 && (
        <div className="mb-6">
          <h5 className="text-sm font-semibold text-foreground mb-2">Latest Experience</h5>
          <div className="space-y-2">
            {data?.experience?.slice(0, 2)?.map((exp) => (
              <div key={exp?.id} className="p-2 bg-muted rounded">
                <p className="text-xs font-medium text-foreground">{exp?.position}</p>
                <p className="text-xs text-muted-foreground">{exp?.company}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(exp?.startDate)} - {exp?.isCurrentPosition ? 'Present' : formatDate(exp?.endDate)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Education */}
      {data?.education && data?.education?.length > 0 && (
        <div className="mb-6">
          <h5 className="text-sm font-semibold text-foreground mb-2">Education</h5>
          <div className="space-y-2">
            {data?.education?.slice(0, 2)?.map((edu) => (
              <div key={edu?.id} className="p-2 bg-muted rounded">
                <p className="text-xs font-medium text-foreground">{edu?.degree}</p>
                <p className="text-xs text-muted-foreground">{edu?.institution}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(edu?.startDate)} - {edu?.isCurrentlyStudying ? 'Present' : formatDate(edu?.endDate)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Resume Status */}
      <div className="mb-6">
        <h5 className="text-sm font-semibold text-foreground mb-2">Resume</h5>
        <div className="flex items-center space-x-2">
          <Icon 
            name={data?.resumeFileName ? "CheckCircle" : "AlertCircle"} 
            size={16} 
            className={data?.resumeFileName ? "text-success" : "text-warning"} 
          />
          <span className="text-xs text-muted-foreground">
            {data?.resumeFileName ? 'Resume uploaded' : 'No resume uploaded'}
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Eye"
          iconPosition="left"
        >
          Preview Full Profile
        </Button>
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          iconName="Share"
          iconPosition="left"
        >
          Share Profile
        </Button>
      </div>
      {/* Completion Tips */}
      <div className="mt-6 p-3 bg-primary/5 rounded-lg border border-primary/20">
        <h6 className="text-xs font-semibold text-primary mb-2">
          <Icon name="Lightbulb" size={14} className="inline mr-1" />
          Improve Your Profile
        </h6>
        <ul className="text-xs text-primary space-y-1">
          {!data?.profileImage && <li>• Add a professional photo</li>}
          {!data?.summary && <li>• Write a compelling summary</li>}
          {(!data?.skills || data?.skills?.length < 5) && <li>• Add more skills</li>}
          {!data?.resumeFileName && <li>• Upload your resume</li>}
          {(!data?.experience || data?.experience?.length === 0) && <li>• Add work experience</li>}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePreview;