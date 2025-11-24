export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  caseStudy?: {
    challenge: string;
    solution: string;
    results: string[];
    techStack: string[];
    duration: string;
    team: string;
  };
}

export const projects: Project[] = [
  {
    id: 'docscan-ai',
    title: 'DocScan AI',
    description: 'AI-powered document scanning and extraction system',
    longDescription: 'Advanced AI application that automatically scans and extracts data from tax invoices, tax deduction receipts, and bank statements, converting them into structured Excel format. Built with cutting-edge OCR and machine learning technology for accurate document processing.',
    category: 'AI/ML',
    tags: ['AI', 'Machine Learning', 'OCR', 'Python', 'Computer Vision', 'Excel Automation'],
    featured: true,
    caseStudy: {
      challenge: 'Manual data entry from financial documents was time-consuming, error-prone, and required significant human resources. Processing thousands of invoices and receipts monthly created bottlenecks in the accounting workflow.',
      solution: 'Developed an AI-powered document processing system using advanced OCR and machine learning models to automatically extract data from various document types. Implemented intelligent field recognition, data validation, and Excel export functionality.',
      results: [
        'Reduced document processing time by 95%',
        'Achieved 98% accuracy in data extraction',
        'Processed 10,000+ documents monthly',
        'Saved 200+ hours of manual work per month',
      ],
      techStack: ['Python', 'TensorFlow', 'OpenCV', 'Tesseract OCR', 'Pandas', 'FastAPI'],
      duration: '4 months',
      team: 'Solo Developer + 1 ML Engineer',
    },
  },
  {
    id: 'sianggar',
    title: 'Sianggar',
    description: 'Comprehensive budgeting and accounting management platform',
    longDescription: 'Enterprise-grade financial management system featuring budget planning, multi-level approval workflows, and complete accounting functionality. Integrated with Odoo 18 for seamless accounting operations, designed for organizations requiring robust financial controls.',
    category: 'Web App',
    tags: ['Next.js', 'PostgreSQL', 'Finance', 'Accounting', 'Approval System', 'ERP Integration'],
    featured: true,
  },
  {
    id: 'simaya',
    title: 'Simaya',
    description: 'Intelligent asset management and tracking system',
    longDescription: 'Full-featured asset management platform for tracking organizational assets, maintenance schedules, depreciation calculations, and asset lifecycle management. Provides real-time visibility into asset status, location, and utilization across the organization.',
    category: 'Web App',
    tags: ['Asset Management', 'React', 'Node.js', 'Database', 'Tracking', 'Reporting'],
    featured: true,
  },
  {
    id: 'simonas',
    title: 'Simonas',
    description: 'Dormitory monitoring and activity summary platform',
    longDescription: 'Comprehensive dormitory management system for monitoring resident activities, attendance tracking, and generating detailed activity summaries. Features real-time notifications, reporting dashboards, and administrative tools for efficient dormitory operations.',
    category: 'Web App',
    tags: ['Monitoring', 'Dashboard', 'Real-time', 'TypeScript', 'Reporting', 'Management'],
    featured: true,
  },
  {
    id: 'odoo18',
    title: 'Odoo 18 Integration',
    description: 'Custom Odoo accounting system with Sianggar integration',
    longDescription: 'Tailored Odoo 18 accounting implementation with custom modules and seamless integration with Sianggar budget management system. Provides end-to-end financial workflow from budgeting to accounting, with automated data synchronization and reporting capabilities.',
    category: 'Enterprise',
    tags: ['Odoo', 'ERP', 'Accounting', 'Python', 'Integration', 'Custom Modules'],
    featured: false,
  },
  {
    id: 'tenjo',
    title: 'Tenjo',
    description: 'Employee monitoring and browser activity tracker',
    longDescription: 'Productivity monitoring solution that tracks employee work activities, browser usage, and URL access patterns. Generates comprehensive summaries and analytics to help organizations understand work patterns, optimize productivity, and ensure compliance with usage policies.',
    category: 'Web App',
    tags: ['Monitoring', 'Analytics', 'Employee Tracking', 'Dashboard', 'Productivity', 'Reporting'],
    featured: false,
  },
  {
    id: 'e-clean',
    title: 'E-Clean',
    description: 'Cleaning staff monitoring and performance tracking',
    longDescription: 'Digital platform for managing cleaning operations with real-time staff monitoring, task assignment, performance tracking, and automated reporting. Streamlines cleaning service management with location tracking, task verification, and quality assurance features.',
    category: 'Web App',
    tags: ['Service Management', 'GPS Tracking', 'Task Management', 'Mobile', 'Real-time', 'Reporting'],
    featured: false,
  },
];

export const categories = ['All', 'Web App', 'AI/ML', 'Enterprise'];

export const featuredProjects = projects.filter(p => p.featured);
