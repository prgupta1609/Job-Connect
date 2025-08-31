import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PersonalInfoTab = ({ data, onChange, onSave, isLoading }) => {
  const [profileImage, setProfileImage] = useState(data?.profileImage || '');
  const [imagePreview, setImagePreview] = useState(data?.profileImage || '');

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e?.target?.result;
        setImagePreview(imageUrl);
        setProfileImage(imageUrl);
        onChange('profileImage', imageUrl);
      };
      reader?.readAsDataURL(file);
    }
  };

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'in', label: 'India' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'sg', label: 'Singapore' },
    { value: 'ae', label: 'United Arab Emirates' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Image Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Profile Picture</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="User" size={32} className="text-muted-foreground" />
                </div>
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
              <Icon name="Camera" size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">
              Upload a professional photo to make your profile stand out
            </p>
            <p className="text-xs text-muted-foreground">
              Recommended: Square image, at least 200x200 pixels, max 5MB
            </p>
          </div>
        </div>
      </div>
      {/* Basic Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={data?.firstName || ''}
            onChange={(e) => onChange('firstName', e?.target?.value)}
            required
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={data?.lastName || ''}
            onChange={(e) => onChange('lastName', e?.target?.value)}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={data?.email || ''}
            onChange={(e) => onChange('email', e?.target?.value)}
            description="This will be your primary contact email"
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            value={data?.phone || ''}
            onChange={(e) => onChange('phone', e?.target?.value)}
            required
          />
          <Input
            label="Date of Birth"
            type="date"
            value={data?.dateOfBirth || ''}
            onChange={(e) => onChange('dateOfBirth', e?.target?.value)}
          />
          <Select
            label="Gender"
            options={genderOptions}
            value={data?.gender || ''}
            onChange={(value) => onChange('gender', value)}
            placeholder="Select gender"
          />
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Address Line 1"
              type="text"
              placeholder="Enter your street address"
              value={data?.address1 || ''}
              onChange={(e) => onChange('address1', e?.target?.value)}
            />
          </div>
          <Input
            label="Address Line 2"
            type="text"
            placeholder="Apartment, suite, etc. (optional)"
            value={data?.address2 || ''}
            onChange={(e) => onChange('address2', e?.target?.value)}
          />
          <Input
            label="City"
            type="text"
            placeholder="Enter your city"
            value={data?.city || ''}
            onChange={(e) => onChange('city', e?.target?.value)}
          />
          <Input
            label="State/Province"
            type="text"
            placeholder="Enter your state or province"
            value={data?.state || ''}
            onChange={(e) => onChange('state', e?.target?.value)}
          />
          <Input
            label="ZIP/Postal Code"
            type="text"
            placeholder="Enter your ZIP or postal code"
            value={data?.zipCode || ''}
            onChange={(e) => onChange('zipCode', e?.target?.value)}
          />
          <Select
            label="Country"
            options={countryOptions}
            value={data?.country || ''}
            onChange={(value) => onChange('country', value)}
            placeholder="Select country"
            searchable
          />
        </div>
      </div>
      {/* Professional Summary */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Professional Summary</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              About Me
            </label>
            <textarea
              className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              placeholder="Write a brief summary about yourself, your career goals, and what makes you unique..."
              value={data?.summary || ''}
              onChange={(e) => onChange('summary', e?.target?.value)}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {(data?.summary || '')?.length}/500 characters
            </p>
          </div>
          <Input
            label="LinkedIn Profile"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            value={data?.linkedinUrl || ''}
            onChange={(e) => onChange('linkedinUrl', e?.target?.value)}
          />
          <Input
            label="Portfolio/Website"
            type="url"
            placeholder="https://yourportfolio.com"
            value={data?.portfolioUrl || ''}
            onChange={(e) => onChange('portfolioUrl', e?.target?.value)}
          />
          <Input
            label="GitHub Profile"
            type="url"
            placeholder="https://github.com/yourusername"
            value={data?.githubUrl || ''}
            onChange={(e) => onChange('githubUrl', e?.target?.value)}
          />
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={onSave}
          loading={isLoading}
          iconName="Save"
          iconPosition="left"
        >
          Save Personal Information
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoTab;