import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WelcomePanel = ({ activeTab }) => {
  const features = [
    {
      icon: 'Target',
      title: 'Smart Job Matching',
      description: 'AI-powered recommendations based on your skills and preferences'
    },
    {
      icon: 'Users',
      title: 'Connect with Recruiters',
      description: 'Direct communication with hiring managers from top companies'
    },
    {
      icon: 'TrendingUp',
      title: 'Track Your Progress',
      description: 'Monitor applications and get insights on your job search journey'
    },
    {
      icon: 'Award',
      title: 'Skill Development',
      description: 'Get personalized course recommendations to bridge skill gaps'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Students Placed' },
    { number: '2K+', label: 'Partner Companies' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:px-12 lg:py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-md mx-auto">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="Zap" size={32} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to JobConnect
          </h1>
          <p className="text-lg text-muted-foreground">
            {activeTab === 'login' ?'Welcome back! Sign in to continue your journey.' :'Join thousands of students finding their dream careers.'
            }
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-8 overflow-hidden rounded-xl">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Students collaborating in modern workspace"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={feature?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">
                  {feature?.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-card rounded-lg border border-border">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold text-primary">
                {stat?.number}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-xs text-muted-foreground">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Lock" size={16} className="text-success" />
              <span className="text-xs text-muted-foreground">Privacy Protected</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Trusted by universities and companies worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePanel;