export const hero = {
  name: 'Dylan Whitlock',
  title: 'Senior Software Engineer & AI Specialist',
  subtitle: 'Building intelligent enterprise solutions at the intersection of Salesforce architecture and artificial intelligence',
  cta: 'View My Work',
  ctaSecondary: 'Get In Touch',
}

export const about = {
  title: 'About Me',
  bio: `I'm a Senior Software Engineer based in Carthage, TX, with extensive experience architecting and implementing enterprise-scale solutions on the Salesforce platform. Currently at Litify, I lead development of advanced features using Lightning Web Components to enhance client legal management solutions.\n\nMy expertise spans the entire Salesforce ecosystem — from custom Apex development and Lightning Web Components to complex integrations, data architecture, and managed package deployment. I'm passionate about building high-quality, scalable solutions driven by best practices and a commitment to code quality.\n\nIn recent years, I've expanded my focus into AI and machine learning, building intelligent automation solutions and agent-based software. I work extensively with large language models including Claude, GPT, and local models, leveraging prompt engineering and AI integration to transform business processes and enhance user experiences.\n\nI hold multiple certifications including Salesforce Platform Developer I, Professional Scrum Master I, Professional Product Owner, and Professional Scrum Developer, reflecting my commitment to both technical excellence and agile delivery.`,
  stats: [
    { label: 'Years Experience', value: '8+' },
    { label: 'Certs', value: '4' },
    { label: 'Projects', value: '10+' },
    { label: 'Mentored Developers', value: '10+' },
  ],
}

export const experience = [
  {
    role: 'Senior Software Engineer',
    company: 'Litify',
    location: 'New York, NY',
    period: '2023 - Present',
    description: 'Leads development and delivery of advanced features on the Salesforce platform using Lightning Web Components (LWC) to enhance client legal management solutions. Designs and implements detailed technical solution documents, manages customer escalations, and maintains first-generation managed packages with seamless auto-upgrades. Integrates AI-powered features and agent-based workflows to automate complex legal processes.',
    technologies: ['Salesforce', 'Lightning Web Components', 'Apex', 'AI Integration', 'Agent Software', 'Prompt Engineering', 'Technical Architecture', 'Managed Packages'],
  },
  {
    role: 'Senior Salesforce Developer',
    company: 'GM Financial',
    location: 'Arlington, TX',
    period: '2020 - 2023',
    description: 'Developed and optimized Approval Center, reducing web request times from 30+ seconds to 1.4 seconds. Created third-party API projects in Heroku using Spring Framework in Java. Maintained 3 GMF Experience Cloud sites using custom Apex, Lightning Components, and Visualforce Pages. Provided mentorship to junior developers.',
    technologies: ['Salesforce', 'Apex', 'Lightning Components', 'Visualforce', 'Heroku', 'Java', 'Spring Framework', 'REST APIs'],
  },
  {
    role: 'Technical Lead',
    company: 'Fenway Group LLC',
    location: 'Moscow, ID',
    period: '2018 - 2020',
    description: 'Mentored and coached junior developers on best practices and Scrum processes. Established new company location and cultivated business relations with clients. Reviewed and identified code inefficiencies, reducing technical debt.',
    technologies: ['Technical Leadership', 'Scrum', 'Code Review', 'Team Mentoring', 'Business Development'],
  },
]

export const skills = {
  categories: [
    {
      name: 'AI & Machine Learning',
      items: [
        { name: 'Prompt Engineering', level: 90 },
        { name: 'Anthropic / Claude', level: 88 },
        { name: 'OpenAI / GPT', level: 85 },
        { name: 'Local Models (Gemma, Qwen)', level: 80 },
        { name: 'Agent Software Development', level: 82 },
        { name: 'AI Integration Patterns', level: 75 },
      ],
    },
    {
      name: 'Salesforce Platform',
      items: [
        { name: 'Apex', level: 95 },
        { name: 'Lightning Web Components', level: 90 },
        { name: 'Visualforce', level: 85 },
        { name: 'SOQL / SOSL', level: 90 },
        { name: 'Salesforce CLI', level: 85 },
        { name: 'Managed Packages', level: 80 },
      ],
    },
    {
      name: 'Web Technologies',
      items: [
        { name: 'JavaScript / ES6', level: 90 },
        { name: 'HTML / CSS', level: 85 },
        { name: 'REST APIs', level: 88 },
        { name: 'Java', level: 75 },
        { name: 'Spring Framework', level: 70 },
        { name: 'Python', level: 75 },
      ],
    },
    {
      name: 'Development Tools',
      items: [
        { name: 'VS Code', level: 90 },
        { name: 'Git', level: 90 },
        { name: 'Node.js', level: 80 },
        { name: 'Data Loader', level: 85 },
        { name: 'CI/CD Pipelines', level: 75 },
      ],
    },
    {
      name: 'Cloud & Platforms',
      items: [
        { name: 'Salesforce Cloud', level: 95 },
        { name: 'Digital Experiences', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'Heroku', level: 70 },
      ],
    },
    {
      name: 'Methodologies',
      items: [
        { name: 'Agile / Scrum', level: 90 },
        { name: 'Product Ownership', level: 85 },
        { name: 'Technical Leadership', level: 85 },
        { name: 'Code Quality & Best Practices', level: 95 },
      ],
    },
  ],
}

export const projects = [
  {
    name: 'Sats Calculator',
    description: 'A sleek, mobile-first Bitcoin calculator for converting between USD, BTC, and Sats in real-time. Features live price updates and intuitive UI.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Bitcoin API'],
    github: 'https://github.com/matt-dylan/sats-calculator',
    live: null,
    featured: true,
  },
  {
    name: 'Guitar Chord App',
    description: 'Interactive guitar chord learning tool with visual fretboard diagrams. Helps musicians learn and practice chords with visual feedback.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'SVG'],
    github: 'https://github.com/matt-dylan/guitar-chord-app',
    live: null,
    featured: true,
  },
  {
    name: 'Salesforce Examples',
    description: 'Collection of Salesforce development examples and best practices. Covers Apex, Lightning components, integration patterns, and more.',
    tech: ['Salesforce', 'Apex', 'Lightning', 'SOQL'],
    github: 'https://github.com/matt-dylan/Salesforce',
    live: null,
    featured: false,
  },
  {
    name: 'Express GraphQL API',
    description: 'Node.js Express server implementing GraphQL API with resolvers, type definitions, and data source integration.',
    tech: ['Node.js', 'Express', 'GraphQL', 'JavaScript'],
    github: 'https://github.com/matt-dylan/Express-GraphQL-API',
    live: null,
    featured: false,
  },
]

export const contact = {
  title: 'Get In Touch',
  subtitle: "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!",
  email: 'matthew.whitlock8@gmail.com',
  phone: '(318) 218-4396',
  location: 'Carthage, TX',
  socials: {
    github: 'https://github.com/matt-dylan',
    linkedin: 'https://www.linkedin.com/in/dylan-whitlock-49973a114',
    trailblazer: 'https://trailblazer.me/id/dwhitlock',
    website: 'https://mdwhitlock.netlify.app/',
  },
}
