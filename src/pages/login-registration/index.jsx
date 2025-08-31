import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import WelcomePanel from './components/WelcomePanel';
import Icon from '../../components/AppIcon';

const LoginRegistration = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      navigate('/student-dashboard');
      return;
    }

    setIsLoading(false);
  }, [navigate]);

  const handleAuthSuccess = (userData) => {
    console.log('Authentication successful:', userData);
    // Navigation is handled in the form components
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse">
            <Icon name="Zap" size={20} color="white" />
          </div>
          <span className="text-lg font-semibold text-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AuthHeader />
      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Welcome Panel - Desktop Only */}
        <WelcomePanel activeTab={activeTab} />

        {/* Authentication Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {activeTab === 'login' ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p className="text-muted-foreground">
                {activeTab === 'login' ?'Sign in to your account to continue' :'Create your account to find opportunities'
                }
              </p>
            </div>

            {/* Auth Tabs */}
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Auth Forms */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
              {activeTab === 'login' ? (
                <LoginForm onSuccess={handleAuthSuccess} />
              ) : (
                <RegisterForm onSuccess={handleAuthSuccess} />
              )}
            </div>

            {/* Footer Links */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <a href="#privacy" className="hover:text-foreground transition-colors duration-200">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#terms" className="hover:text-foreground transition-colors duration-200">
                  Terms of Service
                </a>
              </div>
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} JobConnect. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Features - Below fold */}
      <div className="lg:hidden bg-muted/30 py-12 px-4">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-center text-foreground mb-8">
            Why Choose JobConnect?
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Target" size={20} className="text-primary" />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">Smart Matching</h4>
              <p className="text-xs text-muted-foreground">AI-powered job recommendations</p>
            </div>

            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Users" size={20} className="text-primary" />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">Direct Connect</h4>
              <p className="text-xs text-muted-foreground">Chat with recruiters directly</p>
            </div>

            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="TrendingUp" size={20} className="text-primary" />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">Track Progress</h4>
              <p className="text-xs text-muted-foreground">Monitor your applications</p>
            </div>

            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Award" size={20} className="text-primary" />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">Skill Growth</h4>
              <p className="text-xs text-muted-foreground">Personalized learning paths</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-primary">50K+</span>
                <span className="text-muted-foreground">Students</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-primary">2K+</span>
                <span className="text-muted-foreground">Companies</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-primary">95%</span>
                <span className="text-muted-foreground">Success</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegistration;