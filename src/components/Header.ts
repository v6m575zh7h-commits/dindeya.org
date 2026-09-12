/**
 * Header component - renders navigation and branding
 */

import { createElement, appendChildren } from '@/utils/dom';
import { SITE_CONFIG } from '@/config/site.config';

export class Header {
  private element: HTMLElement | null = null;
  private currentPath: string;

  constructor() {
    this.currentPath = window.location.pathname;
  }

  render(): HTMLElement {
    const header = createElement('header');
    const nav = createElement('nav');
    const navContainer = createElement('div', { classes: ['nav-container'] });

    // Logo
    const base = import.meta.env.BASE_URL;
    const logo = createElement('a', {
      classes: ['logo'],
      attributes: { href: `${base}index.html` },
      innerHTML: `
        <img src="${base}assets/images/dindeya-logo.jpeg" alt="Dindeya Logo" class="logo-icon" />
        <span>Dindeya</span>
      `,
    });

    // Navigation Links
    const navLinks = createElement('ul', { classes: ['nav-links'] });
    const french = document.documentElement.lang === 'fr';
    const navigation = french ? [
      {label:'Notre histoire',href:'#histoire',primary:false},
      {label:'Projets',href:'#projets',primary:false},
      {label:'Réunion',href:'#reunion',primary:false},
      {label:'Contact',href:'#contact',primary:false},
      {label:'Faire un don',href:'#don',primary:true},
    ] : SITE_CONFIG.navigation;
    const navItems = navigation.map((link) => {
      const li = createElement('li');
      const isActive = this.isActive(link.href);
      const classes = link.primary ? ['btn', 'btn-primary', 'btn-sm'] : [];
      if (isActive) classes.push('active');

      const a = createElement('a', {
        classes,
        attributes: { href: link.href, ...(isActive ? { 'aria-current': 'page' } : {}) },
        textContent: link.label,
      });

      li.appendChild(a);
      return li;
    });

    // Hamburger button for mobile
    const hamburger = createElement('button', {
      classes: ['hamburger'],
      attributes: { 'aria-label': 'Toggle navigation', 'aria-expanded': 'false' },
      innerHTML: `
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      `,
    });

    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    hamburger.setAttribute('aria-controls', 'site-navigation');
    navLinks.id = 'site-navigation';
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });

    // Close menu when a link is clicked
    navLinks.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).tagName === 'A') {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    appendChildren(navLinks, ...navItems);
    const languageItem = createElement('li');
    const languageLink = createElement('a', {attributes:{href:french ? 'index.html' : 'fr.html',lang:french ? 'en' : 'fr',hreflang:french ? 'en' : 'fr'},textContent:french ? 'English' : 'Français'});
    languageItem.appendChild(languageLink);
    navLinks.appendChild(languageItem);
    appendChildren(navContainer, logo, navLinks, hamburger);
    appendChildren(nav, navContainer);
    appendChildren(header, nav);

    this.element = header;
    return header;
  }

  private isActive(href: string): boolean {
    return this.currentPath.endsWith('/' + href);
  }

  setActive(href: string): void {
    if (!this.element) return;

    const links = this.element.querySelectorAll('a');
    links.forEach((link) => {
      const linkHref = link.getAttribute('href');
      if (linkHref === href) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
