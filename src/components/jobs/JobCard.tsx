import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, Calendar, Users } from 'lucide-react';
import { Job } from '../../lib/mockData';
import { formatDate } from '../../lib/utils';
import Button from '../ui/Button';

interface JobCardProps {
  job: Job;
  compact?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, compact = false }) => {
  const {
    id,
    title,
    companyName,
    location,
    locationType,
    jobType,
    postedDate,
    deadline,
    applicationCount,
    skills,
  } = job;

  // Get relative time string (e.g., "2 days ago")
  const getRelativeTimeString = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths === 1) return '1 month ago';
    return `${diffInMonths} months ago`;
  };

  // Format job type with proper capitalization and display
  const formatJobType = (type: string): string => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Format location type with icon and proper display
  const getLocationTypeDisplay = () => {
    switch (locationType) {
      case 'remote':
        return 'Remote';
      case 'hybrid':
        return 'Hybrid';
      case 'on-site':
        return 'On-site';
      default:
        return '';
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              <Link to={`/jobs/${id}`}>{title}</Link>
            </h3>
            <p className="text-gray-600 mt-1">{companyName}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {formatJobType(jobType)}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
            <span>{location} • {getLocationTypeDisplay()}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-4 w-4 mr-1 text-gray-400" />
            <span>Posted {getRelativeTimeString(postedDate)}</span>
          </div>
          
          {deadline && (
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="h-4 w-4 mr-1 text-gray-400" />
              <span>Apply by {formatDate(deadline)}</span>
            </div>
          )}
          
          {!compact && (
            <div className="flex items-center text-gray-600 text-sm">
              <Users className="h-4 w-4 mr-1 text-gray-400" />
              <span>{applicationCount} applicants</span>
            </div>
          )}
        </div>
        
        {!compact && skills.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.slice(0, 3).map((skill, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-5 flex justify-between items-center">
          <Link to={`/jobs/${id}`}>
            <Button color="primary" size="sm">
              View Details
            </Button>
          </Link>
          
          <button className="text-gray-400 hover:text-blue-600 transition-colors text-sm">
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;