/**
 * Main application entry point
 * Initializes PWA and renders components
 */

import { registerServiceWorker, setupInstallPrompt } from '@/utils/pwa';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_CONFIG } from '@/config/site.config';
import '../assets/css/style.css';
import '../assets/css/redesign.css';

async function initializeApp(): Promise<void> {
  console.log('🚀 Initializing Dindeya PWA...');

  // Register Service Worker for PWA capabilities
  if (SITE_CONFIG.features.serviceWorker) {
    await registerServiceWorker(`${import.meta.env.BASE_URL}sw.js`);
  }

  // Setup install prompt
  setupInstallPrompt(() => {
    console.log('Install prompt ready');
    // Optionally show "Add to Home Screen" button
  });

  // Render header and footer on all pages
  const header = new Header();
  const headerEl = header.render();
  const footerEl = new Footer().render();

  const body = document.body;
  if (body.firstChild) {
    body.insertBefore(headerEl, body.firstChild);
  } else {
    body.appendChild(headerEl);
  }

  body.appendChild(footerEl);
  if (document.documentElement.lang === 'fr') {
    footerEl.innerHTML = '<div class="container"><h3>Dindeya Development &amp; Support Org. Inc.</h3><p>Communauté. Culture. Progrès.</p><a href="mailto:info@dindeya.org">info@dindeya.org</a><p>© Dindeya · Tous droits réservés.</p></div>';
    document.querySelector('.hamburger')?.setAttribute('aria-label', 'Ouvrir ou fermer le menu');
  }

  // Set up page-specific initialization
  setupPageSpecific();

  // Set up global event listeners
  setupGlobalListeners();

  console.log('✅ Application initialized');
}

function setupPageSpecific(): void {
  const path = window.location.pathname;

  if (path === '/' || path.includes('index')) {
    initHomePage();
  } else if (path.includes('about')) {
    initAboutPage();
  } else if (path.includes('projects')) {
    initProjectsPage();
  } else if (path.includes('team')) {
    initTeamPage();
  } else if (path.includes('membership')) {
    initMembershipPage();
  }
}

function initHomePage(): void {
  // Dynamic import for home page specific code
  console.log('Initializing home page');
}

function initAboutPage(): void {
  console.log('Initializing about page');
}

function initProjectsPage(): void {
  console.log('Initializing projects page');
}

function initTeamPage(): void {
  console.log('Initializing team page');
}

function initMembershipPage(): void {
  // Setup form handling
  const form = document.querySelector('#membership-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleMembershipSubmit(form as HTMLFormElement);
    });
  }
}

function handleMembershipSubmit(form: HTMLFormElement): void {
  const formData = new FormData(form);
  const data = {
    email: formData.get('email'),
  };

  console.log('Membership form submitted:', data);
  // TODO: Send to backend or email service

  // Show success message
  const successMsg = document.createElement('div');
  successMsg.className = 'success-message';
  successMsg.textContent = '✅ Thanks for your interest! We\'ll be in touch soon.';
  form.parentNode?.insertBefore(successMsg, form);

  form.reset();
  setTimeout(() => successMsg.remove(), 5000);
}

function setupGlobalListeners(): void {
  // Handle smooth scrolling for anchor links
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('a[href^="#"]');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href) return;

    const element = document.querySelector(href);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  });

}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
