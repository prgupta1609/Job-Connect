import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NotificationToast from '../../components/ui/NotificationToast';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PersonalInfoTab from './components/PersonalInfoTab';
import EducationTab from './components/EducationTab';
import ExperienceTab from './components/ExperienceTab';
import SkillsTab from './components/SkillsTab';
import ResumeTab from './components/ResumeTab';
import ProfilePreview from './components/ProfilePreview';
import ProfileProgressBar from './components/ProfileProgressBar';

const StudentProfileManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock user data
  const [user] = useState({
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu'
  });

  // Profile data state
  const [profileData, setProfileData] = useState({
    // Personal Info
    profileImage: '',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '2001-03-15',
    gender: 'prefer-not-to-say',
    address1: '123 University Ave',
    address2: 'Apt 4B',
    city: 'Boston',
    state: 'Massachusetts',
    zipCode: '02115',
    country: 'us',
    summary: `Computer Science student with a passion for full-stack development and machine learning. Experienced in React, Node.js, and Python. Looking for internship opportunities to apply my skills in real-world projects.`,
    linkedinUrl: 'https://linkedin.com/in/alexjohnson',
    portfolioUrl: 'https://alexjohnson.dev',
    githubUrl: 'https://github.com/alexjohnson',

    // Education
    education: [
      {
        id: 1,
        institution: 'Massachusetts Institute of Technology',
        degree: 'bachelor',
        fieldOfStudy: 'computer-science',
        startDate: '2020-09',
        endDate: '2024-05',
        gpa: '3.8',
        description: `Relevant coursework: Data Structures, Algorithms, Machine Learning, Database Systems, Software Engineering.\n\nAchievements: Dean's List (Fall 2022, Spring 2023), Member of Computer Science Honor Society.`,
        isCurrentlyStudying: true
      }
    ],
    certifications: 'AWS Certified Developer Associate, Google Analytics Certified',languages: 'English (Native), Spanish (Intermediate), Mandarin (Beginner)',

    // Experience
    experience: [
      {
        id: 1,
        company: 'TechStart Solutions',position: 'Software Development Intern',jobType: 'internship',industry: 'technology',location: 'Boston, MA',startDate: '2023-06',endDate: '2023-08',
        description: `Developed and maintained web applications using React.js and Node.js.\nCollaborated with senior developers on feature implementation and bug fixes.\nParticipated in daily standups and sprint planning meetings.\nWorked with RESTful APIs and database integration.`,
        achievements: `Successfully delivered 3 major features ahead of schedule.\nImproved application performance by 25% through code optimization.\nReceived positive feedback from team lead for problem-solving skills.`,
        isCurrentPosition: false
      }
    ],
    projects: `Personal Portfolio Website: Built with React and deployed on Netlify, showcasing my projects and skills.\n\nTask Management App: Full-stack application using MERN stack with user authentication and real-time updates.\n\nMachine Learning Price Predictor: Python-based model using scikit-learn to predict housing prices with 85% accuracy.`,
    volunteerWork: `Code for Good Volunteer: Teaching programming basics to underprivileged students.\nUniversity Peer Tutor: Helping fellow students with computer science coursework.`,

    // Skills
    skills: [
      { id: 1, name: 'JavaScript', category: 'programming', proficiency: 'advanced' },
      { id: 2, name: 'Python', category: 'programming', proficiency: 'advanced' },
      { id: 3, name: 'React', category: 'frameworks', proficiency: 'advanced' },
      { id: 4, name: 'Node.js', category: 'frameworks', proficiency: 'intermediate' },
      { id: 5, name: 'HTML/CSS', category: 'technical', proficiency: 'advanced' },
      { id: 6, name: 'SQL', category: 'technical', proficiency: 'intermediate' },
      { id: 7, name: 'Git', category: 'tools', proficiency: 'advanced' },
      { id: 8, name: 'AWS', category: 'tools', proficiency: 'beginner' },
      { id: 9, name: 'Problem Solving', category: 'soft', proficiency: 'advanced' },
      { id: 10, name: 'Team Collaboration', category: 'soft', proficiency: 'advanced' }
    ],
    skillsToImprove: 'Cloud computing (AWS, Azure), DevOps practices, System design, Advanced algorithms',learningGoals: 'Master cloud technologies, contribute to open-source projects, develop leadership skills through team projects',

    // Resume
    resumeFile: null,
    resumeUrl: '',resumeFileName: 'Alex_Johnson_Resume.pdf',resumeFileSize: 245760,resumeUploadDate: '2024-08-25T10:30:00Z'
  });

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'experience', label: 'Experience', icon: 'Briefcase' },
    { id: 'skills', label: 'Skills', icon: 'Target' },
    { id: 'resume', label: 'Resume', icon: 'FileText' }
  ];

  // Calculate completion percentage
  const calculateCompletionPercentage = () => {
    let completed = 0;
    let total = 0;

    // Personal Info (25%)
    total += 25;
    let personalScore = 0;
    if (profileData?.firstName && profileData?.lastName) personalScore += 5;
    if (profileData?.email) personalScore += 5;
    if (profileData?.phone) personalScore += 3;
    if (profileData?.summary) personalScore += 7;
    if (profileData?.profileImage) personalScore += 5;
    completed += Math.min(personalScore, 25);

    // Education (20%)
    total += 20;
    if (profileData?.education && profileData?.education?.length > 0) {
      completed += 20;
    }

    // Experience (20%)
    total += 20;
    if (profileData?.experience && profileData?.experience?.length > 0) {
      completed += 20;
    }

    // Skills (20%)
    total += 20;
    if (profileData?.skills && profileData?.skills?.length >= 5) {
      completed += 20;
    } else if (profileData?.skills && profileData?.skills?.length > 0) {
      completed += 10;
    }

    // Resume (15%)
    total += 15;
    if (profileData?.resumeFileName) {
      completed += 15;
    }

    return Math.round((completed / total) * 100);
  };

  const completionPercentage = calculateCompletionPercentage();
  const completedSections = tabs?.filter(tab => {
    switch (tab?.id) {
      case 'personal':
        return profileData?.firstName && profileData?.lastName && profileData?.email && profileData?.summary;
      case 'education':
        return profileData?.education && profileData?.education?.length > 0;
      case 'experience':
        return profileData?.experience && profileData?.experience?.length > 0;
      case 'skills':
        return profileData?.skills && profileData?.skills?.length >= 3;
      case 'resume':
        return profileData?.resumeFileName;
      default:
        return false;
    }
  })?.length;

  const handleDataChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setHasUnsavedChanges(false);
      
      // Show success notification
      const notification = {
        id: Date.now(),
        type: 'success',
        title: 'Profile Saved',
        message: 'Your profile has been successfully updated!',
        timestamp: new Date()
      };
      
      setNotifications([notification]);
      
    } catch (error) {
      // Show error notification
      const notification = {
        id: Date.now(),
        type: 'error',
        title: 'Save Failed',
        message: 'Failed to save your profile. Please try again.',
        timestamp: new Date()
      };
      
      setNotifications([notification]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    navigate('/login-registration');
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev?.filter(notification => notification?.id !== id));
  };

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const autoSaveTimer = setTimeout(() => {
        handleSave();
      }, 30000); // Auto-save after 30 seconds of inactivity

      return () => clearTimeout(autoSaveTimer);
    }
  }, [hasUnsavedChanges, profileData]);

  // Warn about unsaved changes before leaving
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e?.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoTab
            data={profileData}
            onChange={handleDataChange}
            onSave={handleSave}
            isLoading={isLoading}
          />
        );
      case 'education':
        return (
          <EducationTab
            data={profileData}
            onChange={handleDataChange}
            onSave={handleSave}
            isLoading={isLoading}
          />
        );
      case 'experience':
        return (
          <ExperienceTab
            data={profileData}
            onChange={handleDataChange}
            onSave={handleSave}
            isLoading={isLoading}
          />
        );
      case 'skills':
        return (
          <SkillsTab
            data={profileData}
            onChange={handleDataChange}
            onSave={handleSave}
            isLoading={isLoading}
          />
        );
      case 'resume':
        return (
          <ResumeTab
            data={profileData}
            onChange={handleDataChange}
            onSave={handleSave}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <button
              onClick={() => navigate('/student-dashboard')}
              className="hover:text-foreground transition-colors"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">Profile Management</span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Profile Management
              </h1>
              <p className="text-muted-foreground">
                Complete your profile to increase your visibility to employers
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              {hasUnsavedChanges && (
                <div className="flex items-center space-x-2 text-warning">
                  <Icon name="AlertCircle" size={16} />
                  <span className="text-sm">Unsaved changes</span>
                </div>
              )}
              <Button
                onClick={handleSave}
                loading={isLoading}
                disabled={!hasUnsavedChanges}
                iconName="Save"
                iconPosition="left"
              >
                Save All Changes
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <ProfileProgressBar
            completionPercentage={completionPercentage}
            completedSections={completedSections}
            totalSections={tabs?.length}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tab Navigation */}
              <div className="bg-card rounded-lg border border-border mb-6">
                <div className="flex overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                      {/* Completion indicator */}
                      {(() => {
                        let isCompleted = false;
                        switch (tab?.id) {
                          case 'personal':
                            isCompleted = profileData?.firstName && profileData?.lastName && profileData?.email && profileData?.summary;
                            break;
                          case 'education':
                            isCompleted = profileData?.education && profileData?.education?.length > 0;
                            break;
                          case 'experience':
                            isCompleted = profileData?.experience && profileData?.experience?.length > 0;
                            break;
                          case 'skills':
                            isCompleted = profileData?.skills && profileData?.skills?.length >= 3;
                            break;
                          case 'resume':
                            isCompleted = profileData?.resumeFileName;
                            break;
                        }
                        return isCompleted && (
                          <Icon name="CheckCircle" size={14} className="text-success" />
                        );
                      })()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="animate-fade-in">
                {renderTabContent()}
              </div>
            </div>

            {/* Sidebar - Profile Preview */}
            <div className="lg:col-span-1">
              <ProfilePreview
                data={profileData}
                completionPercentage={completionPercentage}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Notifications */}
      <NotificationToast
        notifications={notifications}
        onDismiss={dismissNotification}
        position="top-right"
        autoHideDuration={5000}
      />
    </div>
  );
};

export default StudentProfileManagement;