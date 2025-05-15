import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Briefcase, 
  Clock, 
  Users, 
  Building, 
  ExternalLink,
  Share2,
  Bookmark,
  Flag,
  ArrowLeft
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { mockFeaturedJobs } from '../../lib/mockData';
import { formatDate } from '../../lib/utils';
import { toast } from '../../components/ui/Toaster';

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const [isApplying, setIsApplying] = useState(false);
  
  // Find the job by id
  const job = mockFeaturedJobs.find(job => job.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-8">The job listing you are looking for does not exist or has been removed.</p>
          <Link to="/jobs">
            <Button color="primary">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Job Listings
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const handleApply = () => {
    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      
      if (isAuthenticated && user?.role === 'student') {
        toast.success('Application submitted successfully!');
      } else {
        // User is not authenticated or not a student
        toast.warning('Please log in as a student to apply for jobs');
      }
    }, 1500);
  };
  
  const handleSave = () => {
    if (isAuthenticated) {
      toast.success('Job saved to your favorites!');
    } else {
      toast.info('Please log in to save jobs');
    }
  };
  
  const handleShare = () => {
    // In a real app, this would show a share dialog or copy to clipboard
    navigator.clipboard.writeText(window.location.href)
      .then(() => toast.success('Link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy link'));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link to="/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to job listings</span>
            </Link>
          </div>
          
          {/* Job Header */}
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
                      {job.jobType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                    <span className="text-gray-500 text-sm">
                      Posted {formatDate(job.postedDate)}
                    </span>
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  
                  <div className="text-lg text-gray-700 mb-4">{job.companyName}</div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)} Level</span>
                    </div>
                    
                    {job.deadline && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        <span>Apply by {formatDate(job.deadline)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 md:mt-0 flex flex-col gap-3">
                  {job.salaryRange && (
                    <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-md text-center">
                      <div className="text-sm font-medium">Salary Range</div>
                      <div className="text-lg font-bold">{job.salaryRange}</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center mt-6 gap-2">
                <Button 
                  color="primary" 
                  size="lg"
                  onClick={handleApply}
                  isLoading={isApplying}
                >
                  Apply Now
                </Button>
                
                <button 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  onClick={handleSave}
                >
                  <Bookmark className="h-5 w-5 mr-2" />
                  Save
                </button>
                
                <button 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>
                
                <div className="flex-1 md:text-right">
                  <span className="text-gray-500 text-sm flex items-center justify-end">
                    <Users className="h-4 w-4 mr-1" />
                    {job.applicationCount} applicants
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Job Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <motion.div
                className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
                  <div className="prose max-w-none">
                    <p className="mb-6">{job.description}</p>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      {job.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                    
                    {job.benefits && (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                          {job.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
              
              {/* Apply Now Section */}
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-md overflow-hidden mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Interested in this job?</h2>
                  <p className="mb-6">Apply now and take the next step in your career journey!</p>
                  
                  <Button 
                    color="white" 
                    size="lg"
                    onClick={handleApply}
                    isLoading={isApplying}
                  >
                    Apply Now
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <div>
              {/* Company Info */}
              <motion.div
                className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">About the Company</h2>
                  
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-100 h-12 w-12 rounded-full flex items-center justify-center mr-3">
                      <Building className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{job.companyName}</h3>
                      <p className="text-sm text-gray-500">{job.industry}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <a href="#" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      <span>Visit website</span>
                    </a>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <a
                      href="#"
                      className="text-gray-500 hover:text-red-600 inline-flex items-center text-sm"
                    >
                      <Flag className="h-4 w-4 mr-1" />
                      <span>Report this job</span>
                    </a>
                  </div>
                </div>
              </motion.div>
              
              {/* Job Details */}
              <motion.div
                className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Job Details</h2>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500">Job Type</div>
                      <div className="font-medium text-gray-900">
                        {job.jobType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Experience Level</div>
                      <div className="font-medium text-gray-900">
                        {job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-medium text-gray-900">{job.location}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Work Type</div>
                      <div className="font-medium text-gray-900">
                        {job.locationType.charAt(0).toUpperCase() + job.locationType.slice(1)}
                      </div>
                    </div>
                    
                    {job.deadline && (
                      <div>
                        <div className="text-sm text-gray-500">Application Deadline</div>
                        <div className="font-medium text-gray-900">{formatDate(job.deadline)}</div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
              
              {/* Skills */}
              <motion.div
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Required Skills</h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;