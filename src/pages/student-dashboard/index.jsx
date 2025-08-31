import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProfileCompletionCard from './components/ProfileCompletionCard';
import RecommendedJobsCarousel from './components/RecommendedJobsCarousel';
import ApplicationStatusTracker from './components/ApplicationStatusTracker';
import QuickStatsCards from './components/QuickStatsCards';
import NotificationCenter from './components/NotificationCenter';
import UpcomingInterviewsCard from './components/UpcomingInterviewsCard';
import SkillGapAnalysisCard from './components/SkillGapAnalysisCard';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock user data with enhanced profile for AI
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@university.edu",
      profileCompletion: 75,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      // Enhanced profile for AI integration
      skills: ["React", "JavaScript", "HTML", "CSS", "Git"],
      experience: "Entry level",
      education: "Computer Science - Senior",
      careerGoal: "Frontend Developer",
      experienceLevel: "Entry level",
      preferences: "Remote work preferred, internship opportunities"
    };
    setUser(mockUser);
  }, []);

  // Mock target jobs for skill gap analysis
  const mockTargetJobs = [
    { title: "Frontend Developer", company: "TechCorp" },
    { title: "React Developer", company: "StartupXYZ" },
    { title: "Junior Software Engineer", company: "BigTech Inc" }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const handleUpdateProfile = () => {
    navigate('/student-profile-management');
  };

  const handleBrowseJobs = () => {
    navigate('/job-search-browse');
  };

  const handleQuickApply = (jobId) => {
    navigate(`/job-application-details-apply?jobId=${jobId}`);
  };

  const handleViewJob = (jobId) => {
    navigate(`/job-search-browse?jobId=${jobId}`);
  };

  const handleViewApplication = (applicationId) => {
    if (applicationId === 'all') {
      navigate('/application-tracking');
    } else {
      navigate(`/application-tracking?applicationId=${applicationId}`);
    }
  };

  const handleViewInterview = (interviewId) => {
    if (interviewId === 'all') {
      navigate('/application-tracking?tab=interviews');
    } else {
      navigate(`/application-tracking?interviewId=${interviewId}`);
    }
  };

  const handleJoinInterview = (interviewId, meetingLink) => {
    window.open(meetingLink, '_blank');
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    console.log('Marking notification as read:', notificationId);
  };

  const handleViewAllNotifications = () => {
    navigate('/notifications');
  };

  const handleViewCourses = () => {
    navigate('/skill-development');
  };

  const handleStartLearning = (skillId, course) => {
    if (course) {
      console.log('Starting course:', course?.title);
    } else {
      navigate(`/skill-development?skillId=${skillId}`);
    }
  };

  const handleLogout = () => {
    navigate('/login-registration');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              <span className="text-foreground font-medium">Dashboard</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Student Overview</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Welcome back, {user?.name || 'Student'}! 👋
                </h1>
                <p className="text-muted-foreground mt-1">
                  {import.meta.env?.VITE_OPENAI_API_KEY ? 
                    "AI is analyzing your profile for personalized recommendations" :
                    "Here's what's happening with your job search today"}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={handleRefresh}
                  loading={isRefreshing}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Refresh
                </Button>
                <div className="text-xs text-muted-foreground">
                  Last updated: {lastUpdated?.toLocaleTimeString()}
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                onClick={handleBrowseJobs}
                iconName="Search"
                iconPosition="left"
                className="sm:w-auto"
              >
                Browse Jobs
              </Button>
              <Button
                variant="outline"
                onClick={handleUpdateProfile}
                iconName="User"
                iconPosition="left"
                className="sm:w-auto"
              >
                Update Profile
              </Button>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Completion */}
              <ProfileCompletionCard
                completionPercentage={user?.profileCompletion || 75}
                onUpdateProfile={handleUpdateProfile}
              />

              {/* Quick Stats */}
              <QuickStatsCards />

              {/* Recommended Jobs with AI integration */}
              <RecommendedJobsCarousel
                onQuickApply={handleQuickApply}
                onViewJob={handleViewJob}
                userProfile={user}
              />

              {/* Application Status Tracker */}
              <ApplicationStatusTracker
                onViewApplication={handleViewApplication}
              />

              {/* Notifications */}
              <NotificationCenter
                onMarkAsRead={handleMarkNotificationAsRead}
                onViewAll={handleViewAllNotifications}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Interviews */}
              <UpcomingInterviewsCard
                onViewInterview={handleViewInterview}
                onJoinInterview={handleJoinInterview}
              />

              {/* Skill Gap Analysis with AI integration */}
              <SkillGapAnalysisCard
                onViewCourses={handleViewCourses}
                onStartLearning={handleStartLearning}
                userProfile={user}
                targetJobs={mockTargetJobs}
              />

              {/* Quick Actions Card */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/student-profile-management')}
                    iconName="User"
                    iconPosition="left"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/application-tracking')}
                    iconName="FileText"
                    iconPosition="left"
                  >
                    Track Applications
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/job-search-browse')}
                    iconName="Search"
                    iconPosition="left"
                  >
                    Search Jobs
                  </Button>
                </div>
              </div>

              {/* Help & Support Card */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                    <Icon name="HelpCircle" size={20} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Need Help?</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Get support with your job search, profile optimization, or interview preparation.
                </p>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    fullWidth
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Chat Support
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    iconName="BookOpen"
                    iconPosition="left"
                  >
                    Help Center
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Actions */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={handleBrowseJobs}
                iconName="Search"
                iconPosition="left"
                className="flex-1"
              >
                Browse Jobs
              </Button>
              <Button
                variant="outline"
                onClick={handleUpdateProfile}
                iconName="User"
                iconPosition="left"
                className="flex-1"
              >
                Profile
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;