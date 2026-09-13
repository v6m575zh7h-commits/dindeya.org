/**
 * Central configuration for the entire Dindeya application
 * All hardcoded values should be defined here for easy customization
 */

export const SITE_CONFIG = {
  // Basic Information
  organization: 'Dindeya Development & Support Org. Inc.',
  tagline: 'Community. Culture. Progress.',
  subtitle: 'Building Healthcare, Strengthening Communities',
  description: 'Dindeya Development & Support Org. Inc. - Community. Culture. Progress. Building healthcare infrastructure and community development in rural Guinea.',
  
  // URLs & Domain
  siteUrl: 'https://dindeya.org',
  contactEmail: 'info@dindeya.org',
  secondaryEmail: 'info@dindeya.org',
  phone: '862-300-7004',
  location: 'Newark, NJ, United States of America',
  
  // Social Media
  social: {
    facebook: 'https://facebook.com/dindeya',
    twitter: 'https://twitter.com/dindeya',
    instagram: 'https://www.instagram.com/dindeyaorg/',
    linkedin: 'https://www.linkedin.com/company/dindeya-development-and-support-organization/posts/?feedView=all',
  },
  
  // Images
  images: {
    logo: 'assets/images/logo.png',
    favicon: 'assets/images/favicon.png',
    ogImage: 'assets/images/og-image.jpg',
    heroBg: 'assets/images/hero-bg.jpg',
  },
  
  // Navigation
  navigation: [
    { label: 'Our Story', href: 'about.html' },
    { label: 'Projects', href: 'projects.html' },
    { label: 'Our Team', href: 'team.html' },
    { label: 'Contact', href: 'contact.html' },
    { label: 'Updates', href: 'updates.html' },
    { label: 'Donate', href: 'donate.html', primary: true },
  ],
  
  // Hero Section
  hero: {
    headline: 'Community. Culture. Progress.',
    subheadline: 'Building Healthcare, Strengthening Communities',
    description: 'Dindeya Development & Support Org. Inc. is committed to scaling impact in rural Guinea through infrastructure development, healthcare initiatives, and diaspora-driven community support.',
    ctas: [
      { label: 'Explore Our Work', href: '/projects', variant: 'secondary' },
      { label: 'Support Our Mission', href: '/membership', variant: 'primary' },
    ],
  },
  
  // Mission & Values
  mission: 'To foster development in Guinea by building hospitals, enhancing education, and creating sustainable opportunities.',
  vision: 'A future where communities across Guinea are thriving, self-sustaining, and united—supported by education, healthcare, and opportunity.',
  
  values: [
    {
      id: 'changing-lives',
      title: 'Changing Lives',
      description: 'Improving lives by addressing urgent needs and offering lasting solutions',
      icon: '🎯',
    },
    {
      id: 'building-futures',
      title: 'Building Futures',
      description: 'Creating opportunities for a stronger, more self-reliant future',
      icon: '�️',
    },
    {
      id: 'movement',
      title: 'Movement for Change',
      description: 'Driving impactful change through active outreach and service',
      icon: '⚡',
    },
    {
      id: 'lasting-impact',
      title: 'Lasting Impact',
      description: 'Rooted in sustainability for long-term community difference',
      icon: '🌱',
    },
    {
      id: 'accountability',
      title: 'Accountability',
      description: 'Transparent operations and measurable impact',
      icon: '✓',
    },
    {
      id: 'sustainability',
      title: 'Sustainability',
      description: 'Long-term solutions for lasting change',
      icon: '🌱',
    },
  ],
  
  // Impact Metrics
  metrics: [
    { label: 'Raised Since 2017', value: '$100,000+'  },
    { label: 'Projects Completed', value: '4' },
    { label: 'Community Members Reached', value: '5,000+' },
    { label: 'Years of Impact', value: '18' },
  ],
  
  // Campaign Information
  campaigns: {
    hospital: {
      title: '2025 Hospital Reconstruction Campaign',
      description: 'Rebuilding the foundation of rural healthcare in Guinea',
      goal: null,
      raised: 45643.13,
      impact: 'Rebuilding the hospital in Dindeya; construction is ongoing',
      stories: [
        {
          title: 'Saving Lives in Rural Guinea',
          excerpt: 'The hospital project directly impacts maternal and child healthcare outcomes in underserved communities.',
          author: 'Dr. Mamadou Diallo',
        },
        {
          title: 'Building Healthcare Infrastructure',
          excerpt: 'Modern medical facilities enable proper diagnosis and treatment of preventable diseases.',
          author: 'Fatou Ba, Health Administrator',
        },
      ],
    },
  },
  
  // Design Theme (moved from CSS variables)
  theme: {
    colors: {
      primary: '#87A96B',      // Sage
      background: '#F5F5F4',    // Stone
      text: '#334155',          // Slate
      accent: '#D4AF37',        // Gold
      success: '#22C55E',
      error: '#EF4444',
      warning: '#F59E0B',
      info: '#3B82F6',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
  },
  
  // Features
  features: {
    pwa: true,
    serviceWorker: true,
    offline: true,
    analytics: false, // Enable by adding Google Analytics ID
  },
  
  // Footer
  footer: {
    copyright: `© 2006-${new Date().getFullYear()} Dindeya Development & Support Org. Inc. All rights reserved.`,
    quickLinks: [
      { label: 'Our Story', href: 'about.html' },
      { label: 'Projects', href: 'projects.html' },
      { label: 'Contact', href: 'contact.html' },
    ],
  },
};

export type SiteConfig = typeof SITE_CONFIG;
