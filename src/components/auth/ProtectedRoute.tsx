import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../lib/utils';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-4"></div>
          <p className="text-blue-800 text-lg font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has the required role
  const hasRequiredRole = user?.role && allowedRoles.includes(user.role);
  
  // Redirect to appropriate dashboard if authenticated but wrong role
  if (!hasRequiredRole) {
    const redirectTo = user?.role ? `/${user.role}` : '/';
    return <Navigate to={redirectTo} replace />;
  }
  
  // If everything is fine, render the children
  return <>{children}</>;
};

export default ProtectedRoute;