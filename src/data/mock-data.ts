
// This file contains mock data for demonstration purposes
// In a real application, this would be fetched from Supabase

export interface ProductData {
  id: string;
  title: string;
  builderName: string;
  shortDescription: string;
  description: string;
  image: string;
  techStack: string[];
  features: string[];
  pricing?: string;
  demoLink?: string;
  builderNotes?: string;
  additionalImages?: string[];
  votes: number;
}

export const MOCK_PRODUCTS: ProductData[] = [
  {
    id: "product-1",
    title: "TaskFlow",
    builderName: "Harry",
    shortDescription: "AI-powered task management that adapts to your workflow",
    description: "TaskFlow is an AI-powered task management platform that adapts to your personal workflow. Instead of forcing you to change how you work, TaskFlow learns from your habits and suggests optimizations to boost your productivity. It features natural language task creation, smart prioritization, and integrates with tools you already use.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    techStack: ["React", "TypeScript", "Node.js", "OpenAI", "Supabase"],
    features: [
      "AI-powered task analysis and prioritization",
      "Natural language processing for task creation",
      "Adaptive workflow suggestions",
      "Integration with popular tools (Slack, Gmail, Notion)",
      "Personalized productivity insights",
      "Collaborative team workspaces"
    ],
    pricing: "Free plan with premium features starting at $8/month",
    demoLink: "https://taskflow-demo.example.com",
    builderNotes: "I built TaskFlow to solve my own frustrations with task management apps that forced me to adapt to their rigid systems. The key innovation is using AI to understand your natural workflow patterns and enhance them, rather than replacing them.",
    additionalImages: [
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    votes: 48
  },
  {
    id: "product-2",
    title: "CodeBuddy",
    builderName: "Marcos",
    shortDescription: "Pair programming AI that helps you write better code faster",
    description: "CodeBuddy is your AI pair programming companion that helps developers write better code, faster. It understands your codebase context, suggests improvements, explains complex code, and helps refactor legacy systems. Unlike basic code generators, CodeBuddy provides thoughtful explanations and helps you learn while coding.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    techStack: ["Python", "TensorFlow", "FastAPI", "Vue.js", "Docker"],
    features: [
      "Contextual code suggestions and explanations",
      "Code refactoring assistant",
      "Bug detection and fix recommendations",
      "Multiple programming language support",
      "Git integration",
      "Team collaboration features"
    ],
    pricing: "$12/month for individual developers, $29/month for team accounts",
    demoLink: "https://codebuddy-demo.example.com",
    builderNotes: "As a developer, I was tired of generic AI code solutions that didn't understand my specific codebase or work with my style. CodeBuddy is built to be a true collaborator that learns your patterns and enhances your abilities instead of trying to replace them.",
    additionalImages: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    votes: 42
  }
];

export const CURRENT_WEEK = {
  id: "week-1",
  theme: "AI Productivity Tools",
  startDate: new Date("2025-04-15T00:00:00"),
  endDate: new Date("2025-04-21T20:00:00"), // Sunday 8PM ET
  status: "active", // "draft", "active", "completed"
  products: MOCK_PRODUCTS
};

export const PREVIOUS_WEEKS = [
  {
    id: "week-0",
    theme: "Personal Finance Apps",
    winner: "MoneyTracker by Marcos",
    runnerUp: "BudgetWise by Harry",
    date: "April 7-14, 2025"
  },
  {
    id: "week-minus-1",
    theme: "Email Automation Tools",
    winner: "MailGenius by Harry",
    runnerUp: "AutoBox by Marcos",
    date: "March 31 - April 7, 2025"
  },
  {
    id: "week-minus-2",
    theme: "Knowledge Management",
    winner: "BrainBox by Marcos",
    runnerUp: "InsightHub by Harry",
    date: "March 24-31, 2025"
  }
];

export const BUILDERS = [
  {
    name: "Harry",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Full-stack developer specializing in React and Node.js. Harry loves building practical tools that solve real problems and has been coding for over 8 years.",
    wins: 12,
    products: 28,
    socialLinks: {
      twitter: "https://twitter.com/harry",
      github: "https://github.com/harry"
    }
  },
  {
    name: "Marcos",
    avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Design-focused developer who bridges the gap between beautiful UIs and solid backend architecture. Marcos has a background in UX research and Python development.",
    wins: 16,
    products: 28,
    socialLinks: {
      twitter: "https://twitter.com/marcos",
      github: "https://github.com/marcos"
    }
  }
];
