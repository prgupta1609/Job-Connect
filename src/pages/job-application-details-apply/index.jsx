import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import NotificationToast from '../../components/ui/NotificationToast';
import JobHeader from './components/JobHeader';
import JobOverview from './components/JobOverview';
import SmartMatchingIndicator from './components/SmartMatchingIndicator';
import ApplicationForm from './components/ApplicationForm';
import SimilarJobs from './components/SimilarJobs';
import ApplicationPreview from './components/ApplicationPreview';
import SocialProof from './components/SocialProof';

const JobApplicationDetailsApply = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [user] = useState({
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com"
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasApplied, setHasApplied] = useState(false);

  // Mock job data
  const jobData = {
    id: "job-001",
    title: "Frontend Developer",
    company: {
      name: "TechCorp Solutions",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&crop=center",
      verified: true,
      description: `TechCorp Solutions is a leading technology company specializing in innovative software solutions for businesses worldwide. We pride ourselves on creating cutting-edge applications that transform how companies operate and serve their customers.\n\nFounded in 2015, we've grown from a small startup to a global company with over 500 employees across multiple continents. Our mission is to democratize technology and make powerful software accessible to businesses of all sizes.`,
      industry: "Technology",
      size: "500-1000 employees",
      founded: "2015",
      headquarters: "San Francisco, CA",
      culture: `At TechCorp, we believe in fostering a culture of innovation, collaboration, and continuous learning. Our team is passionate about technology and committed to delivering exceptional results.\n\nWe offer flexible working arrangements, encourage professional development, and maintain an inclusive environment where every voice is heard. Our open office design promotes collaboration, while quiet spaces ensure focused work when needed.\n\nWe celebrate diversity and believe that different perspectives make us stronger. Regular team building activities, hackathons, and learning sessions keep our culture vibrant and engaging.`
    },
    type: "Full-time",
    location: "San Francisco, CA",
    locationType: "Hybrid",
    experience: "Mid",
    education: "Bachelor\'s degree",
    department: "Engineering",
    teamSize: "8-12 people",
    salary: {
      min: 80000,
      max: 120000,
      period: "year"
    },
    postedDate: "2 days ago",
    deadline: "December 15, 2024",
    applicants: 47,
    urgent: false,
    description: `We are seeking a talented Frontend Developer to join our dynamic engineering team. You will be responsible for creating exceptional user experiences and implementing cutting-edge web technologies.\n\nAs a Frontend Developer at TechCorp, you'll work closely with our design and backend teams to build responsive, accessible, and performant web applications. You'll have the opportunity to work on diverse projects ranging from customer-facing applications to internal tools.\n\nThis role offers excellent growth opportunities and the chance to work with the latest technologies in a collaborative environment. You'll be mentored by senior developers and have access to continuous learning resources.`,
    requirements: `• 3+ years of experience in frontend development\n• Proficiency in React.js and modern JavaScript (ES6+)\n• Strong understanding of HTML5, CSS3, and responsive design\n• Experience with state management libraries (Redux, Context API)\n• Knowledge of version control systems (Git)\n• Understanding of RESTful APIs and asynchronous programming\n• Experience with testing frameworks (Jest, React Testing Library)\n• Familiarity with build tools and bundlers (Webpack, Vite)\n• Strong problem-solving skills and attention to detail\n• Excellent communication and teamwork abilities`,
    skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Redux", "Git", "REST APIs", "Jest"],
    preferredSkills: ["TypeScript", "Next.js", "GraphQL", "Docker", "AWS", "Figma"],
    benefits: `• Competitive salary with performance bonuses\n• Comprehensive health, dental, and vision insurance\n• 401(k) retirement plan with company matching\n• Flexible working hours and remote work options\n• Professional development budget ($2,000/year)\n• Unlimited PTO policy\n• Modern equipment and home office setup allowance\n• Free meals and snacks in the office\n• Gym membership reimbursement\n• Stock options and equity participation\n• Parental leave and family support programs\n• Mental health and wellness resources`
  };

  // Mock user resumes
  const userResumes = [
    {
      id: "resume-001",
      name: "Alex_Johnson_Resume_2024",
      type: "Technical",
      lastModified: "Nov 28, 2024",
      isDefault: true
    },
    {
      id: "resume-002", 
      name: "Alex_Johnson_Creative_Resume",
      type: "Creative",
      lastModified: "Nov 25, 2024",
      isDefault: false
    }
  ];

  // Mock similar jobs
  const similarJobs = [
    {
      id: "job-002",
      title: "React Developer",
      company: {
        name: "StartupXYZ",
        logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center",
        verified: false
      },
      type: "Full-time",
      location: "Remote",
      locationType: "Remote",
      salary: { min: 70000, max: 100000 },
      postedDate: "1 day ago",
      urgent: true,
      matchPercentage: 85
    },
    {
      id: "job-003",
      title: "UI/UX Developer",
      company: {
        name: "DesignCo",
        logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=center",
        verified: true
      },
      type: "Contract",
      location: "New York, NY",
      locationType: "Hybrid",
      salary: { min: 60000, max: 90000 },
      postedDate: "3 days ago",
      urgent: false,
      matchPercentage: 78
    }
  ];

  // Mock smart matching data
  const smartMatchingData = {
    matchPercentage: 87,
    strengths: [
      "Strong React.js experience (4+ years)",
      "Proficient in modern JavaScript and ES6+",
      "Experience with Redux and state management",
      "Solid understanding of responsive design",
      "Previous work with REST APIs"
    ],
    skillGaps: [
      {
        skill: "TypeScript experience",
        suggestion: "Highlight any TypeScript projects or mention willingness to learn"
      },
      {
        skill: "Testing experience",
        suggestion: "Emphasize any unit testing or QA experience you have"
      }
    ]
  };

  // Mock social proof data
  const socialProofData = {
    applicationCount: 47,
    companyRating: {
      overall: 4.3,
      reviewCount: 127,
      workLife: 4.1,
      career: 4.5,
      compensation: 4.2
    },
    employeeReviews: [
      {
        rating: 5,
        comment: "Great company culture and excellent growth opportunities. The team is very supportive and management truly cares about employee development.",
        position: "Senior Developer",
        department: "Engineering",
        date: "2 weeks ago",
        verified: true,
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      {
        rating: 4,
        comment: "Good work-life balance and competitive compensation. The projects are challenging and the technology stack is modern.",
        position: "Frontend Developer",
        department: "Engineering", 
        date: "1 month ago",
        verified: true,
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      }
    ]
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/student-dashboard' },
    { label: 'Jobs', path: '/job-search-browse' },
    { label: jobData?.title, path: location?.pathname }
  ];

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    addNotification({
      type: isSaved ? 'info' : 'success',
      title: isSaved ? 'Job Removed' : 'Job Saved',
      message: isSaved ? 'Job removed from your saved list' : 'Job added to your saved list'
    });
  };

  const handleApplicationSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setHasApplied(true);
      setShowPreview(false);
      
      addNotification({
        type: 'success',
        title: 'Application Submitted!',
        message: 'Your application has been successfully submitted. You will receive a confirmation email shortly.',
        actions: [
          {
            label: 'Track Application',
            onClick: () => navigate('/application-tracking')
          }
        ]
      });
      
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Submission Failed',
        message: 'There was an error submitting your application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreviewApplication = (formData) => {
    setShowPreview(true);
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      ...notification
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev?.filter(n => n?.id !== id));
  };

  const handleLogout = () => {
    navigate('/login-registration');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="px-4 lg:px-6 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              {breadcrumbItems?.map((item, index) => (
                <React.Fragment key={item?.path}>
                  {index > 0 && (
                    <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                  )}
                  {index === breadcrumbItems?.length - 1 ? (
                    <span className="text-foreground font-medium truncate">
                      {item?.label}
                    </span>
                  ) : (
                    <button
                      onClick={() => navigate(item?.path)}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 truncate"
                    >
                      {item?.label}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        {/* Job Header */}
        <JobHeader 
          job={jobData}
          onSave={handleSaveJob}
          isSaved={isSaved}
        />

        {/* Main Content */}
        <div className="px-4 lg:px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Job Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Tab Navigation */}
                <div className="bg-card border border-border rounded-lg">
                  <div className="flex border-b border-border overflow-x-auto">
                    {[
                      { id: 'overview', label: 'Overview', icon: 'FileText' },
                      { id: 'apply', label: 'Apply', icon: 'Send' }
                    ]?.map(tab => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                          activeTab === tab?.id
                            ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon name={tab?.icon} size={16} />
                        {tab?.label}
                      </button>
                    ))}
                  </div>

                  <div className="p-6">
                    {activeTab === 'overview' && (
                      <JobOverview job={jobData} />
                    )}
                    
                    {activeTab === 'apply' && (
                      <ApplicationForm
                        resumes={userResumes}
                        onSubmit={handleApplicationSubmit}
                        onPreview={handlePreviewApplication}
                        isSubmitting={isSubmitting}
                        hasApplied={hasApplied}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Smart Matching Indicator */}
                <SmartMatchingIndicator
                  matchPercentage={smartMatchingData?.matchPercentage}
                  skillGaps={smartMatchingData?.skillGaps}
                  strengths={smartMatchingData?.strengths}
                />

                {/* Social Proof */}
                <SocialProof
                  applicationCount={socialProofData?.applicationCount}
                  employeeReviews={socialProofData?.employeeReviews}
                  companyRating={socialProofData?.companyRating}
                />

                {/* Similar Jobs */}
                <SimilarJobs
                  jobs={similarJobs}
                  currentJobId={jobData?.id}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Apply Button (Mobile) */}
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
          <Button
            onClick={() => setActiveTab('apply')}
            className="w-full shadow-lg"
            iconName="Send"
            iconPosition="left"
          >
            Apply Now
          </Button>
        </div>
      </main>
      {/* Application Preview Modal */}
      {showPreview && (
        <ApplicationPreview
          formData={{}} // This would contain the actual form data
          jobTitle={jobData?.title}
          companyName={jobData?.company?.name}
          onEdit={() => setShowPreview(false)}
          onConfirm={handleApplicationSubmit}
          isSubmitting={isSubmitting}
        />
      )}
      {/* Notifications */}
      <NotificationToast
        notifications={notifications}
        onDismiss={removeNotification}
        position="top-right"
      />
    </div>
  );
};

export default JobApplicationDetailsApply;