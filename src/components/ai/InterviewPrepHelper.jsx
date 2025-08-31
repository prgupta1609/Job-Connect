import React, { useState } from 'react';
import Button from '../ui/Button';
import Icon from '../AppIcon';
import { generateInterviewQuestions } from '../../services/openaiService';

const InterviewPrepHelper = ({ jobDetails, userProfile }) => {
  const [questions, setQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedJob, setSelectedJob] = useState(jobDetails || null);

  const mockJobOptions = [
    { id: 1, title: 'Frontend Developer', company: 'TechCorp', skills: ['React', 'JavaScript', 'CSS'] },
    { id: 2, title: 'Backend Developer', company: 'DataSoft', skills: ['Node.js', 'Python', 'SQL'] },
    { id: 3, title: 'Full Stack Developer', company: 'StartupXYZ', skills: ['React', 'Node.js', 'MongoDB'] },
  ];

  const handleGenerateQuestions = async () => {
    if (!selectedJob || !import.meta.env?.VITE_OPENAI_API_KEY) {
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateInterviewQuestions(selectedJob, userProfile);
      setQuestions(result?.questions || []);
    } catch (error) {
      console.error('Error generating interview questions:', error);
      setQuestions([]);
    } finally {
      setIsGenerating(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'technical': return 'Code';
      case 'behavioral': return 'Users';
      case 'situational': return 'MessageSquare';
      case 'problem-solving': return 'Lightbulb';
      default: return 'HelpCircle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
            <Icon name="MessageSquare" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Interview Prep</h3>
            <p className="text-sm text-muted-foreground">Practice with personalized questions</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {!jobDetails && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Job Position
            </label>
            <select
              value={selectedJob?.id || ''}
              onChange={(e) => {
                const job = mockJobOptions?.find(j => j?.id === parseInt(e?.target?.value));
                setSelectedJob(job);
              }}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
            >
              <option value="">Choose a position...</option>
              {mockJobOptions?.map((job) => (
                <option key={job?.id} value={job?.id}>
                  {job?.title} at {job?.company}
                </option>
              ))}
            </select>
          </div>
        )}

        <Button
          variant="default"
          onClick={handleGenerateQuestions}
          loading={isGenerating}
          disabled={!selectedJob || !import.meta.env?.VITE_OPENAI_API_KEY}
          iconName="Sparkles"
          iconPosition="left"
          fullWidth
        >
          {isGenerating ? 'Generating Questions...' : 'Generate Interview Questions'}
        </Button>

        {!import.meta.env?.VITE_OPENAI_API_KEY && (
          <p className="text-xs text-muted-foreground text-center">
            OpenAI API key required for interview question generation
          </p>
        )}

        {selectedJob && (
          <div className="bg-muted/30 rounded-lg p-3">
            <h4 className="font-medium text-foreground mb-1">{selectedJob?.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">{selectedJob?.company}</p>
            <div className="flex flex-wrap gap-1">
              {selectedJob?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary text-xs px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {questions?.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Generated Questions</h4>
            {questions?.map((q, index) => (
              <div key={index} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={getCategoryIcon(q?.category)} size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">{q?.category}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(q?.difficulty)}`}>
                      {q?.difficulty}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">#{index + 1}</span>
                </div>
                <p className="text-sm text-foreground">{q?.question}</p>
              </div>
            ))}
            
            <div className="flex space-x-2">
              <Button variant="outline" fullWidth iconName="RefreshCw" onClick={handleGenerateQuestions}>
                Generate More
              </Button>
              <Button variant="default" fullWidth iconName="Play">
                Start Practice
              </Button>
            </div>
          </div>
        )}

        {questions?.length === 0 && !isGenerating && selectedJob && (
          <div className="text-center py-4">
            <Icon name="MessageSquare" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Click "Generate Interview Questions" to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPrepHelper;