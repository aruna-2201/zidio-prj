import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, FileText, Bell, Settings, User, Home, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import JobCard from '../../components/jobs/JobCard';
import Button from '../../components/ui/Button';
import { mockFeaturedJobs } from '../../lib/mockData';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Define dashboard routes
  const routes = [
    { name: 'Overview', path: '/student', icon: Home },
    { name: 'Applications', path: '/student/applications', icon: Briefcase },
    { name: 'Profile', path: '/student/profile', icon: User },
    { name: 'Resume', path: '/student/resume', icon: FileText },
    { name: 'Notifications', path: '/student/notifications', icon: Bell },
    { name: 'Settings', path: '/student/settings', icon: Settings },
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
                    <p className="text-gray-600">Student</p>
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
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className={`h-5 w-5 mr-3 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
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
              <Route path="/" element={<StudentOverview />} />
              <Route path="/applications" element={<StudentApplications />} />
              <Route path="/profile" element={<StudentProfile />} />
              <Route path="/resume" element={<StudentResume />} />
              <Route path="/notifications" element={<StudentNotifications />} />
              <Route path="/settings" element={<StudentSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentOverview: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-gray-600 mb-6">
            Here's an overview of your job search activity and recommendations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-1">Applications</h3>
              <p className="text-3xl font-bold text-blue-900">3</p>
              <p className="text-sm text-blue-700">2 in review, 1 pending</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-1">Interviews</h3>
              <p className="text-3xl font-bold text-green-900">1</p>
              <p className="text-sm text-green-700">Scheduled for next week</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-1">Saved Jobs</h3>
              <p className="text-3xl font-bold text-purple-900">5</p>
              <p className="text-sm text-purple-700">2 new matches</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-8 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
            <Link to="/jobs" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all jobs →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockFeaturedJobs.slice(0, 2).map((job) => (
              <JobCard key={job.id} job={job} compact />
            ))}
          </div>
        </div>
      </div>
      
      {/* Complete Profile Prompt */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Complete Your Profile</h3>
            <p className="text-blue-700 mb-4">
              Improve your chances of getting hired by completing your profile. Add your education, experience, and skills.
            </p>
            <Link to="/student/profile">
              <Button color="primary" size="sm">
                Update Profile
              </Button>
            </Link>
          </div>
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-blue-600" />
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
              <div className="bg-blue-100 rounded-full p-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-900">You applied to <span className="font-medium">Frontend Developer</span> at TechCorp</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 rounded-full p-2">
                <Bell className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-gray-900">Your application status for <span className="font-medium">Data Science Intern</span> has been updated</p>
                <p className="text-sm text-gray-500">3 days ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 rounded-full p-2">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-900">You updated your resume</p>
                <p className="text-sm text-gray-500">5 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentApplications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const tabItems = [
    { id: 'all', label: 'All Applications (3)' },
    { id: 'pending', label: 'Pending (1)' },
    { id: 'review', label: 'In Review (2)' },
    { id: 'interview', label: 'Interview (0)' },
    { id: 'rejected', label: 'Rejected (0)' },
  ];
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">
            Track and manage all your job applications.
          </p>
        </div>
        
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
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
            {/* Application 1 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Frontend Developer</h3>
                  <p className="text-gray-600">TechCorp - San Francisco, CA</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">
                      Applied: Apr 15, 2023
                    </span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Status: In Review
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link to="/jobs/job-001">
                    <Button color="outline-primary" size="sm">
                      View Job
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Application 2 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Data Science Intern</h3>
                  <p className="text-gray-600">AnalyticsPro - Boston, MA</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">
                      Applied: Apr 10, 2023
                    </span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Status: In Review
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link to="/jobs/job-002">
                    <Button color="outline-primary" size="sm">
                      View Job
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Application 3 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Marketing Specialist</h3>
                  <p className="text-gray-600">GlobalFinance - Chicago, IL (Remote)</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">
                      Applied: Apr 5, 2023
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      Status: Pending
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link to="/jobs/job-003">
                    <Button color="outline-primary" size="sm">
                      View Job
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">
              Manage your personal and professional information.
            </p>
          </div>
          <Button
            color={isEditing ? "success" : "primary"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
        
        <div className="p-6">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row md:items-center mb-8">
            <div className="relative mb-4 md:mb-0 md:mr-6">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                alt={user?.name}
                className="h-24 w-24 rounded-full object-cover"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full">
                  <User className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Computer Science
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Front-end Development
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  React
                </span>
              </div>
            </div>
          </div>
          
          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  defaultValue={user?.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled={!isEditing}
                  defaultValue={user?.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  disabled={!isEditing}
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  defaultValue="San Francisco, CA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>
          
          {/* Education */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Education</h3>
              {isEditing && (
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  + Add Education
                </button>
              )}
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-900">Stanford University</h4>
                {isEditing && (
                  <button className="text-gray-400 hover:text-red-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-gray-600">Bachelor of Science in Computer Science</p>
              <p className="text-sm text-gray-500">2018 - 2022</p>
              <p className="text-sm text-gray-600 mt-2">GPA: 3.8/4.0</p>
            </div>
          </div>
          
          {/* Skills */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
              {isEditing && (
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  + Add Skill
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['JavaScript', 'React', 'TypeScript', 'HTML', 'CSS', 'Node.js', 'Git', 'UI/UX Design'].map((skill, index) => (
                <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
                  <span className="text-gray-800">{skill}</span>
                  {isEditing && (
                    <button className="ml-2 text-gray-400 hover:text-red-600">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Experience */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
              {isEditing && (
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  + Add Experience
                </button>
              )}
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-900">Web Development Intern</h4>
                {isEditing && (
                  <button className="text-gray-400 hover:text-red-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-gray-600">TechStart Inc.</p>
              <p className="text-sm text-gray-500">Jun 2021 - Aug 2021 • 3 months</p>
              <p className="text-sm text-gray-600 mt-2">
                Developed and maintained web applications using React and Node.js.
                Collaborated with the design team to implement responsive UI components.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentResume: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Resume</h1>
      <p className="text-gray-600">
        Manage and update your resume for job applications.
      </p>
    </div>
    
    <div className="p-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-center">
          <div className="mr-4">
            <FileText className="h-12 w-12 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-800">Resume_JohnDoe_2023.pdf</h3>
            <p className="text-blue-700 mb-2">Uploaded on April 2, 2023</p>
            <div className="flex space-x-3">
              <Button color="primary" size="sm">
                View Resume
              </Button>
              <Button color="outline-primary" size="sm">
                Replace
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Tips</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="inline-block bg-green-100 text-green-800 p-1 rounded-full mr-2">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span>Tailor your resume for each job application</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block bg-green-100 text-green-800 p-1 rounded-full mr-2">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span>Use keywords from the job description</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block bg-green-100 text-green-800 p-1 rounded-full mr-2">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span>Quantify your achievements with numbers when possible</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block bg-green-100 text-green-800 p-1 rounded-full mr-2">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span>Keep your resume to one or two pages</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block bg-green-100 text-green-800 p-1 rounded-full mr-2">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span>Use a clean, professional format</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const StudentNotifications: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
      <p className="text-gray-600">
        Stay updated with application status and new opportunities.
      </p>
    </div>
    
    <div className="p-6">
      <div className="space-y-4">
        <div className="flex p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
          <div className="mr-4">
            <Bell className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Application Status Update</h3>
            <p className="text-gray-600">Your application for Data Science Intern at AnalyticsPro is now being reviewed.</p>
            <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
          </div>
        </div>
        
        <div className="flex p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
          <div className="mr-4">
            <Briefcase className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">New Job Match</h3>
            <p className="text-gray-600">We found a new job that matches your profile: UI/UX Designer at DesignHub.</p>
            <p className="text-sm text-gray-500 mt-1">1 day ago</p>
          </div>
        </div>
        
        <div className="flex p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
          <div className="mr-4">
            <Bell className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Profile Reminder</h3>
            <p className="text-gray-600">Your profile is 75% complete. Add your education and skills to improve visibility.</p>
            <p className="text-sm text-gray-500 mt-1">2 days ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StudentSettings: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h1>
      <p className="text-gray-600">
        Manage your account preferences and privacy settings.
      </p>
    </div>
    
    <div className="p-6">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Job Recommendations</h4>
                <p className="text-sm text-gray-600">Receive personalized job matches based on your profile</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Application Updates</h4>
                <p className="text-sm text-gray-600">Notifications when your application status changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Marketing Communications</h4>
                <p className="text-sm text-gray-600">Receive news, tips, and promotional offers</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Profile Visibility</h4>
                <p className="text-sm text-gray-600">Allow recruiters to view your profile</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Resume Sharing</h4>
                <p className="text-sm text-gray-600">Allow employers to download your resume</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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

export default StudentDashboard;