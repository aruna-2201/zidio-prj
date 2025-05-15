// Mock data for the job and internship portal

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  location: string;
  locationType: 'remote' | 'hybrid' | 'on-site';
  salaryRange?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: Date;
  deadline?: Date;
  jobType: 'full-time' | 'part-time' | 'internship' | 'contract';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  skills: string[];
  industry: string;
  benefits?: string[];
  applicationCount: number;
  isActive: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'accepted';
  appliedDate: Date;
  resumeUrl?: string;
  coverLetter?: string;
  notes?: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  industry: string;
  website: string;
  location: string;
  employeeCount: string;
  foundedYear?: number;
}

export const mockFeaturedJobs: Job[] = [
  {
    id: 'job-001',
    title: 'Frontend Developer',
    companyName: 'TechCorp',
    location: 'San Francisco, CA',
    locationType: 'hybrid',
    salaryRange: '$80,000 - $120,000',
    description: 'Join our dynamic team to create intuitive user interfaces and exceptional user experiences...',
    requirements: [
      'Proficient in React, TypeScript, and modern JavaScript',
      'Experience with responsive design and CSS frameworks',
      'Understanding of web accessibility standards',
      'Familiarity with version control systems like Git'
    ],
    responsibilities: [
      'Develop new user-facing features using React.js',
      'Build reusable components for future use',
      'Translate designs and wireframes into high-quality code',
      'Optimize components for maximum performance'
    ],
    postedDate: new Date('2023-04-10'),
    deadline: new Date('2023-05-15'),
    jobType: 'full-time',
    experienceLevel: 'mid',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind'],
    industry: 'Technology',
    benefits: [
      'Health, dental, and vision insurance',
      'Flexible working hours',
      'Remote work options',
      'Professional development budget'
    ],
    applicationCount: 37,
    isActive: true
  },
  {
    id: 'job-002',
    title: 'Data Science Intern',
    companyName: 'AnalyticsPro',
    location: 'Boston, MA',
    locationType: 'on-site',
    description: 'Exciting opportunity for students to gain hands-on experience in data analysis and machine learning...',
    requirements: [
      'Currently pursuing a degree in Computer Science, Statistics, or related field',
      'Familiarity with Python and data analysis libraries',
      'Basic understanding of machine learning concepts',
      'Strong analytical and problem-solving skills'
    ],
    responsibilities: [
      'Assist in data collection and preprocessing',
      'Develop and implement basic machine learning models',
      'Create visualizations to communicate insights',
      'Collaborate with the data science team on ongoing projects'
    ],
    postedDate: new Date('2023-04-05'),
    deadline: new Date('2023-05-20'),
    jobType: 'internship',
    experienceLevel: 'entry',
    skills: ['Python', 'Data Analysis', 'Machine Learning', 'Statistics'],
    industry: 'Data Science',
    applicationCount: 42,
    isActive: true
  },
  {
    id: 'job-003',
    title: 'Marketing Specialist',
    companyName: 'GlobalFinance',
    location: 'Chicago, IL',
    locationType: 'remote',
    salaryRange: '$60,000 - $80,000',
    description: 'We are seeking a creative and data-driven marketing specialist to join our growing team...',
    requirements: [
      'Bachelor\'s degree in Marketing, Communications, or related field',
      'Minimum 2 years of experience in digital marketing',
      'Experience with social media management and content creation',
      'Familiarity with marketing analytics tools'
    ],
    responsibilities: [
      'Develop and implement marketing strategies across multiple channels',
      'Create engaging content for social media and blog posts',
      'Analyze campaign performance and optimize based on data',
      'Collaborate with the design team on marketing materials'
    ],
    postedDate: new Date('2023-04-12'),
    jobType: 'full-time',
    experienceLevel: 'mid',
    skills: ['Digital Marketing', 'Content Creation', 'Analytics', 'Social Media'],
    industry: 'Finance',
    benefits: [
      'Competitive salary',
      'Performance bonuses',
      'Professional development opportunities',
      'Flexible working arrangements'
    ],
    applicationCount: 28,
    isActive: true
  }
];

export const mockCompanies: Company[] = [
  {
    id: 'company-001',
    name: 'TechCorp',
    description: 'Leading technology company focused on innovative solutions and software development.',
    industry: 'Technology',
    website: 'https://techcorp.example.com',
    location: 'San Francisco, CA',
    employeeCount: '1000-5000',
    foundedYear: 2005
  },
  {
    id: 'company-002',
    name: 'AnalyticsPro',
    description: 'Data analytics company providing insights and solutions to businesses worldwide.',
    industry: 'Data Science',
    website: 'https://analyticspro.example.com',
    location: 'Boston, MA',
    employeeCount: '500-1000',
    foundedYear: 2012
  },
  {
    id: 'company-003',
    name: 'GlobalFinance',
    description: 'International financial services firm with a focus on sustainable investments.',
    industry: 'Finance',
    website: 'https://globalfinance.example.com',
    location: 'Chicago, IL',
    employeeCount: '5000-10000',
    foundedYear: 1995
  }
];