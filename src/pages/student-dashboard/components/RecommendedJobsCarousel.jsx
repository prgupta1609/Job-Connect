import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import { generateJobRecommendations } from '../../../services/openaiService';

const RecommendedJobsCarousel = ({ jobs = [], onQuickApply, onViewJob, userProfile }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aiRecommendedJobs, setAiRecommendedJobs] = useState([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const mockJobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp Solutions",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      location: "San Francisco, CA",
      type: "Internship",
      salary: "$3,000/month",
      matchScore: 95,
      skills: ["React", "JavaScript", "CSS"],
      postedTime: "2 hours ago",
      isNew: true
    },
    {
      id: 2,
      title: "Software Engineer - Entry Level",
      company: "InnovateLabs",
      logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=100&h=100&fit=crop&crop=center",
      location: "Remote",
      type: "Full-time",
      salary: "$75,000/year",
      matchScore: 88,
      skills: ["Python", "Django", "PostgreSQL"],
      postedTime: "5 hours ago",
      isNew: true
    },
    {
      id: 3,
      title: "UI/UX Designer Intern",
      company: "DesignStudio Pro",
      logo: "https://images.pixabay.com/photo/2016/12/27/13/10/logo-1933884_1280.png?w=100&h=100&fit=crop&crop=center",
      location: "New York, NY",
      type: "Internship",
      salary: "$2,800/month",
      matchScore: 82,
      skills: ["Figma", "Adobe XD", "Prototyping"],
      postedTime: "1 day ago",
      isNew: false
    },
    {
      id: 4,
      title: "Data Analyst Trainee",
      company: "DataInsights Inc",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=center",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$65,000/year",
      matchScore: 79,
      skills: ["SQL", "Python", "Tableau"],
      postedTime: "2 days ago",
      isNew: false
    },
    {
      id: 5,
      title: "Mobile App Developer",
      company: "AppCrafters",
      logo: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?w=100&h=100&fit=crop&crop=center",
      location: "Seattle, WA",
      type: "Contract",
      salary: "$4,500/month",
      matchScore: 85,
      skills: ["React Native", "Flutter", "Firebase"],
      postedTime: "3 days ago",
      isNew: false
    }
  ];

  // Generate AI recommendations when component mounts or userProfile changes
  useEffect(() => {
    const generateAIRecommendations = async () => {
      if (!userProfile || !import.meta.env?.VITE_OPENAI_API_KEY) {
        return;
      }

      setIsLoadingAI(true);
      try {
        const aiResponse = await generateJobRecommendations(userProfile, mockJobs);
        
        if (aiResponse?.recommendations?.length > 0) {
          // Enhance mock jobs with AI recommendations
          const enhancedJobs = mockJobs?.map(job => {
            const aiRec = aiResponse?.recommendations?.find(rec => rec?.jobId === job?.id?.toString());
            if (aiRec) {
              return {
                ...job,
                matchScore: aiRec?.matchScore,
                aiReasons: aiRec?.reasons,
                isAIRecommended: true
              };
            }
            return job;
          })?.sort((a, b) => (b?.matchScore || 0) - (a?.matchScore || 0));

          setAiRecommendedJobs(enhancedJobs);
        }
      } catch (error) {
        console.error('Error generating AI recommendations:', error);
      } finally {
        setIsLoadingAI(false);
      }
    };

    generateAIRecommendations();
  }, [userProfile]);

  const displayJobs = aiRecommendedJobs?.length > 0 ? aiRecommendedJobs : (jobs?.length > 0 ? jobs : mockJobs);
  const visibleJobs = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + visibleJobs >= displayJobs?.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, displayJobs?.length - visibleJobs) : prev - 1
    );
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
            <Icon name="Briefcase" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {aiRecommendedJobs?.length > 0 ? 'AI-Powered Recommendations' : 'Recommended for You'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isLoadingAI ? 'Generating AI recommendations...' : 
               aiRecommendedJobs?.length > 0 ? 'Personalized matches based on your profile': 'AI-matched jobs based on your profile'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isLoadingAI && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex + visibleJobs >= displayJobs?.length}
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleJobs)}%)` }}
        >
          {displayJobs?.map((job) => (
            <div key={job?.id} className="flex-shrink-0 w-full md:w-1/3 px-2">
              <div className="bg-muted/50 border border-border rounded-lg p-4 h-full hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 bg-background">
                      <Image 
                        src={job?.logo} 
                        alt={`${job?.company} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm line-clamp-1">{job?.title}</h4>
                      <p className="text-xs text-muted-foreground">{job?.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {job?.isNew && (
                      <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                    {job?.isAIRecommended && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        AI Match
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    {job?.location}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-secondary/20 text-secondary px-2 py-1 rounded">
                      {job?.type}
                    </span>
                    <span className="font-medium text-foreground">{job?.salary}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{job?.postedTime}</span>
                    <span className={`font-medium ${getMatchScoreColor(job?.matchScore)}`}>
                      {job?.matchScore}% match
                    </span>
                  </div>
                </div>

                {/* AI Reasons */}
                {job?.aiReasons && job?.aiReasons?.length > 0 && (
                  <div className="mb-4 p-2 bg-primary/5 border border-primary/10 rounded-lg">
                    <p className="text-xs text-primary font-medium mb-1">Why it's a great match:</p>
                    <p className="text-xs text-muted-foreground">
                      {job?.aiReasons?.[0]}
                    </p>
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {job?.skills?.slice(0, 3)?.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-primary/10 text-primary text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewJob && onViewJob(job?.id)}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onQuickApply && onQuickApply(job?.id)}
                    className="flex-1"
                  >
                    Quick Apply
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex space-x-1">
          {Array.from({ length: Math.ceil(displayJobs?.length / visibleJobs) })?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * visibleJobs)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                Math.floor(currentIndex / visibleJobs) === index 
                  ? 'bg-primary' :'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedJobsCarousel;