import React from 'react';
import { Briefcase, Building, Globe, Activity, Zap, PieChart } from 'lucide-react';

interface CompanyLogoProps {
  name: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ name }) => {
  // Deterministically assign an icon based on company name
  const getIcon = () => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const icons = [Briefcase, Building, Globe, Activity, Zap, PieChart];
    const Icon = icons[hash % icons.length];
    
    return <Icon className="mr-2 h-5 w-5" />;
  };
  
  // Generate a deterministic color based on company name
  const getColorClass = () => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-amber-100 text-amber-800',
      'bg-cyan-100 text-cyan-800',
      'bg-rose-100 text-rose-800',
    ];
    
    return colors[hash % colors.length];
  };
  
  return (
    <div className={`flex items-center px-5 py-3 rounded-full ${getColorClass()}`}>
      {getIcon()}
      <span className="font-medium">{name}</span>
    </div>
  );
};

export default CompanyLogo;