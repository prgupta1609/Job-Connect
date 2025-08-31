import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { generateSkillGapAnalysis } from '../../../services/openaiService';

const SkillGapAnalysisCard = ({ skillGaps = [], onViewCourses, onStartLearning, userProfile, targetJobs = [] }) => {
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [aiSkillGaps, setAiSkillGaps] = useState([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const mockSkillGaps = [
    {
      id: 1,
      skill: "React Native",
      priority: "high",
      demandScore: 85,
      currentLevel: 0,
      targetLevel: 70,
      jobsRequiring: 23,
      averageSalaryIncrease: "$8,000",
      timeToLearn: "3-4 months",
      recommendedCourses: [
        {
          title: "React Native - The Practical Guide",
          provider: "Udemy",
          rating: 4.6,
          duration: "32 hours",
          price: "$89.99"
        },
        {
          title: "React Native Development",
          provider: "Coursera",
          rating: 4.5,
          duration: "6 weeks",
          price: "Free"
        }
      ],
      description: "Mobile app development framework highly sought after by employers in your target job market."
    },
    {
      id: 2,
      skill: "TypeScript",
      priority: "high",
      demandScore: 78,
      currentLevel: 20,
      targetLevel: 75,
      jobsRequiring: 31,
      averageSalaryIncrease: "$6,500",
      timeToLearn: "2-3 months",
      recommendedCourses: [
        {
          title: "Understanding TypeScript",
          provider: "Udemy",
          rating: 4.7,
          duration: "15 hours",
          price: "$79.99"
        },
        {
          title: "TypeScript Fundamentals",
          provider: "Pluralsight",
          rating: 4.4,
          duration: "4 hours",
          price: "$29/month"
        }
      ],
      description: "Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale."
    },
    {
      id: 3,
      skill: "Node.js",
      priority: "medium",
      demandScore: 72,
      currentLevel: 35,
      targetLevel: 80,
      jobsRequiring: 18,
      averageSalaryIncrease: "$5,200",
      timeToLearn: "2-3 months",
      recommendedCourses: [
        {
          title: "The Complete Node.js Developer Course",
          provider: "Udemy",
          rating: 4.6,
          duration: "35 hours",
          price: "$94.99"
        }
      ],
      description: "JavaScript runtime built on Chrome\'s V8 JavaScript engine for building scalable network applications."
    }
  ];

  // Generate AI skill gap analysis when component mounts or dependencies change
  useEffect(() => {
    const generateAISkillGaps = async () => {
      if (!userProfile || !import.meta.env?.VITE_OPENAI_API_KEY) {
        return;
      }

      setIsLoadingAI(true);
      try {
        const aiResponse = await generateSkillGapAnalysis(userProfile, targetJobs);
        
        if (aiResponse?.skillGaps?.length > 0) {
          // Add IDs to AI skill gaps for React keys
          const enhancedSkillGaps = aiResponse?.skillGaps?.map((gap, index) => ({
            ...gap,
            id: `ai_${index + 1}`,
            isAIGenerated: true
          }));
          setAiSkillGaps(enhancedSkillGaps);
        }
      } catch (error) {
        console.error('Error generating AI skill gaps:', error);
      } finally {
        setIsLoadingAI(false);
      }
    };

    generateAISkillGaps();
  }, [userProfile, targetJobs]);

  const displaySkillGaps = aiSkillGaps?.length > 0 ? aiSkillGaps : (skillGaps?.length > 0 ? skillGaps : mockSkillGaps);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return 'Unknown';
    }
  };

  const toggleExpanded = (skillId) => {
    setExpandedSkill(expandedSkill === skillId ? null : skillId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
            <Icon name="BookOpen" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {aiSkillGaps?.length > 0 ? 'AI Skill Gap Analysis' : 'Skill Gap Analysis'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isLoadingAI ? 'Analyzing your skills...' :
               aiSkillGaps?.length > 0 ? 'Personalized recommendations based on your goals': 'AI-powered recommendations to boost your profile'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isLoadingAI && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewCourses && onViewCourses()}
            iconName="ArrowRight"
            iconPosition="right"
          >
            View All
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {displaySkillGaps?.slice(0, 3)?.map((skillGap) => (
          <div key={skillGap?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
            <div 
              className="cursor-pointer"
              onClick={() => toggleExpanded(skillGap?.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-foreground">{skillGap?.skill}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(skillGap?.priority)}`}>
                      {getPriorityText(skillGap?.priority)}
                    </span>
                    {skillGap?.isAIGenerated && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        AI Analyzed
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{skillGap?.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="TrendingUp" size={16} className="mr-2" />
                      Demand Score: {skillGap?.demandScore}%
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="Briefcase" size={16} className="mr-2" />
                      {skillGap?.jobsRequiring} jobs require this
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="DollarSign" size={16} className="mr-2" />
                      +{skillGap?.averageSalaryIncrease} avg salary
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="Clock" size={16} className="mr-2" />
                      {skillGap?.timeToLearn} to learn
                    </div>
                  </div>
                </div>
                <Icon 
                  name={expandedSkill === skillGap?.id ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-muted-foreground"
                />
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Current Level</span>
                  <span className="text-foreground">{skillGap?.currentLevel}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div 
                    className="bg-muted-foreground h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skillGap?.currentLevel}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Target Level</span>
                  <span className="text-foreground">{skillGap?.targetLevel}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skillGap?.targetLevel}%` }}
                  />
                </div>
              </div>
            </div>

            {expandedSkill === skillGap?.id && (
              <div className="mt-4 pt-4 border-t border-border animate-slide-up">
                <h5 className="font-medium text-foreground mb-3">
                  {skillGap?.isAIGenerated ? 'AI-Curated Courses' : 'Recommended Courses'}
                </h5>
                <div className="space-y-3">
                  {skillGap?.recommendedCourses?.map((course, index) => (
                    <div key={index} className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h6 className="font-medium text-foreground text-sm">{course?.title}</h6>
                          <p className="text-xs text-muted-foreground">{course?.provider}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-foreground">{course?.price}</div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Icon name="Star" size={12} className="mr-1 text-warning" />
                            {course?.rating}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Duration: {course?.duration}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onStartLearning && onStartLearning(skillGap?.id, course)}
                        >
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {expandedSkill !== skillGap?.id && (
              <div className="flex justify-end">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onStartLearning && onStartLearning(skillGap?.id)}
                  iconName="Play"
                  iconPosition="left"
                >
                  Start Learning
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      {displaySkillGaps?.length === 0 && !isLoadingAI && (
        <div className="text-center py-8">
          <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-2">No skill gaps identified</p>
          <p className="text-sm text-muted-foreground">Complete your profile to get personalized recommendations</p>
        </div>
      )}
    </div>
  );
};

export default SkillGapAnalysisCard;