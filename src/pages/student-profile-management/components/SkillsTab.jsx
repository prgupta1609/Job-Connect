import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SkillsTab = ({ data, onChange, onSave, isLoading }) => {
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(data?.skills || []);

  const skillCategories = [
    { value: 'technical', label: 'Technical Skills' },
    { value: 'programming', label: 'Programming Languages' },
    { value: 'frameworks', label: 'Frameworks & Libraries' },
    { value: 'tools', label: 'Tools & Software' },
    { value: 'soft', label: 'Soft Skills' },
    { value: 'languages', label: 'Languages' },
    { value: 'other', label: 'Other' }
  ];

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const suggestedSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML/CSS', 'SQL', 'Git',
    'AWS', 'Docker', 'MongoDB', 'Express.js', 'TypeScript', 'Angular', 'Vue.js',
    'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Kotlin', 'Swift', 'Flutter', 'React Native',
    'Machine Learning', 'Data Analysis', 'UI/UX Design', 'Project Management',
    'Communication', 'Leadership', 'Problem Solving', 'Team Collaboration',
    'Critical Thinking', 'Time Management', 'Adaptability', 'Creativity'
  ];

  const addSkill = () => {
    if (skillInput?.trim() && !skills?.find(skill => skill?.name?.toLowerCase() === skillInput?.toLowerCase())) {
      const newSkill = {
        id: Date.now(),
        name: skillInput?.trim(),
        category: 'technical',
        proficiency: 'intermediate'
      };
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      onChange('skills', updatedSkills);
      setSkillInput('');
    }
  };

  const addSuggestedSkill = (skillName) => {
    if (!skills?.find(skill => skill?.name?.toLowerCase() === skillName?.toLowerCase())) {
      const newSkill = {
        id: Date.now(),
        name: skillName,
        category: 'technical',
        proficiency: 'intermediate'
      };
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      onChange('skills', updatedSkills);
    }
  };

  const removeSkill = (id) => {
    const updatedSkills = skills?.filter(skill => skill?.id !== id);
    setSkills(updatedSkills);
    onChange('skills', updatedSkills);
  };

  const updateSkill = (id, field, value) => {
    const updatedSkills = skills?.map(skill =>
      skill?.id === id ? { ...skill, [field]: value } : skill
    );
    setSkills(updatedSkills);
    onChange('skills', updatedSkills);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      e?.preventDefault();
      addSkill();
    }
  };

  const getProficiencyColor = (proficiency) => {
    switch (proficiency) {
      case 'beginner':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'advanced':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'expert':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc?.[skill?.category]) {
      acc[skill.category] = [];
    }
    acc?.[skill?.category]?.push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Skills & Expertise</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Add your technical and soft skills to help employers find you
        </p>
      </div>
      {/* Add Skills Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Add New Skill</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter a skill (e.g., JavaScript, Leadership)"
              value={skillInput}
              onChange={(e) => setSkillInput(e?.target?.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Button
            onClick={addSkill}
            disabled={!skillInput?.trim()}
            iconName="Plus"
            iconPosition="left"
          >
            Add Skill
          </Button>
        </div>
      </div>
      {/* Suggested Skills */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Suggested Skills</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Click on any skill below to add it to your profile
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills?.filter(skillName => !skills?.find(skill => skill?.name?.toLowerCase() === skillName?.toLowerCase()))?.slice(0, 20)?.map((skillName) => (
              <button
                key={skillName}
                onClick={() => addSuggestedSkill(skillName)}
                className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                + {skillName}
              </button>
            ))}
        </div>
      </div>
      {/* Current Skills */}
      {skills?.length > 0 ? (
        <div className="space-y-6">
          {skillCategories?.map(category => {
            const categorySkills = groupedSkills?.[category?.value] || [];
            if (categorySkills?.length === 0) return null;

            return (
              <div key={category?.value} className="bg-card rounded-lg border border-border p-6">
                <h4 className="text-md font-medium text-foreground mb-4">{category?.label}</h4>
                <div className="space-y-3">
                  {categorySkills?.map((skill) => (
                    <div key={skill?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3 flex-1">
                        <span className="font-medium text-foreground">{skill?.name}</span>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getProficiencyColor(skill?.proficiency)}`}>
                          {skill?.proficiency}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select
                          options={skillCategories}
                          value={skill?.category}
                          onChange={(value) => updateSkill(skill?.id, 'category', value)}
                          className="w-32"
                        />
                        <Select
                          options={proficiencyLevels}
                          value={skill?.proficiency}
                          onChange={(value) => updateSkill(skill?.id, 'proficiency', value)}
                          className="w-32"
                        />
                        <Button
                          onClick={() => removeSkill(skill?.id)}
                          variant="ghost"
                          size="sm"
                          iconName="X"
                          className="text-error hover:text-error hover:bg-error/10"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <Icon name="Target" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Skills Added</h4>
          <p className="text-muted-foreground mb-4">
            Start adding your skills to showcase your expertise to potential employers
          </p>
        </div>
      )}
      {/* Skill Assessment */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Skill Assessment</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Areas for Improvement
            </label>
            <textarea
              className="w-full min-h-[100px] px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              placeholder="What skills would you like to improve or learn next?"
              value={data?.skillsToImprove || ''}
              onChange={(e) => onChange('skillsToImprove', e?.target?.value)}
              maxLength={300}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {(data?.skillsToImprove || '')?.length}/300 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Learning Goals
            </label>
            <textarea
              className="w-full min-h-[100px] px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              placeholder="What are your learning goals for the next 6-12 months?"
              value={data?.learningGoals || ''}
              onChange={(e) => onChange('learningGoals', e?.target?.value)}
              maxLength={300}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {(data?.learningGoals || '')?.length}/300 characters
            </p>
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={onSave}
          loading={isLoading}
          iconName="Save"
          iconPosition="left"
        >
          Save Skills Information
        </Button>
      </div>
    </div>
  );
};

export default SkillsTab;