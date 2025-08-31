import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AuthHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground font-heading">
              JobConnect
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#features" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          {/* Help Link */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200">
              <Icon name="HelpCircle" size={16} className="mr-1" />
              <span className="text-sm">Help</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;