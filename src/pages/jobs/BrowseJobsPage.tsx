import React, { useState } from 'react';
import { Search, Filter, MapPin, Briefcase, Clock, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import JobCard from '../../components/jobs/JobCard';
import Button from '../../components/ui/Button';
import { mockFeaturedJobs } from '../../lib/mockData';

const BrowseJobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [experienceLevelFilter, setExperienceLevelFilter] = useState('');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // All possible job types and experience levels for filters
  const jobTypes = ['full-time', 'part-time', 'internship', 'contract'];
  const experienceLevels = ['entry', 'mid', 'senior', 'executive'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call with the search parameters
    console.log('Searching for:', searchTerm, locationFilter, jobTypeFilter, experienceLevelFilter);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setJobTypeFilter('');
    setExperienceLevelFilter('');
  };

  // Count active filters
  const activeFiltersCount = [
    locationFilter, 
    jobTypeFilter, 
    experienceLevelFilter
  ].filter(Boolean).length;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Opportunity</h1>
            <p className="text-lg text-gray-600">
              Browse through our extensive collection of job listings and internship opportunities
            </p>
          </div>

          {/* Search Bar */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSearch}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Job title, keywords, or company"
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Location or remote"
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                  className="flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium"
                >
                  <Filter className="h-5 w-5 mr-1" />
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>
                <Button type="submit" color="primary">
                  Search
                </Button>
              </div>

              {/* Expanded Filters */}
              {isFiltersVisible && (
                <motion.div 
                  className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Type
                    </label>
                    <select
                      id="jobType"
                      value={jobTypeFilter}
                      onChange={(e) => setJobTypeFilter(e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Types</option>
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>
                          {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Level
                    </label>
                    <select
                      id="experienceLevel"
                      value={experienceLevelFilter}
                      onChange={(e) => setExperienceLevelFilter(e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Levels</option>
                      {experienceLevels.map((level) => (
                        <option key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Clear all filters
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Job Results */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {mockFeaturedJobs.length} Jobs Found
              </h2>
              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                Updated just now
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {mockFeaturedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-blue-600"
              >
                1
              </a>
              <a
                href="#"
                className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                2
              </a>
              <a
                href="#"
                className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                3
              </a>
              <span className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              <a
                href="#"
                className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Next
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseJobsPage;