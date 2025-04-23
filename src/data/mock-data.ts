// This file contains mock data for demonstration purposes
// In a real application, this would be fetched from Supabase
import { Product, WeekData } from "@/types/admin";

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

export const CURRENT_WEEK: WeekData = {
  id: "week-1",
  number: 1,
  theme: "AI Productivity Tools",
  startDate: new Date("2025-04-15T00:00:00"),
  endDate: new Date("2025-04-21T20:00:00"), // Sunday 8PM ET
  status: "active", // "draft", "active", "completed"
  products: MOCK_PRODUCTS as unknown as Product[],
  totalVotes: 90,
  winnerName: null,
  created_at: "2025-04-15T00:00:00"
};

export const PREVIOUS_WEEKS: WeekData[] = [
  {
    id: "week-0",
    number: 0,
    theme: "Personal Finance Apps",
    winnerName: "MoneyTracker by Marcos",
    startDate: new Date("2025-04-08T00:00:00"),
    endDate: new Date("2025-04-14T20:00:00"),
    status: "completed",
    products: [],
    created_at: "2025-04-08T00:00:00"
  },
  {
    id: "week-minus-1",
    number: -1,
    theme: "Email Automation Tools",
    winnerName: "MailGenius by Harry",
    startDate: new Date("2025-04-01T00:00:00"),
    endDate: new Date("2025-04-07T20:00:00"),
    status: "completed",
    products: [],
    created_at: "2025-04-01T00:00:00"
  },
  {
    id: "week-minus-2",
    number: -2,
    theme: "Knowledge Management",
    winnerName: "BrainBox by Marcos",
    startDate: new Date("2025-03-25T00:00:00"),
    endDate: new Date("2025-03-31T20:00:00"),
    status: "completed",
    products: [],
    created_at: "2025-03-25T00:00:00"
  },
  {
    id: "week-minus-3",
    number: -3,
    theme: "Website Builders",
    winnerName: "PageCraft by Harry",
    startDate: new Date("2025-03-18T00:00:00"),
    endDate: new Date("2025-03-24T20:00:00"),
    status: "completed",
    products: [],
    created_at: "2025-03-18T00:00:00"
  },
  {
    id: "week-minus-4",
    number: -4,
    theme: "eCommerce Solutions",
    winnerName: "ShopMaster by Marcos",
    startDate: new Date("2025-03-11T00:00:00"),
    endDate: new Date("2025-03-17T20:00:00"),
    status: "completed",
    products: [],
    created_at: "2025-03-11T00:00:00"
  },
  {
    id: "week-minus-5",
    number: -5,
    theme: "Social Media Tools",
    winnerName: "SocialFlow by Harry",
    startDate: new Date("2025-03-04T00:00:00"),
    endDate: new Date("2025-03-10T20:00:00"),
    status: "completed",
    products: [],
    created_at: "2025-03-04T00:00:00"
  },
  {
    id: "week-minus-6",
    number: -6,
    theme: "Project Management",
    winnerName: "TaskForce by Marcos",
    startDate: new Date("2025-02-26T00:00:00"),
    endDate: new Date("2025-03-03T20:00:00"),
    status: "completed",
    products: [],
    created_at: "2025-02-26T00:00:00"
  },
  {
    id: "week-minus-7",
    number: -7,
    theme: "Video Editing Tools",
    winnerName: "ClipMaster by Harry",
    startDate: new Date("2025-02-19T00:00:00"),
    endDate: new Date("2025-02-25T20:00:00"),
    status: "completed",
    products: [],
    created_at: "2025-02-19T00:00:00"
  },
  {
    id: "week-minus-8",
    number: -8,
    theme: "Note-Taking Apps",
    winnerName: "MemoPad by Marcos",
    startDate: new Date("2025-02-12T00:00:00"),
    endDate: new Date("2025-02-18T20:00:00"),
    status: "completed",
    products: [],
    created_at: "2025-02-12T00:00:00"
  },
  {
    id: "week-minus-9",
    number: -9,
    theme: "AI Writing Assistants",
    winnerName: "WordSmith by Harry",
    startDate: new Date("2025-02-05T00:00:00"),
    endDate: new Date("2025-02-11T20:00:00"),
    status: "completed",
    products: [],
    created_at: "2025-02-05T00:00:00"
  }
];

export const BUILDERS = [
  {
    name: "Harry",
    avatar: "/lovable-uploads/b93e6079-f7de-459d-b2f7-237ae698d76f.png",
    bio: "Fintech VC with a single-digit handicap*. Avid horseback rider, recovering Jeopardy contestant, and the best bad magician you'll ever meet at afters. *cap",
    wins: 12,
    products: 28,
    socialLinks: {
      twitter: "https://x.com/hnkioko",
      instagram: "https://www.instagram.com/harrykioko/",
      linkedin: "https://www.linkedin.com/in/harrisonkioko/"
    }
  },
  {
    name: "Marcos",
    avatar: "/lovable-uploads/04f69a9a-fed8-4b84-a2b4-ca270cdbf3f6.png",
    bio: "Amazon>>Via>>GoPuff>>Pinterest - this man can navigate a cliff. A poet, a lover, a cat dad with big lightskin energy.",
    wins: 16,
    products: 28,
    socialLinks: {
      twitter: "https://x.com/mjdymond",
      instagram: "https://www.instagram.com/mjdymond/",
      linkedin: "https://www.linkedin.com/in/mjdymond/"
    }
  }
];
