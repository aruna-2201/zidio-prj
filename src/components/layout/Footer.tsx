import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">CareerConnect</h3>
            <p className="text-sm">
              Connecting talented students with amazing career opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/jobs" className="hover:text-white transition-colors">Browse Jobs</a></li>
              <li><a href="/register" className="hover:text-white transition-colors">Sign Up</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">For Students</h3>
            <ul className="space-y-2">
              <li><a href="/student/profile" className="hover:text-white transition-colors">Profile</a></li>
              <li><a href="/student/applications" className="hover:text-white transition-colors">Applications</a></li>
              <li><a href="/student/saved-jobs" className="hover:text-white transition-colors">Saved Jobs</a></li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">For Recruiters</h3>
            <ul className="space-y-2">
              <li><a href="/recruiter/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/recruiter/post-job" className="hover:text-white transition-colors">Post a Job</a></li>
              <li><a href="/recruiter/candidates" className="hover:text-white transition-colors">View Candidates</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} CareerConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;