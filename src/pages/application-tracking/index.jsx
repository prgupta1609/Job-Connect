import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import NotificationToast from '../../components/ui/NotificationToast';
import ApplicationCard from './components/ApplicationCard';
import StatusAnalytics from './components/StatusAnalytics';
import FilterPanel from './components/FilterPanel';
import ApplicationTableView from './components/ApplicationTableView';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ApplicationTracking = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Mock user data
  const user = {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com"
  };

  // Mock applications data
  const mockApplications = [
    {
      id: 1,
      position: "Frontend Developer",
      company: {
        name: "TechCorp Solutions",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&crop=center"
      },
      location: "San Francisco, CA",
      jobType: "Full-time",
      salary: "$80,000 - $100,000",
      status: "interview-scheduled",
      appliedDate: "2025-08-25T10:00:00Z",
      hasNewUpdate: true,
      timeline: [
        {
          action: "Interview scheduled for September 5th",
          date: "2025-08-30T14:30:00Z"
        },
        {
          action: "Application shortlisted",
          date: "2025-08-28T09:15:00Z"
        },
        {
          action: "Application under review",
          date: "2025-08-26T11:20:00Z"
        },
        {
          action: "Application submitted",
          date: "2025-08-25T10:00:00Z"
        }
      ],
      lastMessage: {
        sender: "Sarah Wilson - HR Manager",
        content: "Congratulations! We\'d like to schedule a technical interview with our development team. Please confirm your availability for next week.",
        date: "2025-08-30T14:30:00Z"
      }
    },
    {
      id: 2,
      position: "Software Engineer Intern",
      company: {
        name: "InnovateLabs",
        logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center"
      },
      location: "Remote",
      jobType: "Internship",
      salary: "$25/hour",
      status: "under-review",
      appliedDate: "2025-08-20T15:30:00Z",
      hasNewUpdate: false,
      timeline: [
        {
          action: "Application under review",
          date: "2025-08-22T10:45:00Z"
        },
        {
          action: "Application submitted",
          date: "2025-08-20T15:30:00Z"
        }
      ],
      lastMessage: null
    },
    {
      id: 3,
      position: "UI/UX Designer",
      company: {
        name: "Creative Studios",
        logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=center"
      },
      location: "New York, NY",
      jobType: "Full-time",
      salary: "$70,000 - $85,000",
      status: "shortlisted",
      appliedDate: "2025-08-18T09:00:00Z",
      hasNewUpdate: true,
      timeline: [
        {
          action: "Application shortlisted",
          date: "2025-08-29T16:20:00Z"
        },
        {
          action: "Portfolio reviewed",
          date: "2025-08-24T13:10:00Z"
        },
        {
          action: "Application under review",
          date: "2025-08-19T08:30:00Z"
        },
        {
          action: "Application submitted",
          date: "2025-08-18T09:00:00Z"
        }
      ],
      lastMessage: {
        sender: "Mike Chen - Design Lead",
        content: "We were impressed with your portfolio! We\'d like to move forward with the next stage of the interview process.",
        date: "2025-08-29T16:20:00Z"
      }
    },
    {
      id: 4,
      position: "Data Analyst",
      company: {
        name: "DataFlow Inc",
        logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=center"
      },
      location: "Chicago, IL",
      jobType: "Full-time",
      salary: "$65,000 - $75,000",
      status: "rejected",
      appliedDate: "2025-08-15T14:20:00Z",
      hasNewUpdate: false,
      timeline: [
        {
          action: "Application rejected",
          date: "2025-08-28T11:00:00Z"
        },
        {
          action: "Technical assessment completed",
          date: "2025-08-22T16:45:00Z"
        },
        {
          action: "Application under review",
          date: "2025-08-17T10:15:00Z"
        },
        {
          action: "Application submitted",
          date: "2025-08-15T14:20:00Z"
        }
      ],
      lastMessage: {
        sender: "Jennifer Adams - Talent Acquisition",
        content: "Thank you for your interest in the Data Analyst position. While your qualifications are impressive, we've decided to move forward with another candidate.",
        date: "2025-08-28T11:00:00Z"
      }
    },
    {
      id: 5,
      position: "Product Manager",
      company: {
        name: "NextGen Products",
        logo: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=100&h=100&fit=crop&crop=center"
      },
      location: "Austin, TX",
      jobType: "Full-time",
      salary: "$90,000 - $110,000",
      status: "offer-received",
      appliedDate: "2025-08-10T11:30:00Z",
      hasNewUpdate: true,
      timeline: [
        {
          action: "Job offer received",
          date: "2025-08-30T10:00:00Z"
        },
        {
          action: "Final interview completed",
          date: "2025-08-27T15:30:00Z"
        },
        {
          action: "Second interview scheduled",
          date: "2025-08-23T09:45:00Z"
        },
        {
          action: "First interview completed",
          date: "2025-08-20T14:00:00Z"
        },
        {
          action: "Application shortlisted",
          date: "2025-08-15T12:20:00Z"
        },
        {
          action: "Application submitted",
          date: "2025-08-10T11:30:00Z"
        }
      ],
      lastMessage: {
        sender: "Robert Kim - VP of Product",
        content: "We\'re excited to extend an offer for the Product Manager position! Please review the attached offer letter and let us know your decision by September 5th.",
        date: "2025-08-30T10:00:00Z"
      }
    },
    {
      id: 6,
      position: "Marketing Coordinator",
      company: {
        name: "BrandBoost Agency",
        logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop&crop=center"
      },
      location: "Los Angeles, CA",
      jobType: "Full-time",
      salary: "$50,000 - $60,000",
      status: "submitted",
      appliedDate: "2025-08-28T16:45:00Z",
      hasNewUpdate: false,
      timeline: [
        {
          action: "Application submitted",
          date: "2025-08-28T16:45:00Z"
        }
      ],
      lastMessage: null
    }
  ];

  // Mock analytics data
  const mockAnalytics = {
    totalApplications: 6,
    successRate: 67,
    avgResponseTime: "5 days",
    monthlyGrowth: 3,
    statusBreakdown: [
      { status: 'submitted', count: 1, percentage: 17 },
      { status: 'under-review', count: 1, percentage: 17 },
      { status: 'shortlisted', count: 1, percentage: 17 },
      { status: 'interview-scheduled', count: 1, percentage: 17 },
      { status: 'offer-received', count: 1, percentage: 17 },
      { status: 'rejected', count: 1, percentage: 17 }
    ]
  };

  const [applications, setApplications] = useState(mockApplications);
  const [analytics, setAnalytics] = useState(mockAnalytics);

  // Filter applications based on current filters and search
  const filteredApplications = applications?.filter(app => {
    // Search filter
    if (searchValue) {
      const searchLower = searchValue?.toLowerCase();
      if (!app?.company?.name?.toLowerCase()?.includes(searchLower) && 
          !app?.position?.toLowerCase()?.includes(searchLower)) {
        return false;
      }
    }

    // Status filter
    if (filters?.status && app?.status !== filters?.status) {
      return false;
    }

    // Job type filter
    if (filters?.jobType && app?.jobType?.toLowerCase() !== filters?.jobType) {
      return false;
    }

    // Quick filters
    if (filters?.quickFilter) {
      switch (filters?.quickFilter) {
        case 'active':
          return ['submitted', 'under-review', 'shortlisted', 'interview-scheduled']?.includes(app?.status);
        case 'interview-pending':
          return app?.status === 'interview-scheduled';
        case 'recent':
          const weekAgo = new Date();
          weekAgo?.setDate(weekAgo?.getDate() - 7);
          return new Date(app.appliedDate) > weekAgo;
        case 'offers':
          return app?.status === 'offer-received';
        default:
          return true;
      }
    }

    return true;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchValue('');
  };

  const handleWithdraw = (applicationId) => {
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'info',
      title: 'Application Withdrawn',
      message: 'Your application has been successfully withdrawn.',
      timestamp: new Date()
    }]);
  };

  const handleFollowUp = (applicationId) => {
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      title: 'Follow-up Sent',
      message: 'Your follow-up message has been sent to the recruiter.',
      timestamp: new Date()
    }]);
  };

  const handleScheduleInterview = (applicationId) => {
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'info',
      title: 'Interview Scheduling',
      message: 'Redirecting to interview scheduling page...',
      timestamp: new Date()
    }]);
  };

  const handleLogout = () => {
    navigate('/login-registration');
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev?.filter(notification => notification?.id !== id));
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Randomly update application status or add notifications
      if (Math.random() > 0.95) {
        setNotifications(prev => [...prev, {
          id: Date.now(),
          type: 'info',
          title: 'Status Update',
          message: 'One of your applications has been updated.',
          timestamp: new Date()
        }]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <div className="pt-16">
        <ContextualActionBar
          context="application-tracking"
          filters={filters}
          onFilterChange={handleFilterChange}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          actions={[
            {
              label: 'New Application',
              icon: 'Plus',
              variant: 'default',
              onClick: () => navigate('/job-search-browse')
            }
          ]}
        />

        <div className="px-4 lg:px-6 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <button 
              onClick={() => navigate('/student-dashboard')}
              className="hover:text-foreground transition-colors"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">Application Tracking</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Application Tracking</h1>
                  <p className="text-muted-foreground">
                    Monitor your job applications and stay updated on their progress
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'cards' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('cards')}
                    iconName="Grid3X3"
                  />
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    iconName="List"
                  />
                </div>
              </div>

              {/* Filter Panel */}
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                isExpanded={isFilterExpanded}
                onToggleExpanded={() => setIsFilterExpanded(!isFilterExpanded)}
              />

              {/* Applications List */}
              {filteredApplications?.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Briefcase" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No applications found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchValue || Object.keys(filters)?.length > 0 
                      ? "Try adjusting your filters or search terms" :"Start applying to jobs to track your applications here"
                    }
                  </p>
                  <Button
                    variant="default"
                    onClick={() => navigate('/job-search-browse')}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Browse Jobs
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredApplications?.length} of {applications?.length} applications
                    </p>
                  </div>

                  {viewMode === 'cards' ? (
                    <div className="space-y-4">
                      {filteredApplications?.map((application) => (
                        <ApplicationCard
                          key={application?.id}
                          application={application}
                          onWithdraw={handleWithdraw}
                          onFollowUp={handleFollowUp}
                          onScheduleInterview={handleScheduleInterview}
                        />
                      ))}
                    </div>
                  ) : (
                    <ApplicationTableView
                      applications={filteredApplications}
                      onWithdraw={handleWithdraw}
                      onFollowUp={handleFollowUp}
                      onScheduleInterview={handleScheduleInterview}
                      onSelectApplication={setSelectedApplication}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <StatusAnalytics analytics={analytics} />

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/job-search-browse')}
                    iconName="Search"
                    iconPosition="left"
                  >
                    Find New Jobs
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/student-profile-management')}
                    iconName="User"
                    iconPosition="left"
                  >
                    Update Profile
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Download"
                    iconPosition="left"
                  >
                    Export Report
                  </Button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Job offer received from NextGen Products</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Interview scheduled with TechCorp Solutions</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Application shortlisted at Creative Studios</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotificationToast
        notifications={notifications}
        onDismiss={handleDismissNotification}
        position="top-right"
      />
    </div>
  );
};

export default ApplicationTracking;