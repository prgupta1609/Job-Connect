import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';


const RegisterForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    university: '',
    company: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: 'student', label: 'Student - Looking for opportunities' },
    { value: 'recruiter', label: 'Recruiter - Hiring talent' }
  ];

  const universityOptions = [
    { value: 'mit', label: 'Massachusetts Institute of Technology' },
    { value: 'stanford', label: 'Stanford University' },
    { value: 'berkeley', label: 'UC Berkeley' },
    { value: 'cmu', label: 'Carnegie Mellon University' },
    { value: 'caltech', label: 'California Institute of Technology' },
    { value: 'other', label: 'Other University' }
  ];

  const companyOptions = [
    { value: 'google', label: 'Google' },
    { value: 'microsoft', label: 'Microsoft' },
    { value: 'apple', label: 'Apple' },
    { value: 'amazon', label: 'Amazon' },
    { value: 'meta', label: 'Meta' },
    { value: 'startup', label: 'Startup Company' },
    { value: 'other', label: 'Other Company' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number and special character';
    }

    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData?.role === 'student' && !formData?.university) {
      newErrors.university = 'Please select your university';
    }

    if (formData?.role === 'recruiter' && !formData?.company) {
      newErrors.company = 'Please select your company';
    }

    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
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
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create user data
      const userData = {
        email: formData?.email,
        role: formData?.role,
        name: `${formData?.firstName} ${formData?.lastName}`,
        university: formData?.university,
        company: formData?.company,
        registrationTime: new Date()?.toISOString()
      };

      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());

      onSuccess?.(userData);
      navigate('/student-dashboard');

    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      const userData = {
        email: `user@${provider}.com`,
        role: 'student',
        name: 'Social User',
        registrationTime: new Date()?.toISOString()
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
      <Select
        label="I am a..."
        options={roleOptions}
        value={formData?.role}
        onChange={(value) => handleInputChange('role', value)}
        placeholder="Select your role"
        error={errors?.role}
        required
        disabled={isLoading}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter first name"
          value={formData?.firstName}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
          disabled={isLoading}
        />

        <Input
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          value={formData?.lastName}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
          disabled={isLoading}
        />
      </div>
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
        placeholder="Create a strong password"
        description="Must contain uppercase, lowercase, number and special character"
        value={formData?.password}
        onChange={(e) => handleInputChange('password', e?.target?.value)}
        error={errors?.password}
        required
        disabled={isLoading}
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={formData?.confirmPassword}
        onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
        error={errors?.confirmPassword}
        required
        disabled={isLoading}
      />
      {formData?.role === 'student' && (
        <Select
          label="University"
          options={universityOptions}
          value={formData?.university}
          onChange={(value) => handleInputChange('university', value)}
          placeholder="Select your university"
          error={errors?.university}
          required
          searchable
          disabled={isLoading}
        />
      )}
      {formData?.role === 'recruiter' && (
        <Select
          label="Company"
          options={companyOptions}
          value={formData?.company}
          onChange={(value) => handleInputChange('company', value)}
          placeholder="Select your company"
          error={errors?.company}
          required
          searchable
          disabled={isLoading}
        />
      )}
      <Checkbox
        label="I agree to the Terms of Service and Privacy Policy"
        checked={formData?.acceptTerms}
        onChange={(e) => handleInputChange('acceptTerms', e?.target?.checked)}
        error={errors?.acceptTerms}
        required
        disabled={isLoading}
      />
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        Create Account
      </Button>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or sign up with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialRegister('google')}
          disabled={isLoading}
          iconName="Chrome"
          iconPosition="left"
        >
          Google
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialRegister('linkedin')}
          disabled={isLoading}
          iconName="Linkedin"
          iconPosition="left"
        >
          LinkedIn
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;