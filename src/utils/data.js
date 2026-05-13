// ===== MOCK DATA =====
// Replace these with real API calls from src/services/api.js

export const CURRENT_USER = {
  id: 'u1',
  name: 'Dubem',
  initials: 'DA',
  role: 'Full Stack Developer',
  avatar: null,
  xp: 7200,
  streak: 12,
  balance: 151500,
  isPro: false,
};

export const POSTS = [
  {
    id: 'p1',
    authorId: 'u2',
    author: 'Esther Daniel',
    initials: 'ED',
    avatarColor: ['#7c5cfc', '#ec4899'],
    isPro: true,
    time: '2h ago',
    category: 'Web Development',
    text: "Just finished building my personal portfolio website! 🎉\nNext up: Adding animations and dark mode.",
    mediaType: 'portfolio',
    likes: 124,
    comments: 32,
    likedByMe: true,
    likedByNames: 'John, Miracle and 122 others',
    likedByAvatars: ['JO', 'MI', 'KA'],
  },
  {
    id: 'p2',
    authorId: 'u3',
    author: 'David Okafor',
    initials: 'DO',
    avatarColor: ['#3b82f6', '#14b8a6'],
    isPro: false,
    time: '1d ago',
    category: 'UI/UX Design',
    text: 'Redesigned a mobile banking app concept.\nFeedbacks are welcome!',
    mediaType: 'banking',
    likes: 89,
    comments: 21,
    likedByMe: false,
    likedByNames: 'Ada, Ben and 87 others',
    likedByAvatars: ['AA', 'BB'],
  },
  {
    id: 'p3',
    authorId: 'u4',
    author: 'Chiamaka Nwosu',
    initials: 'CN',
    avatarColor: ['#22c55e', '#14b8a6'],
    isPro: true,
    time: '3d ago',
    category: 'Data Science',
    text: "Finally cracked a clean visualisation for Nigeria's GDP growth data 📊\nBuilt with Python + Matplotlib. Open to collaborations!",
    mediaType: null,
    likes: 201,
    comments: 47,
    likedByMe: false,
    likedByNames: 'Kemi, Tunde and 199 others',
    likedByAvatars: ['KE', 'TU', 'OA'],
  },
];

export const SKILLS = [
  { id: 's1', name: 'Web Development',   color: '#7c5cfc', count: 2341 },
  { id: 's2', name: 'UI/UX Design',      color: '#ec4899', count: 1892 },
  { id: 's3', name: 'Graphic Design',    color: '#22c55e', count: 1124 },
  { id: 's4', name: 'Mobile Development',color: '#3b82f6', count: 987  },
  { id: 's5', name: 'Data Science',      color: '#ef4444', count: 743  },
  { id: 's6', name: 'Cybersecurity',     color: '#f59e0b', count: 512  },
  { id: 's7', name: 'Cloud Computing',   color: '#14b8a6', count: 430  },
];

export const OPPORTUNITIES = [
  {
    id: 'o1',
    title: 'Build a landing page',
    price: '₦50,000',
    priceNum: 50000,
    tags: ['Web Development', 'Intermediate'],
    icon: '💻',
    postedBy: 'TechCorp NG',
    deadline: '5 days',
  },
  {
    id: 'o2',
    title: 'UI/UX Designer needed',
    price: '₦80,000',
    priceNum: 80000,
    tags: ['UI/UX Design', 'Intermediate'],
    icon: '🎨',
    postedBy: 'StartupHub',
    deadline: '3 days',
  },
  {
    id: 'o3',
    title: 'Fix website bugs',
    price: '₦30,000',
    priceNum: 30000,
    tags: ['Web Development', 'Beginner'],
    icon: '🔧',
    postedBy: 'SME Solutions',
    deadline: '7 days',
  },
  {
    id: 'o4',
    title: 'Build a data dashboard',
    price: '₦120,000',
    priceNum: 120000,
    tags: ['Data Science', 'Advanced'],
    icon: '📊',
    postedBy: 'FinTech Nigeria',
    deadline: '10 days',
  },
];

export const TOP_LEARNERS = [
  { id: 'l1', name: 'Miracle Dev',  initials: 'MD', xp: '12.5k', gradient: ['#f59e0b', '#ef4444'], rank: 1 },
  { id: 'l2', name: 'John Success', initials: 'JS', xp: '10.8k', gradient: ['#7c5cfc', '#ec4899'], rank: 2 },
  { id: 'l3', name: 'Precious UI',  initials: 'PU', xp: '9.2k',  gradient: ['#22c55e', '#14b8a6'], rank: 3 },
  { id: 'l4', name: 'Code Master',  initials: 'CM', xp: '8.7k',  gradient: ['#3b82f6', '#7c5cfc'], rank: 4 },
];

export const USER_PROGRESS = [
  { skill: 'Web Development',   percent: 75, color: '#7c5cfc' },
  { skill: 'UI/UX Design',      percent: 40, color: '#ec4899' },
  { skill: 'JavaScript Basics', percent: 60, color: '#3b82f6' },
];

export const COURSES = [
  {
    id: 'c1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Emeka Obi',
    level: 'Beginner',
    category: 'Web Development',
    duration: '24h',
    lessons: 84,
    enrolled: 3421,
    rating: 4.8,
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    color: '#7c5cfc',
    pages: [
      { title: 'Lesson 1: Foundations', content: 'Start with HTML structure, semantic tags, and responsive layout basics. Learn how to structure pages with headings, paragraphs, lists, images, and links while keeping mobile-first in mind.' },
      { title: 'Lesson 2: Styling with CSS', content: 'Explore CSS selectors, flexbox, and grid layout. Practice customizing colors, typography, spacing, and visual hierarchy to make static pages feel polished and consistent.' },
      { title: 'Lesson 3: JavaScript Essentials', content: 'Understand variables, functions, conditionals, loops, and events. Use JavaScript to make pages interactive with form validation, dynamic content updates, and simple animations.' },
      { title: 'Lesson 4: React Basics', content: 'Build reusable UI components using React. Learn about state, props, component composition, and how to render lists to create dynamic interfaces.' },
      { title: 'Lesson 5: Project Workflow', content: 'Combine HTML, CSS, and React into a complete web app. Review deployment best practices, source control with Git, and how to launch your first portfolio project online.' },
    ],
  },
  {
    id: 'c2',
    title: 'UI/UX Design Fundamentals',
    instructor: 'Amaka Styles',
    level: 'Beginner',
    category: 'UI/UX Design',
    duration: '16h',
    lessons: 52,
    enrolled: 2891,
    rating: 4.9,
    tags: ['Figma', 'Prototyping', 'User Research'],
    color: '#ec4899',
    pages: [
      { title: 'Lesson 1: Design Thinking', content: 'Learn the design thinking process: empathize, define, ideate, prototype, and test. Build empathy for users and turn insights into meaningful interface ideas.' },
      { title: 'Lesson 2: User Research', content: 'Use interviews, surveys, and personas to understand user needs. Translate research into design decisions that solve real problems for real people.' },
      { title: 'Lesson 3: Wireframes & Prototypes', content: 'Sketch interfaces, create low-fidelity wireframes, and move to interactive prototypes. Learn how to iterate quickly and test flows before visual design.' },
      { title: 'Lesson 4: Visual UI Principles', content: 'Explore color theory, typography, spacing, and accessibility. Build interfaces that feel clear, modern, and easy to use on web and mobile.' },
      { title: 'Lesson 5: Usability Testing', content: 'Run simple usability tests, collect feedback, and refine your screens. Learn how to measure success and communicate design improvements to stakeholders.' },
    ],
  },
  {
    id: 'c3',
    title: 'Data Science with Python',
    instructor: 'Bello Ibrahim',
    level: 'Intermediate',
    category: 'Data Science',
    duration: '32h',
    lessons: 108,
    enrolled: 1654,
    rating: 4.7,
    tags: ['Python', 'Pandas', 'ML'],
    color: '#ef4444',
    pages: [
      { title: 'Lesson 1: Python for Data', content: 'Get comfortable with Python basics, variables, data types, and lists. Use Pandas to load CSV data and inspect tables with head, describe, and info.' },
      { title: 'Lesson 2: Cleaning Data', content: 'Learn how to clean and transform data. Handle missing values, normalize columns, merge datasets, and prepare data for analysis.' },
      { title: 'Lesson 3: Exploratory Analysis', content: 'Use charts, summaries, and pivot tables to discover patterns. Visualize distributions, correlations, and trends with Python libraries.' },
      { title: 'Lesson 4: Machine Learning Intro', content: 'Understand supervised learning, training, and evaluation. Build a simple classification model and measure accuracy with test data.' },
      { title: 'Lesson 5: Communicating Insights', content: 'Turn analysis into stories. Create clear visual reports, highlight key findings, and recommend next steps based on data evidence.' },
    ],
  },
  {
    id: 'c4',
    title: 'Mobile App Development with React Native',
    instructor: 'Ngozi Adaeze',
    level: 'Intermediate',
    category: 'Mobile Development',
    duration: '20h',
    lessons: 67,
    enrolled: 1230,
    rating: 4.6,
    tags: ['React Native', 'JavaScript', 'iOS', 'Android'],
    color: '#3b82f6',
    pages: [
      { title: 'Lesson 1: App Setup', content: 'Set up React Native and configure your first mobile project. Learn how to run apps on simulators and physical devices.' },
      { title: 'Lesson 2: Components & Layouts', content: 'Build screens with View, Text, Image, and Touchable components. Use Flexbox to create responsive mobile layouts.' },
      { title: 'Lesson 3: Navigation', content: 'Add screen navigation with stack and tab navigators. Create flows for onboarding, profiles, and action pages.' },
      { title: 'Lesson 4: Data & State', content: 'Manage app state with hooks, fetch remote data, and display lists. Handle user input, loading states, and error feedback.' },
      { title: 'Lesson 5: Publish & Test', content: 'Prepare your app for release, test on devices, and review app store submission basics. Learn how to package builds for iOS and Android.' },
    ],
  },
  {
    id: 'c5',
    title: 'Cybersecurity Essentials',
    instructor: 'Tunde Chukwu',
    level: 'Intermediate',
    category: 'Cybersecurity',
    duration: '18h',
    lessons: 60,
    enrolled: 980,
    rating: 4.8,
    tags: ['Security', 'Networking', 'Ethical Hacking'],
    color: '#22c55e',
    pages: [
      { title: 'Lesson 1: Security Basics', content: 'Learn core cybersecurity concepts like confidentiality, integrity, and availability. Understand common threats and the role of security controls.' },
      { title: 'Lesson 2: Network Protection', content: 'Explore firewalls, VPNs, and secure network design. Learn how to protect traffic and identify suspicious activity on a network.' },
      { title: 'Lesson 3: Identity Management', content: 'Discover authentication, authorization, and password best practices. Learn how to secure accounts and manage access safely.' },
      { title: 'Lesson 4: Threat Detection', content: 'Learn how to spot malware, phishing, and social engineering attacks. Use simple tools to monitor systems and respond to incidents.' },
      { title: 'Lesson 5: Secure Habits', content: 'Build daily security habits for developers and users. Learn how to secure code, protect data, and keep systems safe in production.' },
    ],
  },
  {
    id: 'c6',
    title: 'Cloud Architecture Foundations',
    instructor: 'Grace Nnamani',
    level: 'Beginner',
    category: 'Cloud Computing',
    duration: '14h',
    lessons: 44,
    enrolled: 1140,
    rating: 4.7,
    tags: ['AWS', 'Azure', 'Cloud'],
    color: '#14b8a6',
    pages: [
      { title: 'Lesson 1: Cloud Concepts', content: 'Understand what cloud computing is and why teams use it. Learn about IaaS, PaaS, SaaS, and the benefits of scalability.' },
      { title: 'Lesson 2: Core Services', content: 'Explore compute, storage, and networking services in the cloud. Learn how each service fits into modern application architecture.' },
      { title: 'Lesson 3: Security in the Cloud', content: 'Learn shared responsibility, access control, and encryption basics. Discover how to protect cloud workloads and secure data at rest.' },
      { title: 'Lesson 4: Deployment Patterns', content: 'See how to deploy apps with containers, serverless functions, and virtual machines. Learn common patterns for resilient cloud systems.' },
      { title: 'Lesson 5: Cost Optimization', content: 'Review ways to control spending in the cloud. Learn about rightsizing, automation, and saving money while keeping performance strong.' },
    ],
  },
];

export const MESSAGES = [
  {
    id: 'm1',
    user: {
      name: 'Miracle Dev',
      initials: 'MD',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    },
    lastMessage: 'Hey! Saw your portfolio post. Can we collaborate?',
    time: '2m',
    unread: 3,
  },
  {
    id: 'm2',
    user: {
      name: 'Esther Daniel',
      initials: 'ED',
      gradient: 'linear-gradient(135deg, #7c5cfc, #ec4899)',
    },
    lastMessage: 'loved your comment on my portfolio post! 💜',
    time: '5m',
    unread: 1,
  },
  {
    id: 'm3',
    user: {
      name: 'David Okafor',
      initials: 'DO',
      gradient: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
    },
    lastMessage: 'liked your comment on their UI/UX design post',
    time: '12m',
    unread: 2,
  },
  {
    id: 'm4',
    user: {
      name: 'John Success',
      initials: 'JS',
      gradient: 'linear-gradient(135deg, #22c55e, #14b8a6)',
    },
    lastMessage: 'Check out this new JS framework I found 🔥',
    time: '1h',
    unread: 0,
  },
  {
    id: 'm5',
    user: {
      name: 'Chiamaka Nwosu',
      initials: 'CN',
      gradient: 'linear-gradient(135deg, #22c55e, #14b8a6)',
    },
    lastMessage: 'liked your post on their Data Science dashboard!',
    time: '2h',
    unread: 0,
  },
  {
    id: 'm6',
    user: {
      name: 'TechCorp NG',
      initials: 'TC',
      gradient: 'linear-gradient(135deg, #7c5cfc, #3b82f6)',
    },
    lastMessage: 'Your application for the landing page task has been received.',
    time: '3h',
    unread: 0,
  },
];

export const NAV_ITEMS = [
  { icon: 'home',          label: 'Home',          path: '/' },
  { icon: 'learn',         label: 'Learn',         path: '/learn' },
  { icon: 'challenge',     label: 'Challenges',    path: '/challenges' },
  { icon: 'community',     label: 'Community',     path: '/community' },
  { icon: 'opportunities', label: 'Opportunities', path: '/opportunities' },
  { icon: 'messages',      label: 'Messages',      path: '/messages' },
  { icon: 'bookmarks',     label: 'Bookmarks',     path: '/bookmarks' },
  { icon: 'wallet',        label: 'Wallet',        path: '/wallet' },
];

// Lowercase aliases for compatibility
export const currentUser = CURRENT_USER;
export const posts = POSTS;
export const skills = SKILLS;
export const opportunities = OPPORTUNITIES;
export const topLearners = TOP_LEARNERS;
export const userProgress = USER_PROGRESS;
export const courses = COURSES;
export const messages = MESSAGES;
export const navItems = NAV_ITEMS;
