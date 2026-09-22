export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'AI & ML' | 'IoT & Robotics';
  description: string;
  fullDetails: string[];
  techStack: string[];
  metrics?: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  accentColor: 'lavender' | 'pink' | 'sky' | 'yellow';
}

export interface SkillItem {
  name: string;
  category: 'languages' | 'frameworks' | 'databases' | 'tools';
  level: 'Advanced' | 'Proficient' | 'Familiar';
  percentage: number;
  iconName: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  grade?: string;
  details: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  accent: 'lavender' | 'pink' | 'sky' | 'yellow';
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
