import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ResumeTab = ({ data, onChange, onSave, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [parseResults, setParseResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFile(e?.target?.files?.[0]);
    }
  };

  const handleFile = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes?.includes(file?.type)) {
      alert('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (5MB limit)
    if (file?.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Simulate file upload and parsing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock parsed data
      const mockParsedData = {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
        experience: [
          {
            company: 'Tech Solutions Inc.',
            position: 'Software Developer Intern',
            duration: 'Jun 2023 - Aug 2023',
            description: 'Developed web applications using React and Node.js'
          }
        ],
        education: [
          {
            institution: 'University of Technology',
            degree: 'Bachelor of Computer Science',
            year: '2024'
          }
        ]
      };

      setUploadProgress(100);
      setParseResults(mockParsedData);
      
      // Update form data
      onChange('resumeFile', file);
      onChange('resumeUrl', URL.createObjectURL(file));
      onChange('resumeFileName', file?.name);
      onChange('resumeFileSize', file?.size);
      onChange('resumeUploadDate', new Date()?.toISOString());

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      clearInterval(progressInterval);
    }
  };

  const applyParsedData = () => {
    if (parseResults) {
      // Apply parsed data to profile
      onChange('firstName', parseResults?.name?.split(' ')?.[0]);
      onChange('lastName', parseResults?.name?.split(' ')?.slice(1)?.join(' '));
      onChange('email', parseResults?.email);
      onChange('phone', parseResults?.phone);
      
      // Apply skills
      const skillsData = parseResults?.skills?.map((skill, index) => ({
        id: Date.now() + index,
        name: skill,
        category: 'technical',
        proficiency: 'intermediate'
      }));
      onChange('skills', skillsData);

      setParseResults(null);
      alert('Resume data has been applied to your profile!');
    }
  };

  const removeResume = () => {
    onChange('resumeFile', null);
    onChange('resumeUrl', '');
    onChange('resumeFileName', '');
    onChange('resumeFileSize', 0);
    onChange('resumeUploadDate', '');
    setParseResults(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Resume Upload</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Upload your resume for AI-powered parsing and profile completion
        </p>
      </div>
      {/* Upload Area */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            dragActive 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileInput}
            className="hidden"
          />

          {isUploading ? (
            <div className="space-y-4">
              <Icon name="Upload" size={48} className="text-primary mx-auto animate-pulse" />
              <div>
                <p className="text-lg font-medium text-foreground">Uploading Resume...</p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{uploadProgress}% complete</p>
              </div>
            </div>
          ) : data?.resumeFileName ? (
            <div className="space-y-4">
              <Icon name="FileText" size={48} className="text-success mx-auto" />
              <div>
                <p className="text-lg font-medium text-foreground">{data?.resumeFileName}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(data?.resumeFileSize)} • Uploaded on {new Date(data.resumeUploadDate)?.toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef?.current?.click()}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Replace Resume
                </Button>
                <Button
                  variant="ghost"
                  onClick={removeResume}
                  iconName="Trash2"
                  iconPosition="left"
                  className="text-error hover:text-error hover:bg-error/10"
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Icon name="Upload" size={48} className="text-muted-foreground mx-auto" />
              <div>
                <p className="text-lg font-medium text-foreground">Upload Your Resume</p>
                <p className="text-muted-foreground">
                  Drag and drop your resume here, or click to browse
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supports PDF, DOC, DOCX • Max file size: 5MB
                </p>
              </div>
              <Button
                onClick={() => fileInputRef?.current?.click()}
                iconName="Upload"
                iconPosition="left"
              >
                Choose File
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* AI Parsing Results */}
      {parseResults && (
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-foreground flex items-center">
              <Icon name="Zap" size={20} className="text-primary mr-2" />
              AI Parsing Results
            </h4>
            <div className="flex space-x-2">
              <Button
                onClick={applyParsedData}
                variant="outline"
                iconName="Check"
                iconPosition="left"
              >
                Apply to Profile
              </Button>
              <Button
                onClick={() => setParseResults(null)}
                variant="ghost"
                iconName="X"
                size="sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-foreground mb-2">Personal Information</h5>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {parseResults?.name}</p>
                  <p><span className="text-muted-foreground">Email:</span> {parseResults?.email}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {parseResults?.phone}</p>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-foreground mb-2">Skills Detected</h5>
                <div className="flex flex-wrap gap-1">
                  {parseResults?.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-foreground mb-2">Experience</h5>
              {parseResults?.experience?.map((exp, index) => (
                <div key={index} className="text-sm mb-2">
                  <p className="font-medium">{exp?.position} at {exp?.company}</p>
                  <p className="text-muted-foreground">{exp?.duration}</p>
                </div>
              ))}
            </div>

            <div>
              <h5 className="font-medium text-foreground mb-2">Education</h5>
              {parseResults?.education?.map((edu, index) => (
                <div key={index} className="text-sm mb-2">
                  <p className="font-medium">{edu?.degree}</p>
                  <p className="text-muted-foreground">{edu?.institution} • {edu?.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Resume Versions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Resume Versions</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="FileText" size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Current Resume</p>
                <p className="text-sm text-muted-foreground">
                  {data?.resumeFileName || 'No resume uploaded'}
                </p>
              </div>
            </div>
            {data?.resumeUrl && (
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  onClick={() => window.open(data?.resumeUrl, '_blank')}
                >
                  Preview
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = data?.resumeUrl;
                    link.download = data?.resumeFileName;
                    link?.click();
                  }}
                >
                  Download
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Resume Tips */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Resume Tips</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <p className="text-sm text-foreground">
              Use a clean, professional format with clear section headings
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <p className="text-sm text-foreground">
              Include relevant keywords from job descriptions you're interested in
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <p className="text-sm text-foreground">
              Quantify your achievements with specific numbers and results
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <p className="text-sm text-foreground">
              Keep it concise - ideally 1-2 pages for entry-level positions
            </p>
          </div>
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
          Save Resume Information
        </Button>
      </div>
    </div>
  );
};

export default ResumeTab;