import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export const mockRoles = ['student', 'recruiter', 'admin'] as const;
export type UserRole = (typeof mockRoles)[number];

export const mockAuth = {
  isAuthenticated: false,
  role: null as UserRole | null,
  login: (role: UserRole) => {
    mockAuth.isAuthenticated = true;
    mockAuth.role = role;
    return true;
  },
  logout: () => {
    mockAuth.isAuthenticated = false;
    mockAuth.role = null;
  },
};