import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: string;
  readTime: number;
  published: boolean;
}

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
  getPublishedPosts: () => BlogPost[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const initialPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable Web Applications with React and Node.js',
    content: `# Building Scalable Web Applications with React and Node.js

In this comprehensive guide, I'll share my experience and best practices for building scalable web applications using React on the frontend and Node.js on the backend.

## Architecture Overview

When building scalable applications, architecture is crucial. Here's the approach I typically follow:

### Frontend Architecture (React)
- **Component-based design**: Break down UI into reusable components
- **State management**: Use Context API for simple state, Redux for complex applications
- **Code splitting**: Implement lazy loading for better performance
- **Type safety**: Use TypeScript for better development experience

### Backend Architecture (Node.js)
- **RESTful APIs**: Design clean, predictable API endpoints
- **Middleware pattern**: Use Express.js middleware for cross-cutting concerns
- **Database abstraction**: Implement repository pattern for data access
- **Error handling**: Centralized error handling and logging

## Key Principles

1. **Separation of Concerns**: Keep business logic separate from presentation
2. **Single Responsibility**: Each module should have one reason to change
3. **Dependency Injection**: Make your code testable and maintainable
4. **Configuration Management**: Keep environment-specific settings external

## Performance Optimization

### Frontend Optimizations
- Implement code splitting using React.lazy()
- Use React.memo for expensive components
- Optimize bundle size with tree shaking
- Implement proper caching strategies

### Backend Optimizations
- Use connection pooling for database connections
- Implement proper indexing strategies
- Use caching layers (Redis)
- Optimize API responses with compression

## Security Best Practices

Security should be built into your application from day one:

- **Authentication**: Implement JWT-based authentication
- **Authorization**: Use role-based access control
- **Input validation**: Validate all user inputs
- **HTTPS**: Always use HTTPS in production
- **Rate limiting**: Prevent abuse with rate limiting

## Deployment Strategies

For scalable applications, consider:

- **Containerization**: Use Docker for consistent deployments
- **CI/CD**: Automate testing and deployment pipelines
- **Load balancing**: Distribute traffic across multiple instances
- **Monitoring**: Implement comprehensive logging and monitoring

## Conclusion

Building scalable applications requires careful planning and adherence to best practices. The combination of React and Node.js provides a powerful foundation, but success depends on proper architecture, optimization, and deployment strategies.

Remember: premature optimization is the root of all evil, but ignoring scalability from the start can be costly later.`,
    excerpt: 'A comprehensive guide to building scalable web applications using modern React and Node.js best practices, covering architecture, performance, and deployment strategies.',
    tags: ['React', 'Node.js', 'Scalability', 'Architecture', 'Performance'],
    date: '2024-01-15',
    readTime: 8,
    published: true
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns for Better Code Quality',
    content: `# Advanced TypeScript Patterns for Better Code Quality

TypeScript has revolutionized JavaScript development by adding static type checking. In this post, I'll share advanced patterns that can significantly improve your code quality and developer experience.

## Utility Types and Conditional Types

TypeScript's utility types are powerful tools for type manipulation:

\`\`\`typescript
// Pick utility type
type UserSummary = Pick<User, 'id' | 'name' | 'email'>;

// Conditional types
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };
\`\`\`

## Generic Constraints

Use generic constraints to create more flexible yet type-safe functions:

\`\`\`typescript
interface Identifiable {
  id: string;
}

function updateEntity<T extends Identifiable>(
  entity: T, 
  updates: Partial<Omit<T, 'id'>>
): T {
  return { ...entity, ...updates };
}
\`\`\`

## Mapped Types

Create new types by transforming existing ones:

\`\`\`typescript
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};
\`\`\`

## Discriminated Unions

Model complex state with discriminated unions:

\`\`\`typescript
type LoadingState = 
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; error: string };
\`\`\`

These patterns help create more maintainable and type-safe applications.`,
    excerpt: 'Explore advanced TypeScript patterns including utility types, generic constraints, mapped types, and discriminated unions for better code quality.',
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Best Practices'],
    date: '2024-01-10',
    readTime: 6,
    published: true
  },
  {
    id: '3',
    title: 'Microservices Architecture: Lessons Learned',
    content: `# Microservices Architecture: Lessons Learned

After working with microservices for several years, I've learned valuable lessons about when to use them, how to design them, and what pitfalls to avoid.

## When to Choose Microservices

Microservices aren't always the right choice. Consider them when:

- Your team is large enough to support multiple services
- Different parts of your system have different scaling requirements
- You need technology diversity
- You have organizational boundaries that align with service boundaries

## Key Design Principles

### 1. Single Responsibility
Each service should have one reason to change and one business capability.

### 2. Decentralized Governance
Teams should own their services completely - from development to deployment to monitoring.

### 3. Failure Isolation
Design for failure. Services should be resilient to other services being down.

### 4. Data Ownership
Each service should own its data. Avoid shared databases.

## Common Pitfalls

1. **Distributed Monolith**: Creating too many interdependent services
2. **Premature Decomposition**: Breaking down before understanding the domain
3. **Inadequate Monitoring**: Not having proper observability across services
4. **Ignoring Network Latency**: Underestimating the cost of network calls

## Practical Implementation

Start with a monolith and extract services as needed. Use patterns like:

- **API Gateway**: Single entry point for clients
- **Circuit Breaker**: Prevent cascade failures
- **Saga Pattern**: Manage distributed transactions
- **Event Sourcing**: Maintain system state through events

The key is to evolve your architecture as your understanding of the domain grows.`,
    excerpt: 'Insights and lessons learned from implementing microservices architecture, including when to use them and common pitfalls to avoid.',
    tags: ['Microservices', 'Architecture', 'System Design', 'DevOps'],
    date: '2024-01-05',
    readTime: 7,
    published: true
  }
];

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, updatedPost: Partial<BlogPost>) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const getPost = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const getPublishedPosts = () => {
    return posts.filter(post => post.published).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const value: BlogContextType = {
    posts,
    addPost,
    updatePost,
    deletePost,
    getPost,
    getPublishedPosts,
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};