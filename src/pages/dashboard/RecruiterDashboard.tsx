import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  FileText, 
  Bell, 
  Settings, 
  User, 
  Home, 
  ChevronRight,
  Users,
  PlusCircle,
  Building
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import { mockFeaturedJobs } from '../../lib/mockData';
import { formatDate } from '../../lib/utils';
import { toast } from '../../components/ui/Toaster';

const RecruiterDashboard: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Define dashboard routes
  const routes = [
    { name: 'Overview', path: '/recruiter', icon: Home },
    { name: 'Jobs', path: '/recruiter/jobs', icon: Briefcase },
    { name: 'Post Job', path: '/recruiter/post-job', icon: PlusCircle },
    { name: 'Applications', path: '/recruiter/applications', icon: FileText },
    { name: 'Company Profile', path: '/recruiter/company', icon: Building },
    { name: 'Notifications', path: '/recruiter/notifications', icon: Bell },
    { name: 'Settings', path: '/recruiter/settings', icon: Settings },
  ];
  
  // Check if the current path matches a route
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                    alt={user?.name}
                    className="h-14 w-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                    <p className="text-gray-600">Recruiter</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  {routes.map((route) => {
                    const Icon = route.icon;
                    const active = isActiveRoute(route.path);
                    
                    return (
                      <li key={route.path}>
                        <Link
                          to={route.path}
                          className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                            active
                              ? 'bg-purple-50 text-purple-700'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className={`h-5 w-5 mr-3 ${active ? 'text-purple-600' : 'text-gray-500'}`} />
                          <span className="font-medium">{route.name}</span>
                          {active && <ChevronRight className="h-4 w-4 ml-auto" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Routes>
              <Route path="/" element={<RecruiterOverview />} />
              <Route path="/jobs" element={<RecruiterJobs />} />
              <Route path="/post-job" element={<RecruiterPostJob />} />
              <Route path="/applications" element={<RecruiterApplications />} />
              <Route path="/company" element={<RecruiterCompany />} />
              <Route path="/notifications" element={<RecruiterNotifications />} />
              <Route path="/settings" element={<RecruiterSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecruiterOverview: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-gray-600 mb-6">
            Here's an overview of your recruitment activity.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-1">Active Jobs</h3>
              <p className="text-3xl font-bold text-purple-900">3</p>
              <p className="text-sm text-purple-700">2 open, 1 paused</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-1">Applications</h3>
              <p className="text-3xl font-bold text-green-900">28</p>
              <p className="text-sm text-green-700">12 new, 16 reviewed</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-1">Interviews</h3>
              <p className="text-3xl font-bold text-blue-900">5</p>
              <p className="text-sm text-blue-700">Scheduled this week</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-8 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Active Jobs</h2>
            <Link to="/recruiter/jobs" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
              View all jobs →
            </Link>
          </div>
          
          <div className="space-y-4">
            {mockFeaturedJobs.map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.location} • {job.locationType}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <span className="mr-4">Posted: {formatDate(job.postedDate)}</span>
                        <span>{job.applicationCount} applications</span>
                      </div>
                    </div>
                    <div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <Link to={`/recruiter/jobs`}>
                      <Button color="outline-primary" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Link to={`/recruiter/applications`} className="ml-2">
                      <Button color="outline-secondary" size="sm">
                        View Applications
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 rounded-full p-2">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-900">New application for <span className="font-medium">Frontend Developer</span></p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 rounded-full p-2">
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-gray-900">You posted a new job: <span className="font-medium">UX Designer</span></p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full p-2">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-900">Scheduled interview with <span className="font-medium">John Smith</span> for Data Science Intern</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecruiterJobs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  const tabItems = [
    { id: 'active', label: 'Active Jobs (3)' },
    { id: 'draft', label: 'Drafts (1)' },
    { id: 'paused', label: 'Paused (1)' },
    { id: 'closed', label: 'Closed (2)' },
  ];
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Jobs</h1>
            <p className="text-gray-600">
              View and manage all your job listings.
            </p>
          </div>
          <Link to="/recruiter/post-job">
            <Button color="primary">
              <PlusCircle className="h-5 w-5 mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>
        
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {mockFeaturedJobs.map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.location} • {job.locationType}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {job.jobType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                          Posted: {formatDate(job.postedDate)}
                        </span>
                        {job.deadline && (
                          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                            Deadline: {formatDate(job.deadline)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                        Active
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {job.applicationCount} applications
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button color="outline-primary" size="sm">
                      View Details
                    </Button>
                    <Button color="outline-secondary" size="sm">
                      View Applications
                    </Button>
                    <Button color="outline-primary" size="sm">
                      Edit
                    </Button>
                    <Button color="outline-danger" size="sm">
                      Pause
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const RecruiterPostJob: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Job posted successfully!');
    }, 1500);
  };
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post a New Job</h1>
          <p className="text-gray-600">
            Create a new job listing to attract qualified candidates.
          </p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title*
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., Frontend Developer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Type*
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select Job Type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Level*
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select Experience Level</option>
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="executive">Executive Level</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location*
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location Type*
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select Location Type</option>
                      <option value="on-site">On-site</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Range (Min)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., 80000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Range (Max)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., 120000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Description*
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Describe the job responsibilities, required qualifications, and company culture..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Requirements
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="List the key requirements for this position..."
                    ></textarea>
                    <p className="text-sm text-gray-500 mt-1">
                      Tip: Use bullet points for better readability (• Requirement one • Requirement two)
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills & Qualifications
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., React, TypeScript, Node.js, UI/UX (comma separated)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Benefits & Perks
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="List the benefits and perks offered with this position..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="resume"
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="resume" className="ml-2 block text-sm text-gray-700">
                      Require resume upload
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="coverLetter"
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="coverLetter" className="ml-2 block text-sm text-gray-700">
                      Require cover letter
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="screeningQuestions"
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="screeningQuestions" className="ml-2 block text-sm text-gray-700">
                      Add screening questions
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 flex gap-3">
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isSubmitting}
                >
                  Post Job
                </Button>
                
                <Button
                  type="button"
                  color="outline-primary"
                >
                  Save as Draft
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const RecruiterApplications: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Applications</h1>
      <p className="text-gray-600">
        Review and process candidate applications.
      </p>
    </div>
    
    <div className="p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Job
        </label>
        <select className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500">
          <option value="">All Jobs</option>
          <option value="job1">Frontend Developer</option>
          <option value="job2">Data Science Intern</option>
          <option value="job3">Marketing Specialist</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      John Smith
                    </div>
                    <div className="text-sm text-gray-500">
                      john.smith@example.com
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Frontend Developer</div>
                <div className="text-sm text-gray-500">Full-time</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Apr 15, 2023</div>
                <div className="text-sm text-gray-500">3 days ago</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  In Review
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button color="outline-primary" size="sm">
                  View
                </Button>
              </td>
            </tr>
            
            <tr>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      Sarah Johnson
                    </div>
                    <div className="text-sm text-gray-500">
                      sarah.johnson@example.com
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Data Science Intern</div>
                <div className="text-sm text-gray-500">Internship</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Apr 12, 2023</div>
                <div className="text-sm text-gray-500">6 days ago</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Interview
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button color="outline-primary" size="sm">
                  View
                </Button>
              </td>
            </tr>
            
            <tr>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      Michael Lee
                    </div>
                    <div className="text-sm text-gray-500">
                      michael.lee@example.com
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Marketing Specialist</div>
                <div className="text-sm text-gray-500">Full-time</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Apr 10, 2023</div>
                <div className="text-sm text-gray-500">8 days ago</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                  Pending
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button color="outline-primary" size="sm">
                  View
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const RecruiterCompany: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Profile</h1>
        <p className="text-gray-600">
          Manage your company information visible to candidates.
        </p>
      </div>
      <Button color="primary">
        Edit Profile
      </Button>
    </div>
    
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
          <Building className="h-16 w-16 text-gray-400" />
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">TechCorp</h2>
          <p className="text-gray-600 mb-4">Technology / Software Development</p>
          
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>1000-5000 employees</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              <a href="#" className="text-blue-600 hover:underline">techcorp.example.com</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Company</h3>
        <p className="text-gray-700 mb-4">
          TechCorp is a leading technology company focused on innovative solutions and software development. We specialize in creating cutting-edge web and mobile applications for businesses of all sizes.
        </p>
        <p className="text-gray-700">
          Founded in 2005, we've grown from a small startup to a global company with offices in multiple countries. Our mission is to empower businesses through technology and create software that makes a difference.
        </p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Culture</h3>
        <p className="text-gray-700 mb-4">
          At TechCorp, we believe in fostering a collaborative, inclusive, and innovative work environment. We value creativity, continuous learning, and work-life balance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">Our Values</h4>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Innovation and excellence</li>
              <li>Collaboration and teamwork</li>
              <li>Integrity and transparency</li>
              <li>Customer-centric approach</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Benefits & Perks</h4>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Competitive salary and equity packages</li>
              <li>Health, dental, and vision insurance</li>
              <li>Flexible working hours and remote options</li>
              <li>Professional development budget</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Open Positions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockFeaturedJobs.slice(0, 2).map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-1">{job.title}</h4>
              <p className="text-gray-600 text-sm mb-2">{job.location} • {job.jobType}</p>
              <Link to={`/jobs/${job.id}`}>
                <Button color="outline-primary" size="sm">
                  View
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const RecruiterNotifications: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
      <p className="text-gray-600">
        Stay updated with application status and new opportunities.
      </p>
    </div>
    
    <div className="p-6">
      <div className="space-y-4">
        <div className="flex p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
          <div className="mr-4">
            <Bell className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">New Application</h3>
            <p className="text-gray-600">John Smith applied for Frontend Developer position.</p>
            <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
          </div>
        </div>
        
        <div className="flex p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
          <div className="mr-4">
            <Bell className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Interview Reminder</h3>
            <p className="text-gray-600">Your interview with Sarah Johnson for Data Science Intern is scheduled tomorrow at 10:00 AM.</p>
            <p className="text-sm text-gray-500 mt-1">1 day ago</p>
          </div>
        </div>
        
        <div className="flex p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
          <div className="mr-4">
            <Bell className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Job Post Expiring</h3>
            <p className="text-gray-600">Your job post for Marketing Specialist will expire in 3 days. Consider extending it if you're still hiring.</p>
            <p className="text-sm text-gray-500 mt-1">2 days ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RecruiterSettings: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h1>
      <p className="text-gray-600">
        Manage your account preferences and notification settings.
      </p>
    </div>
    
    <div className="p-6">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">New Applications</h4>
                <p className="text-sm text-gray-600">Receive notifications when candidates apply to your jobs</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Application Status Changes</h4>
                <p className="text-sm text-gray-600">Receive notifications when application statuses change</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Job Expiry Reminders</h4>
                <p className="text-sm text-gray-600">Receive reminders when job postings are about to expire</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Marketing & Updates</h4>
                <p className="text-sm text-gray-600">Receive news, tips, and promotional content</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Change Password</h4>
              <Button color="outline-primary">Update Password</Button>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
              <Button color="outline-primary">Enable 2FA</Button>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription & Billing</h3>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-purple-800">Current Plan: Premium</h4>
                <p className="text-sm text-purple-700">10 active job postings, premium features</p>
              </div>
              <Button color="primary" size="sm">
                Manage Plan
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Billing Information</h4>
            <Button color="outline-primary">Update Billing Info</Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
          
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
            <p className="text-sm text-red-700 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button color="danger" size="sm">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RecruiterDashboard;