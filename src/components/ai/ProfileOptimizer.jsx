import React, { useState } from 'react';
import Button from '../ui/Button';
import Icon from '../AppIcon';
import { optimizeProfile } from '../../services/openaiService';

const ProfileOptimizer = ({ userProfile, onApplyOptimizations }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizations, setOptimizations] = useState(null);
  const [targetRole, setTargetRole] = useState('Software Developer');

  const handleOptimizeProfile = async () => {
    if (!userProfile || !import.meta.env?.VITE_OPENAI_API_KEY) {
      return;
    }

    setIsOptimizing(true);
    try {
      const result = await optimizeProfile(userProfile, targetRole);
      setOptimizations(result);
    } catch (error) {
      console.error('Error optimizing profile:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleApplyOptimization = (field, value) => {
    if (onApplyOptimizations) {
      onApplyOptimizations(field, value);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
            <Icon name="Bot" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Profile Optimizer</h3>
            <p className="text-sm text-muted-foreground">Enhance your profile with AI recommendations</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Target Role
          </label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e?.target?.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
          >
            <option value="Software Developer">Software Developer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
        </div>

        <Button
          variant="default"
          onClick={handleOptimizeProfile}
          loading={isOptimizing}
          disabled={!import.meta.env?.VITE_OPENAI_API_KEY}
          iconName="Sparkles"
          iconPosition="left"
          fullWidth
        >
          {isOptimizing ? 'Optimizing Profile...' : 'Optimize My Profile'}
        </Button>

        {!import.meta.env?.VITE_OPENAI_API_KEY && (
          <p className="text-xs text-muted-foreground text-center">
            OpenAI API key required for profile optimization
          </p>
        )}

        {optimizations && (
          <div className="mt-6 space-y-4">
            <h4 className="font-semibold text-foreground">AI Recommendations</h4>
            
            {/* Optimized Summary */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-foreground">Optimized Summary</h5>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleApplyOptimization('summary', optimizations?.optimizedSummary)}
                >
                  Apply
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{optimizations?.optimizedSummary}</p>
            </div>

            {/* Skills to Emphasize */}
            {optimizations?.skillsToEmphasize?.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h5 className="font-medium text-foreground mb-2">Skills to Emphasize</h5>
                <div className="flex flex-wrap gap-2">
                  {optimizations?.skillsToEmphasize?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills */}
            {optimizations?.missingSkills?.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h5 className="font-medium text-foreground mb-2">Recommended Skills to Add</h5>
                <div className="flex flex-wrap gap-2">
                  {optimizations?.missingSkills?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-warning text-warning-foreground text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* General Suggestions */}
            {optimizations?.suggestions?.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h5 className="font-medium text-foreground mb-2">Additional Suggestions</h5>
                <ul className="space-y-1">
                  {optimizations?.suggestions?.map((suggestion, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <Icon name="CheckCircle" size={16} className="text-success mr-2 mt-0.5 flex-shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileOptimizer;