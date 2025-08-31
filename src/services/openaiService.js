import openai from './openaiClient';

/**
 * Generates personalized job recommendations based on user profile
 * @param {Object} userProfile - User's profile data
 * @param {Array} availableJobs - Available jobs to filter from
 * @returns {Promise<Array>} Recommended jobs with AI analysis
 */
export async function generateJobRecommendations(userProfile, availableJobs = []) {
  try {
    const prompt = `Based on this user profile:
Skills: ${userProfile?.skills?.join(', ') || 'Not specified'}
Experience: ${userProfile?.experience || 'Entry level'}
Education: ${userProfile?.education || 'Not specified'}
Preferences: ${userProfile?.preferences || 'Open to opportunities'}

Recommend the top 5 most suitable jobs from this list and calculate match scores (0-100):
${availableJobs?.map(job => `${job?.title} at ${job?.company} - ${job?.skills?.join(', ')}`)?.join('\n')}

Respond in this JSON format:
{
  "recommendations": [
    {
      "jobId": "job_id_here",
      "matchScore": 85,
      "reasons": ["reason1", "reason2"]
    }
  ]
}`;

    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an AI career advisor that provides personalized job recommendations.' },
        { role: 'user', content: prompt }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'job_recommendations',
          schema: {
            type: 'object',
            properties: {
              recommendations: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    jobId: { type: 'string' },
                    matchScore: { type: 'number' },
                    reasons: { type: 'array', items: { type: 'string' } }
                  },
                  required: ['jobId', 'matchScore', 'reasons'],
                  additionalProperties: false
                }
              }
            },
            required: ['recommendations'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error generating job recommendations:', error);
    return { recommendations: [] };
  }
}

/**
 * Analyzes skill gaps based on user profile and job market demands
 * @param {Object} userProfile - User's current skills and profile
 * @param {Array} targetJobs - Jobs user is interested in
 * @returns {Promise<Array>} Skill gap analysis with recommendations
 */
export async function generateSkillGapAnalysis(userProfile, targetJobs = []) {
  try {
    const prompt = `Analyze skill gaps for this user profile:
Current Skills: ${userProfile?.skills?.join(', ') || 'None specified'}
Career Goal: ${userProfile?.careerGoal || 'Software Development'}
Experience Level: ${userProfile?.experienceLevel || 'Entry level'}

Target Jobs: ${targetJobs?.map(job => job?.title)?.join(', ')}

Identify top 3 skill gaps and provide learning recommendations. Respond in this JSON format:
{
  "skillGaps": [
    {
      "skill": "React Native",
      "priority": "high",
      "demandScore": 85,
      "currentLevel": 0,
      "targetLevel": 70,
      "jobsRequiring": 23,
      "averageSalaryIncrease": "$8,000",
      "timeToLearn": "3-4 months",
      "description": "Mobile app development framework highly sought after",
      "recommendedCourses": [
        {
          "title": "React Native - The Practical Guide",
          "provider": "Udemy",
          "rating": 4.6,
          "duration": "32 hours",
          "price": "$89.99"
        }
      ]
    }
  ]
}`;

    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an AI career advisor specializing in skill gap analysis and learning recommendations.' },
        { role: 'user', content: prompt }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'skill_gap_analysis',
          schema: {
            type: 'object',
            properties: {
              skillGaps: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    skill: { type: 'string' },
                    priority: { type: 'string' },
                    demandScore: { type: 'number' },
                    currentLevel: { type: 'number' },
                    targetLevel: { type: 'number' },
                    jobsRequiring: { type: 'number' },
                    averageSalaryIncrease: { type: 'string' },
                    timeToLearn: { type: 'string' },
                    description: { type: 'string' },
                    recommendedCourses: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          title: { type: 'string' },
                          provider: { type: 'string' },
                          rating: { type: 'number' },
                          duration: { type: 'string' },
                          price: { type: 'string' }
                        },
                        required: ['title', 'provider', 'rating', 'duration', 'price'],
                        additionalProperties: false
                      }
                    }
                  },
                  required: ['skill', 'priority', 'demandScore', 'currentLevel', 'targetLevel', 'jobsRequiring', 'averageSalaryIncrease', 'timeToLearn', 'description', 'recommendedCourses'],
                  additionalProperties: false
                }
              }
            },
            required: ['skillGaps'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error generating skill gap analysis:', error);
    return { skillGaps: [] };
  }
}

/**
 * Generates personalized interview questions based on job and user profile
 * @param {Object} jobDetails - Job details
 * @param {Object} userProfile - User profile
 * @returns {Promise<Array>} Generated interview questions
 */
export async function generateInterviewQuestions(jobDetails, userProfile) {
  try {
    const prompt = `Generate 5 personalized interview questions for:
Job: ${jobDetails?.title} at ${jobDetails?.company}
Required Skills: ${jobDetails?.skills?.join(', ')}
User Background: ${userProfile?.experience || 'Entry level'} with skills in ${userProfile?.skills?.join(', ') || 'various technologies'}

Focus on both technical and behavioral questions relevant to this specific role.`;

    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an experienced HR professional creating personalized interview questions.' },
        { role: 'user', content: prompt }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'interview_questions',
          schema: {
            type: 'object',
            properties: {
              questions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    question: { type: 'string' },
                    category: { type: 'string' },
                    difficulty: { type: 'string' }
                  },
                  required: ['question', 'category', 'difficulty'],
                  additionalProperties: false
                }
              }
            },
            required: ['questions'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error generating interview questions:', error);
    return { questions: [] };
  }
}

/**
 * Optimizes user's resume/profile content using AI
 * @param {Object} profileData - Current profile data
 * @param {string} targetRole - Target job role
 * @returns {Promise<Object>} Optimized profile suggestions
 */
export async function optimizeProfile(profileData, targetRole) {
  try {
    const prompt = `Optimize this profile for a ${targetRole} position:
Current Summary: ${profileData?.summary || 'Not provided'}
Skills: ${profileData?.skills?.join(', ') || 'Not specified'}
Experience: ${profileData?.experience || 'Entry level'}

Provide optimization suggestions for summary, skills emphasis, and missing elements.`;

    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a professional career coach specializing in profile optimization.' },
        { role: 'user', content: prompt }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'profile_optimization',
          schema: {
            type: 'object',
            properties: {
              optimizedSummary: { type: 'string' },
              skillsToEmphasize: { type: 'array', items: { type: 'string' } },
              missingSkills: { type: 'array', items: { type: 'string' } },
              suggestions: { type: 'array', items: { type: 'string' } }
            },
            required: ['optimizedSummary', 'skillsToEmphasize', 'missingSkills', 'suggestions'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error optimizing profile:', error);
    return {
      optimizedSummary: '',
      skillsToEmphasize: [],
      missingSkills: [],
      suggestions: []
    };
  }
}