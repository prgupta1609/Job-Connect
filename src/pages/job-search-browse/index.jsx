import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import JobCard from './components/JobCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import JobPreviewPanel from './components/JobPreviewPanel';
import SortDropdown from './components/SortDropdown';
import LoadingSkeleton from './components/LoadingSkeleton';

const JobSearchBrowse = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({});
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com"
  };

  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: {
        name: "TechCorp Inc.",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
        description: "TechCorp is a leading technology company specializing in innovative web solutions and digital transformation services for enterprises worldwide.",
        size: "500-1000",
        industry: "Technology",
        website: "https://techcorp.com"
      },
      location: "San Francisco, CA",
      type: "Full-time",
      salary: { min: 80000, max: 120000, period: "year" },
      postedDate: "2 days ago",
      isRemote: true,
      isUrgent: false,
      isPerfectMatch: true,
      matchScore: 95,
      skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
      description: `We are looking for a talented Frontend Developer to join our dynamic team. You will be responsible for building user-facing features using modern web technologies and ensuring excellent user experience across all our products.\n\nThis role offers excellent growth opportunities and the chance to work with cutting-edge technologies in a collaborative environment.`,
      requirements: [
        "3+ years of experience with React and modern JavaScript",
        "Strong understanding of HTML5, CSS3, and responsive design",
        "Experience with TypeScript and modern build tools",
        "Knowledge of version control systems (Git)",
        "Bachelor\'s degree in Computer Science or related field"
      ],
      benefits: [
        "Competitive salary and equity package",
        "Comprehensive health, dental, and vision insurance",
        "Flexible work arrangements and remote options",
        "Professional development budget",
        "Unlimited PTO policy"
      ]
    },
    {
      id: 2,
      title: "Data Scientist",
      company: {
        name: "DataFlow Analytics",
        logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=center",
        description: "DataFlow Analytics helps businesses make data-driven decisions through advanced analytics and machine learning solutions.",
        size: "100-500",
        industry: "Analytics",
        website: "https://dataflow.com"
      },
      location: "New York, NY",
      type: "Full-time",
      salary: { min: 90000, max: 140000, period: "year" },
      postedDate: "1 day ago",
      isRemote: false,
      isUrgent: true,
      isPerfectMatch: false,
      matchScore: 87,
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Pandas"],
      description: `Join our data science team to build predictive models and extract insights from large datasets. You'll work on challenging problems across various industries and help drive business decisions through data analysis.\n\nWe offer a collaborative environment where you can grow your skills and make a significant impact on our clients' success.`,
      requirements: [
        "Master's degree in Data Science, Statistics, or related field",
        "3+ years of experience in machine learning and statistical analysis",
        "Proficiency in Python and SQL",
        "Experience with ML frameworks like TensorFlow or PyTorch",
        "Strong communication skills for presenting findings"
      ],
      benefits: [
        "Competitive compensation package",
        "Health and wellness benefits",
        "Learning and development opportunities",
        "Flexible working hours",
        "Stock options"
      ]
    },
    {
      id: 3,
      title: "UX Designer Intern",
      company: {
        name: "Design Studio Pro",
        logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop&crop=center",
        description: "Design Studio Pro creates beautiful and functional digital experiences for startups and established companies.",
        size: "10-50",
        industry: "Design",
        website: "https://designstudiopro.com"
      },
      location: "Remote",
      type: "Internship",
      salary: { min: 20, max: 25, period: "hour" },
      postedDate: "3 days ago",
      isRemote: true,
      isUrgent: false,
      isPerfectMatch: false,
      matchScore: 78,
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"],
      description: `We're seeking a passionate UX Design Intern to join our creative team. You'll work on real client projects, learn from experienced designers, and contribute to creating exceptional user experiences.\n\nThis internship provides hands-on experience with the complete design process from research to final implementation.`,
      requirements: [
        "Currently pursuing degree in Design, HCI, or related field",
        "Portfolio demonstrating UX/UI design skills",
        "Proficiency in design tools like Figma or Adobe XD",
        "Basic understanding of user-centered design principles",
        "Strong attention to detail and creativity"
      ],
      benefits: [
        "Mentorship from senior designers",
        "Real-world project experience",
        "Flexible remote work",
        "Potential for full-time offer",
        "Access to design tools and resources"
      ]
    },
    {
      id: 4,
      title: "Backend Engineer",
      company: {
        name: "CloudTech Solutions",
        logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop&crop=center",
        description: "CloudTech Solutions provides scalable cloud infrastructure and backend services for modern applications.",
        size: "200-500",
        industry: "Cloud Computing",
        website: "https://cloudtech.com"
      },
      location: "Seattle, WA",
      type: "Full-time",
      salary: { min: 95000, max: 130000, period: "year" },
      postedDate: "1 week ago",
      isRemote: false,
      isUrgent: false,
      isPerfectMatch: false,
      matchScore: 82,
      skills: ["Node.js", "Python", "AWS", "Docker", "PostgreSQL"],
      description: `We're looking for a skilled Backend Engineer to design and implement scalable server-side applications. You'll work with microservices architecture and cloud technologies to build robust systems.\n\nJoin our engineering team and help us build the next generation of cloud-native applications.`,
      requirements: [
        "4+ years of backend development experience",
        "Strong knowledge of Node.js or Python",
        "Experience with cloud platforms (AWS, GCP, or Azure)",
        "Understanding of microservices architecture",
        "Experience with containerization (Docker, Kubernetes)"
      ],
      benefits: [
        "Competitive salary and bonuses",
        "Comprehensive benefits package",
        "Professional development opportunities",
        "Modern office with latest technology",
        "Team building activities and events"
      ]
    },
    {
      id: 5,
      title: "Product Manager",
      company: {
        name: "InnovateLab",
        logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop&crop=center",
        description: "InnovateLab is a product development company that helps startups and enterprises bring innovative ideas to market.",
        size: "50-100",
        industry: "Product Development",
        website: "https://innovatelab.com"
      },
      location: "Austin, TX",
      type: "Full-time",
      salary: { min: 100000, max: 150000, period: "year" },
      postedDate: "4 days ago",
      isRemote: true,
      isUrgent: false,
      isPerfectMatch: false,
      matchScore: 73,
      skills: ["Product Strategy", "Agile", "Analytics", "User Research", "Roadmapping"],
      description: `We're seeking an experienced Product Manager to lead product strategy and execution. You'll work closely with engineering, design, and business teams to deliver exceptional products.\n\nThis role offers the opportunity to shape product direction and drive innovation in a fast-paced environment.`,
      requirements: [
        "5+ years of product management experience",
        "Strong analytical and strategic thinking skills",
        "Experience with Agile development methodologies",
        "Excellent communication and leadership abilities",
        "MBA or equivalent experience preferred"
      ],
      benefits: [
        "Competitive compensation and equity",
        "Comprehensive health benefits",
        "Flexible work arrangements",
        "Professional development budget",
        "Innovation time for personal projects"
      ]
    },
    {
      id: 6,
      title: "Marketing Coordinator",
      company: {
        name: "BrandBoost Agency",
        logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center",
        description: "BrandBoost Agency specializes in digital marketing strategies and brand development for growing businesses.",
        size: "20-50",
        industry: "Marketing",
        website: "https://brandboost.com"
      },
      location: "Chicago, IL",
      type: "Part-time",
      salary: { min: 25, max: 35, period: "hour" },
      postedDate: "5 days ago",
      isRemote: false,
      isUrgent: false,
      isPerfectMatch: false,
      matchScore: 65,
      skills: ["Social Media", "Content Marketing", "Analytics", "Adobe Creative", "SEO"],
      description: `Join our marketing team as a Marketing Coordinator to support various digital marketing campaigns. You'll help create content, manage social media, and analyze campaign performance.\n\nThis is a great opportunity to gain experience in digital marketing and work with diverse clients across different industries.`,
      requirements: [
        "Bachelor\'s degree in Marketing or related field",
        "1-2 years of marketing experience",
        "Knowledge of social media platforms and tools",
        "Basic understanding of SEO and content marketing",
        "Creative mindset with attention to detail"
      ],
      benefits: [
        "Flexible part-time schedule",
        "Health insurance options",
        "Professional development opportunities",
        "Creative and collaborative work environment",
        "Potential for full-time advancement"
      ]
    }
  ];

  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  // Search suggestions
  const searchSuggestions = [
    "Frontend Developer", "Backend Engineer", "Data Scientist", "UX Designer",
    "Product Manager", "Software Engineer", "DevOps Engineer", "Marketing Manager",
    "React Developer", "Python Developer", "Machine Learning", "JavaScript",
    "Remote Jobs", "Internships", "Full-time", "Part-time"
  ];

  // Filter and sort jobs
  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...jobs];

    // Apply search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(job =>
        job?.title?.toLowerCase()?.includes(query) ||
        job?.company?.name?.toLowerCase()?.includes(query) ||
        job?.skills?.some(skill => skill?.toLowerCase()?.includes(query)) ||
        job?.location?.toLowerCase()?.includes(query)
      );
    }

    // Apply location filter
    if (filters?.location) {
      if (filters?.location === 'remote') {
        filtered = filtered?.filter(job => job?.isRemote);
      } else {
        filtered = filtered?.filter(job => 
          job?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
        );
      }
    }

    // Apply job type filter
    if (filters?.jobTypes && filters?.jobTypes?.length > 0) {
      filtered = filtered?.filter(job =>
        filters?.jobTypes?.includes(job?.type?.toLowerCase())
      );
    }

    // Apply salary filter
    if (filters?.salaryMin || filters?.salaryMax) {
      filtered = filtered?.filter(job => {
        const jobMin = job?.salary?.min || 0;
        const jobMax = job?.salary?.max || Infinity;
        const filterMin = filters?.salaryMin ? parseInt(filters?.salaryMin) : 0;
        const filterMax = filters?.salaryMax ? parseInt(filters?.salaryMax) : Infinity;
        
        return jobMax >= filterMin && jobMin <= filterMax;
      });
    }

    // Apply experience filter
    if (filters?.experience) {
      // This would typically be based on job requirements, simplified for demo
      filtered = filtered?.filter(job => {
        const hasExperienceMatch = job?.requirements?.some(req => {
          const reqLower = req?.toLowerCase();
          if (filters?.experience === 'entry') return reqLower?.includes('0-2') || reqLower?.includes('entry');
          if (filters?.experience === 'mid') return reqLower?.includes('3-5') || reqLower?.includes('mid');
          if (filters?.experience === 'senior') return reqLower?.includes('5+') || reqLower?.includes('senior');
          return true;
        });
        return hasExperienceMatch;
      });
    }

    // Apply company size filter
    if (filters?.companySize) {
      filtered = filtered?.filter(job => {
        const size = job?.company?.size;
        if (filters?.companySize === 'startup') return size?.includes('10-50') || size?.includes('20-50');
        if (filters?.companySize === 'medium') return size?.includes('100-500') || size?.includes('200-500');
        if (filters?.companySize === 'large') return size?.includes('500-1000') || size?.includes('1000+');
        return true;
      });
    }

    // Apply industry filter
    if (filters?.industry) {
      filtered = filtered?.filter(job =>
        job?.company?.industry?.toLowerCase()?.includes(filters?.industry?.toLowerCase())
      );
    }

    // Apply remote work filter
    if (filters?.remoteWork) {
      filtered = filtered?.filter(job => job?.isRemote);
    }

    // Apply posted date filter
    if (filters?.postedDate && filters?.postedDate !== 'any') {
      // Simplified date filtering for demo
      const now = new Date();
      filtered = filtered?.filter(job => {
        if (filters?.postedDate === 'today') return job?.postedDate?.includes('hour') || job?.postedDate?.includes('today');
        if (filters?.postedDate === 'week') return !job?.postedDate?.includes('month');
        if (filters?.postedDate === 'month') return true;
        return true;
      });
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.postedDate) - new Date(a.postedDate);
        case 'date-asc':
          return new Date(a.postedDate) - new Date(b.postedDate);
        case 'salary-desc':
          return (b?.salary?.max || 0) - (a?.salary?.max || 0);
        case 'salary-asc':
          return (a?.salary?.min || 0) - (b?.salary?.min || 0);
        case 'company-asc':
          return a?.company?.name?.localeCompare(b?.company?.name);
        case 'company-desc':
          return b?.company?.name?.localeCompare(a?.company?.name);
        case 'match-desc':
          return (b?.matchScore || 0) - (a?.matchScore || 0);
        case 'relevance':
        default:
          // Sort by perfect match first, then by match score
          if (a?.isPerfectMatch && !b?.isPerfectMatch) return -1;
          if (!a?.isPerfectMatch && b?.isPerfectMatch) return 1;
          return (b?.matchScore || 0) - (a?.matchScore || 0);
      }
    });

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, filters, sortBy]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const handleJobSave = (jobId, isSaved) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (isSaved) {
        newSaved?.add(jobId);
      } else {
        newSaved?.delete(jobId);
      }
      return newSaved;
    });
  };

  const handleJobApply = (job) => {
    navigate('/job-application-details-apply', { 
      state: { job } 
    });
  };

  const handleJobViewDetails = (job) => {
    setSelectedJob(job);
  };

  const handleLogout = () => {
    navigate('/login-registration');
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => 
      value !== '' && value !== null && value !== undefined && 
      (Array.isArray(value) ? value?.length > 0 : true)
    )?.length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <div className="pt-16">
        {/* Search Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Find Your Dream Job
              </h1>
              <p className="text-muted-foreground">
                Discover opportunities that match your skills and interests
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                  suggestions={searchSuggestions}
                  showSuggestions={true}
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <SortDropdown
                  value={sortBy}
                  onChange={setSortBy}
                />
                
                <Button
                  variant="outline"
                  onClick={() => setIsFilterPanelOpen(true)}
                  iconName="Filter"
                  iconPosition="left"
                >
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            <FilterChips
              activeFilters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto flex">
          {/* Job Listings */}
          <div className="flex-1 p-4 lg:p-6">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-medium text-foreground">
                  {filteredJobs?.length} Jobs Found
                </h2>
                {searchQuery && (
                  <p className="text-sm text-muted-foreground">
                    Results for "{searchQuery}"
                  </p>
                )}
              </div>
              
              {/* AI Recommendations Banner */}
              {filteredJobs?.some(job => job?.isPerfectMatch) && (
                <div className="hidden lg:flex items-center space-x-2 bg-accent/10 text-accent px-3 py-2 rounded-lg">
                  <Icon name="Sparkles" size={16} />
                  <span className="text-sm font-medium">
                    AI-powered recommendations available
                  </span>
                </div>
              )}
            </div>

            {/* Job Cards */}
            {isLoading ? (
              <LoadingSkeleton count={6} />
            ) : filteredJobs?.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs?.map((job) => (
                  <div
                    key={job?.id}
                    onClick={() => handleJobViewDetails(job)}
                    className="cursor-pointer"
                  >
                    <JobCard
                      job={job}
                      onApply={handleJobApply}
                      onSave={handleJobSave}
                      onViewDetails={handleJobViewDetails}
                      isSaved={savedJobs?.has(job?.id)}
                    />
                  </div>
                ))}
                
                {/* Load More */}
                {hasMore && (
                  <div className="text-center py-8">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          setHasMore(false);
                        }, 1000);
                      }}
                      iconName="ChevronDown"
                      iconPosition="left"
                    >
                      Load More Jobs
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No jobs found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearAllFilters}
                  iconName="X"
                  iconPosition="left"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

          {/* Job Preview Panel - Desktop Only */}
          <JobPreviewPanel
            job={selectedJob}
            onApply={handleJobApply}
            onSave={handleJobSave}
            onClose={() => setSelectedJob(null)}
            isSaved={selectedJob ? savedJobs?.has(selectedJob?.id) : false}
          />
        </div>
      </div>
      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearAllFilters}
        onApplyFilters={() => setIsFilterPanelOpen(false)}
      />
    </div>
  );
};

export default JobSearchBrowse;