import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';


const LoginForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    student: { email: 'student@university.edu', password: 'Student123!' },
    recruiter: { email: 'recruiter@company.com', password: 'Recruiter123!' },
    admin: { email: 'admin@jobconnect.com', password: 'Admin123!' }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const isValidCredentials = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (!isValidCredentials) {
        setErrors({ 
          general: `Invalid credentials. Try: student@university.edu / Student123! or recruiter@company.com / Recruiter123!` 
        });
        return;
      }

      // Determine user role and redirect
      let userRole = 'student';
      if (formData?.email === mockCredentials?.recruiter?.email) {
        userRole = 'recruiter';
      } else if (formData?.email === mockCredentials?.admin?.email) {
        userRole = 'admin';
      }

      // Store user data in localStorage
      const userData = {
        email: formData?.email,
        role: userRole,
        name: userRole === 'student' ? 'Alex Johnson' : userRole === 'recruiter' ? 'Sarah Wilson' : 'Admin User',
        loginTime: new Date()?.toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());

      onSuccess?.(userData);
      navigate('/student-dashboard');

    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      const userData = {
        email: `user@${provider}.com`,
        role: 'student',
        name: 'Social User',
        loginTime: new Date()?.toISOString()
      };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', 'mock-social-token-' + Date.now());
      onSuccess?.(userData);
      navigate('/student-dashboard');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors?.general && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-md">
          <p className="text-sm text-error">{errors?.general}</p>
        </div>
      )}
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        required
        disabled={isLoading}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={(e) => handleInputChange('password', e?.target?.value)}
        error={errors?.password}
        required
        disabled={isLoading}
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={formData?.rememberMe}
          onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
          disabled={isLoading}
        />

        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="left"
      >
        Sign In
      </Button>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
          iconName="Chrome"
          iconPosition="left"
        >
          Google
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('linkedin')}
          disabled={isLoading}
          iconName="Linkedin"
          iconPosition="left"
        >
          LinkedIn
        </Button>
      </div>
      <div className="mt-4 p-3 bg-muted/50 rounded-md">
        <p className="text-xs text-muted-foreground mb-2">Demo Credentials:</p>
        <div className="space-y-1 text-xs">
          <p><strong>Student:</strong> student@university.edu / Student123!</p>
          <p><strong>Recruiter:</strong> recruiter@company.com / Recruiter123!</p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;