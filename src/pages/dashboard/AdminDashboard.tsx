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
  Building,
  BarChart,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import { mockFeaturedJobs } from '../../lib/mockData';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Define dashboard routes
  const routes = [
    { name: 'Overview', path: '/admin', icon: Home },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Jobs', path: '/admin/jobs', icon: Briefcase },
    { name: 'Companies', path: '/admin/companies', icon: Building },
    { name: 'Reports', path: '/admin/reports', icon: BarChart },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
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
                    <p className="text-gray-600">Administrator</p>
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
                              ? 'bg-indigo-50 text-indigo-700'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className={`h-5 w-5 mr-3 ${active ? 'text-indigo-600' : 'text-gray-500'}`} />
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
              <Route path="/" element={<AdminOverview />} />
              <Route path="/users" element={<AdminUsers />} />
              <Route path="/jobs" element={<AdminJobs />} />
              <Route path="/companies" element={<AdminCompanies />} />
              <Route path="/reports" element={<AdminReports />} />
              <Route path="/settings" element={<AdminSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminOverview: React.FC = () => {
  const { user } = useAuth();
  
  // Generate a random statistic
  const randomStat = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  // Sample data for charts
  const monthlyUsers = [150, 220, 270, 310, 350, 420, 480, 520, 550, 600, 670, 720];
  const monthlyJobs = [50, 80, 110, 130, 160, 190, 210, 240, 260, 290, 320, 350];
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-gray-600 mb-6">
            Here's an overview of the platform statistics and activities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-800 mb-1">Total Users</h3>
              <p className="text-3xl font-bold text-indigo-900">8,254</p>
              <p className="text-sm text-indigo-700">↑ 12% from last month</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-1">Active Jobs</h3>
              <p className="text-3xl font-bold text-green-900">1,432</p>
              <p className="text-sm text-green-700">↑ 8% from last month</p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-amber-800 mb-1">Applications</h3>
              <p className="text-3xl font-bold text-amber-900">12,876</p>
              <p className="text-sm text-amber-700">↑ 15% from last month</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-1">Companies</h3>
              <p className="text-3xl font-bold text-blue-900">684</p>
              <p className="text-sm text-blue-700">↑ 5% from last month</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
              <div className="h-60 w-full">
                <div className="flex h-48 items-end space-x-2">
                  {monthlyUsers.map((value, index) => (
                    <div 
                      key={index} 
                      className="flex-1 bg-indigo-500 rounded-t"
                      style={{ height: `${(value / Math.max(...monthlyUsers)) * 100}%` }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Postings</h3>
              <div className="h-60 w-full">
                <div className="flex h-48 items-end space-x-2">
                  {monthlyJobs.map((value, index) => (
                    <div 
                      key={index} 
                      className="flex-1 bg-green-500 rounded-t"
                      style={{ height: `${(value / Math.max(...monthlyJobs)) * 100}%` }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h3>
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: "65%" }}>
                    Students (65%)
                  </div>
                </div>
                <div className="bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-purple-600 text-xs font-medium text-purple-100 text-center p-0.5 leading-none rounded-full" style={{ width: "30%" }}>
                    Recruiters (30%)
                  </div>
                </div>
                <div className="bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-amber-600 text-xs font-medium text-amber-100 text-center p-0.5 leading-none rounded-full" style={{ width: "5%" }}>
                    Admins (5%)
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Job Categories</h3>
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-green-600 text-xs font-medium text-green-100 text-center p-0.5 leading-none rounded-full" style={{ width: "40%" }}>
                    Technology (40%)
                  </div>
                </div>
                <div className="bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: "25%" }}>
                    Marketing (25%)
                  </div>
                </div>
                <div className="bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 text-xs font-medium text-indigo-100 text-center p-0.5 leading-none rounded-full" style={{ width: "20%" }}>
                    Finance (20%)
                  </div>
                </div>
                <div className="bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-red-600 text-xs font-medium text-red-100 text-center p-0.5 leading-none rounded-full" style={{ width: "15%" }}>
                    Others (15%)
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-gray-700">System Uptime</span>
                    <span className="text-gray-900 font-medium">99.9%</span>
                  </div>
                  <div className="bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "99.9%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-gray-700">Response Time</span>
                    <span className="text-gray-900 font-medium">230ms</span>
                  </div>
                  <div className="bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-gray-700">Error Rate</span>
                    <span className="text-gray-900 font-medium">0.05%</span>
                  </div>
                  <div className="bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "99.5%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 rounded-full p-2">
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-gray-900">New user <span className="font-medium">Sarah Johnson</span> registered as a student</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 rounded-full p-2">
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-gray-900"><span className="font-medium">TechCorp</span> posted a new job: <span className="font-medium">Frontend Developer</span></p>
                <p className="text-sm text-gray-500">3 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 rounded-full p-2">
                <Shield className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-gray-900">Suspicious login attempt detected for user <span className="font-medium">john.doe@example.com</span></p>
                <p className="text-sm text-gray-500">5 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full p-2">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-900">New company <span className="font-medium">InnovateTech</span> registered on the platform</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminUsers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const tabItems = [
    { id: 'all', label: 'All Users' },
    { id: 'students', label: 'Students' },
    { id: 'recruiters', label: 'Recruiters' },
    { id: 'admins', label: 'Admins' },
  ];
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Users</h1>
            <p className="text-gray-600">
              View and manage all users on the platform.
            </p>
          </div>
          <div className="flex gap-2">
            <Button color="outline-primary">
              <FileText className="h-5 w-5 mr-2" />
              Export
            </Button>
            <Button color="primary">
              <PlusCircle className="h-5 w-5 mr-2" />
              Add User
            </Button>
          </div>
        </div>
        
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
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
          <div className="flex justify-between mb-4">
            <div className="relative w-64">
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search users..."
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Show:</label>
              <select className="border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option>10 entries</option>
                <option>25 entries</option>
                <option>50 entries</option>
                <option>100 entries</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Student
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Apr 15, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    3 hours ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button color="outline-primary" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
                
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      Recruiter
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Mar 22, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1 day ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button color="outline-primary" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
                
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Student
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Inactive
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Feb 10, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    30 days ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button color="outline-primary" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
                
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600"
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Emily Chen
                        </div>
                        <div className="text-sm text-gray-500">
                          emily.chen@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      Admin
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Jan 05, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    5 hours ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button color="outline-primary" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">8,254</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                ...
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminJobs: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Jobs</h1>
      <p className="text-gray-600">
        Review and moderate job listings.
      </p>
    </div>
    
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <div className="relative w-64">
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search jobs..."
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button color="outline-primary">
            <FileText className="h-5 w-5 mr-2" />
            Export
          </Button>
          <Button color="primary">
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Job
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posted Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockFeaturedJobs.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{job.title}</div>
                  <div className="text-xs text-gray-500">{job.jobType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{job.companyName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{job.location}</div>
                  <div className="text-xs text-gray-500">{job.locationType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{new Date(job.postedDate).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button color="outline-primary" size="sm">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">1,432</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            ...
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AdminCompanies: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Companies</h1>
      <p className="text-gray-600">
        View and manage registered companies.
      </p>
    </div>
    
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <div className="relative w-64">
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search companies..."
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button color="outline-primary">
            <FileText className="h-5 w-5 mr-2" />
            Export
          </Button>
          <Button color="primary">
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Company
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
              <Building className="h-10 w-10 text-gray-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">TechCorp</h3>
              <p className="text-sm text-gray-600">Technology / Software Development</p>
              <div className="flex mt-2 space-x-4">
                <span className="text-xs text-gray-500">San Francisco, CA</span>
                <span className="text-xs text-gray-500">1000-5000 employees</span>
              </div>
            </div>
            <div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Verified</span>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button color="outline-primary" size="sm">View</Button>
            <Button color="outline-secondary" size="sm">Edit</Button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
              <Building className="h-10 w-10 text-gray-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">AnalyticsPro</h3>
              <p className="text-sm text-gray-600">Data Science / Analytics</p>
              <div className="flex mt-2 space-x-4">
                <span className="text-xs text-gray-500">Boston, MA</span>
                <span className="text-xs text-gray-500">500-1000 employees</span>
              </div>
            </div>
            <div>
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button color="outline-primary" size="sm">View</Button>
            <Button color="outline-secondary" size="sm">Edit</Button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
              <Building className="h-10 w-10 text-gray-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">GlobalFinance</h3>
              <p className="text-sm text-gray-600">Finance / Investment</p>
              <div className="flex mt-2 space-x-4">
                <span className="text-xs text-gray-500">Chicago, IL</span>
                <span className="text-xs text-gray-500">5000-10000 employees</span>
              </div>
            </div>
            <div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Verified</span>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button color="outline-primary" size="sm">View</Button>
            <Button color="outline-secondary" size="sm">Edit</Button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
              <Building className="h-10 w-10 text-gray-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">EcoSolutions</h3>
              <p className="text-sm text-gray-600">Environmental / Sustainability</p>
              <div className="flex mt-2 space-x-4">
                <span className="text-xs text-gray-500">Portland, OR</span>
                <span className="text-xs text-gray-500">100-500 employees</span>
              </div>
            </div>
            <div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Verified</span>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button color="outline-primary" size="sm">View</Button>
            <Button color="outline-secondary" size="sm">Edit</Button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">684</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            ...
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AdminReports: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
      <p className="text-gray-600">
        View detailed analytics and generate reports.
      </p>
    </div>
    
    <div className="p-6">
      <div className="mb-6 flex flex-wrap gap-4">
        <Button color="primary">
          <BarChart className="h-5 w-5 mr-2" />
          Generate Report
        </Button>
        <Button color="outline-primary">
          <FileText className="h-5 w-5 mr-2" />
          Export Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Registration</h3>
          <div className="h-60 w-full">
            {/* Chart would go here - using a simple placeholder */}
            <div className="bg-indigo-50 h-full w-full rounded-lg flex items-center justify-center">
              <BarChart className="h-12 w-12 text-indigo-500" />
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Applications</h3>
          <div className="h-60 w-full">
            {/* Chart would go here - using a simple placeholder */}
            <div className="bg-green-50 h-full w-full rounded-lg flex items-center justify-center">
              <BarChart className="h-12 w-12 text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Job Categories</h3>
          <div className="h-60 w-full">
            {/* Chart would go here - using a simple placeholder */}
            <div className="bg-blue-50 h-full w-full rounded-lg flex items-center justify-center">
              <PieChart className="h-12 w-12 text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
          <div className="h-60 w-full">
            {/* Chart would go here - using a simple placeholder */}
            <div className="bg-amber-50 h-full w-full rounded-lg flex items-center justify-center">
              <Globe className="h-12 w-12 text-amber-500" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Monthly User Activity</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Analytics
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Emily Chen</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Apr 01, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button color="outline-primary" size="sm">
                    View
                  </Button>
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Job Posting Performance</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Performance
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">John Smith</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Mar 25, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button color="outline-primary" size="sm">
                    View
                  </Button>
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Quarterly Financial Summary</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                    Financial
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Emily Chen</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Mar 15, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
  </div>
);

const AdminSettings: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">System Settings</h1>
      <p className="text-gray-600">
        Configure platform settings and permissions.
      </p>
    </div>
    
    <div className="p-6">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform Name
                </label>
                <input
                  type="text"
                  defaultValue="CareerConnect"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  defaultValue="support@careerconnect.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Language
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Zone
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="utc">UTC</option>
                  <option value="est">Eastern Time (EST)</option>
                  <option value="cst">Central Time (CST)</option>
                  <option value="pst">Pacific Time (PST)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Password Requirements</h4>
                <p className="text-sm text-gray-600">Enforce strong password policy</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Account Lockout</h4>
                <p className="text-sm text-gray-600">Lock accounts after failed login attempts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SMTP Server
              </label>
              <input
                type="text"
                defaultValue="smtp.example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SMTP Port
              </label>
              <input
                type="text"
                defaultValue="587"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SMTP Username
              </label>
              <input
                type="text"
                defaultValue="noreply@careerconnect.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SMTP Password
              </label>
              <input
                type="password"
                defaultValue="••••••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">API Settings</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">API Key</h4>
                  <p className="text-gray-600 text-sm mt-1">Use this key to access the CareerConnect API</p>
                </div>
                <div>
                  <Button color="outline-primary" size="sm">
                    Generate New Key
                  </Button>
                </div>
              </div>
              <div className="mt-3 flex">
                <input
                  type="text"
                  readOnly
                  value="sk_live_xxxxxxxxxxxxxxxxxxxx"
                  className="flex-1 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-100"
                />
                <button className="px-3 py-2 border border-gray-300 bg-white rounded-r-md hover:bg-gray-50">
                  Copy
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">API Rate Limiting</h4>
                <p className="text-sm text-gray-600">Limit API requests per minute</p>
              </div>
              <input
                type="number"
                defaultValue="60"
                min="10"
                max="1000"
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200 flex gap-3">
          <Button
            type="button"
            color="primary"
          >
            Save Changes
          </Button>
          
          <Button
            type="button"
            color="outline-primary"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;