import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const JobOverview = ({ job }) => {
  const [expandedSections, setExpandedSections] = useState({
    description: false,
    requirements: false,
    benefits: false,
    culture: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const ExpandableSection = ({ title, content, sectionKey, icon, defaultExpanded = false }) => {
    const isExpanded = expandedSections?.[sectionKey] || defaultExpanded;
    const shouldTruncate = content?.length > 300;
    const displayContent = shouldTruncate && !isExpanded 
      ? content?.substring(0, 300) + '...' 
      : content;

    return (
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon name={icon} size={18} className="text-primary" />
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>
          {shouldTruncate && (
            <button
              onClick={() => toggleSection(sectionKey)}
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </button>
          )}
        </div>
        
        <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
          {displayContent}
        </div>
        
        {shouldTruncate && !isExpanded && (
          <button
            onClick={() => toggleSection(sectionKey)}
            className="mt-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
          >
            Read more
          </button>
        )}
      </div>
    );
  };

  const SkillsList = ({ skills, title, icon }) => (
    <div className="border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon name={icon} size={18} className="text-primary" />
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills?.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <Icon name="Calendar" size={20} className="text-primary mx-auto mb-2" />
          <div className="text-sm text-muted-foreground">Experience</div>
          <div className="font-semibold text-foreground">{job?.experience} level</div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <Icon name="GraduationCap" size={20} className="text-primary mx-auto mb-2" />
          <div className="text-sm text-muted-foreground">Education</div>
          <div className="font-semibold text-foreground">{job?.education}</div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <Icon name="Building2" size={20} className="text-primary mx-auto mb-2" />
          <div className="text-sm text-muted-foreground">Department</div>
          <div className="font-semibold text-foreground">{job?.department}</div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <Icon name="Users" size={20} className="text-primary mx-auto mb-2" />
          <div className="text-sm text-muted-foreground">Team Size</div>
          <div className="font-semibold text-foreground">{job?.teamSize}</div>
        </div>
      </div>
      {/* Job Description */}
      <ExpandableSection
        title="Job Description"
        content={job?.description}
        sectionKey="description"
        icon="FileText"
        defaultExpanded={true}
      />
      {/* Requirements */}
      {job?.requirements && (
        <ExpandableSection
          title="Requirements"
          content={job?.requirements}
          sectionKey="requirements"
          icon="CheckCircle"
        />
      )}
      {/* Skills */}
      {job?.skills && job?.skills?.length > 0 && (
        <SkillsList
          skills={job?.skills}
          title="Required Skills"
          icon="Code"
        />
      )}
      {/* Preferred Skills */}
      {job?.preferredSkills && job?.preferredSkills?.length > 0 && (
        <SkillsList
          skills={job?.preferredSkills}
          title="Preferred Skills"
          icon="Star"
        />
      )}
      {/* Benefits */}
      {job?.benefits && (
        <ExpandableSection
          title="Benefits & Perks"
          content={job?.benefits}
          sectionKey="benefits"
          icon="Gift"
        />
      )}
      {/* Company Culture */}
      {job?.company?.culture && (
        <ExpandableSection
          title="Company Culture"
          content={job?.company?.culture}
          sectionKey="culture"
          icon="Heart"
        />
      )}
      {/* Company Info */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Building" size={18} className="text-primary" />
          <h3 className="font-semibold text-foreground">About {job?.company?.name}</h3>
        </div>
        
        <div className="space-y-3">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {job?.company?.description}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-border">
            <div>
              <div className="text-xs text-muted-foreground">Industry</div>
              <div className="text-sm font-medium text-foreground">{job?.company?.industry}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Size</div>
              <div className="text-sm font-medium text-foreground">{job?.company?.size}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Founded</div>
              <div className="text-sm font-medium text-foreground">{job?.company?.founded}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Location</div>
              <div className="text-sm font-medium text-foreground">{job?.company?.headquarters}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOverview;