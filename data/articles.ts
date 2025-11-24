export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedDate: string;
  readTime: string;
  featured: boolean;
  image?: string;
}

export const articles: Article[] = [
  {
    id: 'modern-web-development-2024',
    title: 'Modern Web Development in 2024: Trends & Best Practices',
    excerpt: 'Exploring the latest trends in web development, from AI integration to performance optimization techniques that are shaping the industry.',
    content: `
# Modern Web Development in 2024

The web development landscape is evolving rapidly. Here are the key trends:

## 1. AI Integration
AI is no longer optional - it's becoming a core feature in modern applications.

## 2. Performance First
Users expect blazing fast experiences. Core Web Vitals matter more than ever.

## 3. Type Safety
TypeScript adoption continues to grow, bringing safety and better DX.

## 4. Edge Computing
Moving computation closer to users with edge functions and CDNs.
    `,
    category: 'Web Development',
    tags: ['JavaScript', 'TypeScript', 'AI', 'Performance'],
    publishedDate: '2024-01-15',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 'ai-integration-nodejs',
    title: 'Building AI-Powered Applications with Node.js',
    excerpt: 'A comprehensive guide to integrating AI capabilities into your Node.js applications using modern libraries and APIs.',
    content: `
# Building AI-Powered Applications with Node.js

AI integration is transforming how we build applications.

## Getting Started

First, choose your AI provider - OpenAI, Anthropic, or open-source models.

## Implementation

Integrate AI features seamlessly into your existing Node.js stack.

## Best Practices

- Handle API rate limits
- Implement proper error handling
- Cache responses when possible
    `,
    category: 'AI & Machine Learning',
    tags: ['Node.js', 'AI', 'OpenAI', 'API'],
    publishedDate: '2024-02-20',
    readTime: '12 min read',
    featured: true,
  },
  {
    id: 'nextjs-performance-optimization',
    title: 'Next.js Performance Optimization: From Good to Great',
    excerpt: 'Learn advanced techniques to optimize your Next.js applications for maximum performance and better user experience.',
    content: `
# Next.js Performance Optimization

Take your Next.js app from good to great with these optimization techniques.

## Image Optimization

Use next/image for automatic optimization and lazy loading.

## Code Splitting

Leverage dynamic imports for better bundle sizes.

## Caching Strategies

Implement ISR and proper cache headers for optimal performance.
    `,
    category: 'Performance',
    tags: ['Next.js', 'Performance', 'Optimization', 'React'],
    publishedDate: '2024-03-10',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 'typescript-best-practices',
    title: 'TypeScript Best Practices for Enterprise Applications',
    excerpt: 'Essential TypeScript patterns and practices for building scalable and maintainable enterprise-level applications.',
    content: `
# TypeScript Best Practices

Building enterprise applications requires solid TypeScript foundations.

## Type System Mastery

Leverage advanced types like generics, conditional types, and mapped types.

## Project Structure

Organize your codebase for scalability and maintainability.

## Error Handling

Implement type-safe error handling patterns.
    `,
    category: 'TypeScript',
    tags: ['TypeScript', 'Best Practices', 'Enterprise', 'Architecture'],
    publishedDate: '2024-04-05',
    readTime: '15 min read',
    featured: false,
  },
  {
    id: 'flutter-cross-platform',
    title: 'Cross-Platform Mobile Development with Flutter',
    excerpt: 'Why Flutter is becoming the go-to choice for mobile developers and how to get started building beautiful apps.',
    content: `
# Cross-Platform Mobile Development with Flutter

Flutter is revolutionizing mobile app development.

## Why Flutter?

- Single codebase for iOS and Android
- Beautiful UI out of the box
- Hot reload for fast development

## Getting Started

Install Flutter SDK and start building your first app.

## Best Practices

Follow Flutter's widget composition patterns for maintainable code.
    `,
    category: 'Mobile Development',
    tags: ['Flutter', 'Mobile', 'Cross-Platform', 'Dart'],
    publishedDate: '2024-05-12',
    readTime: '9 min read',
    featured: false,
  },
];