"use client";

/**
 * NavigationResponsive.tsx - Mobile-Responsive Navigation with Theme Toggle
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { serviceMenu } from '@/lib/serviceMenu';
import './NavigationResponsive.css';

export function NavigationResponsive() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Automatically close both mobile menu and desktop dropdown on route change
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  const closeMenus = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const routeMap: Record<string, string> = {
    '/': 'Home',
    '/about': 'About',
    '/services': 'Services',
    '/portfolio': 'Portfolio',
    '/contact': 'Contact',
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const activeItem = pathname.startsWith('/services')
    ? 'Services'
    : pathname.startsWith('/portfolio')
      ? 'Portfolio'
      : routeMap[pathname] || 'Home';

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ];

  // Default to dark during SSR to match defaultTheme="dark", then client uses active theme
  const activeTheme = mounted ? theme : 'dark';
  const isDark = activeTheme === 'dark';

  return (
    <nav className={`nav-responsive ${scrolled ? 'scrolled' : ''} theme-${activeTheme}`}>
      <div className="nav-container">
        {/* Logo — switches between light/dark versions */}
        <motion.div
          className="nav-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="nav-logo-link" onClick={closeMenus}>
            <img
              src={isDark ? '/assets/logo.webp' : '/assets/logo.webp'}
              alt="Red Shadow Designs"
              className={`logo-image ${isDark ? 'logo-dark' : 'logo-light'}`}
            />
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <motion.ul
          className="nav-menu-desktop"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {menuItems.map((item, index) => {
            const isServices = item.label === 'Services';
            return (
              <li
                key={index}
                className={`${isServices ? 'has-dropdown' : ''} ${isServices && isDropdownOpen ? 'dropdown-active' : ''}`}
                onMouseEnter={() => isServices && setIsDropdownOpen(true)}
                onMouseLeave={() => isServices && setIsDropdownOpen(false)}
              >
                <Link
                  href={item.href}
                  className={activeItem === item.label ? 'active' : ''}
                  onClick={closeMenus}
                >
                  {item.label}
                </Link>
                {isServices && (
                  <ul className={`nav-dropdown ${isDropdownOpen ? 'show' : ''}`}>
                    {serviceMenu.map((service) => (
                      <li key={service.slug}>
                        <Link href={`/services/${service.slug}`} onClick={closeMenus}>
                          {service.title}
                        </Link>
                      </li>
                    ))}
                    <li className="divider" />
                    <li>
                      <Link href="/services" onClick={closeMenus}>
                        All Services
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            );
          })}
        </motion.ul>

        {/* Theme Toggle + CTA (desktop) */}
        <div className="nav-actions">
          {/* Theme Toggle Button */}
          <motion.button
            id="theme-toggle-btn"
            className="theme-toggle"
            onClick={toggleTheme}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </motion.button>

          {/* CTA Button */}
          <motion.a
            href="/contact"
            className="nav-cta"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request a Quote
          </motion.a>
        </div>

        {/* Mobile: Theme toggle + Hamburger */}
        <div className="nav-mobile-controls">
          <motion.button
            className="theme-toggle theme-toggle-mobile"
            onClick={toggleTheme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </motion.button>

          <motion.button
            className="nav-toggle"
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className={isOpen ? 'active' : ''}></span>
            <span className={isOpen ? 'active' : ''}></span>
            <span className={isOpen ? 'active' : ''}></span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-menu-mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul>
              {menuItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={activeItem === item.label ? 'active' : ''}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.label === 'Services' && (
                    <ul className="nav-mobile-sublist">
                      {serviceMenu.map((service) => (
                        <li key={service.slug}>
                          <Link href={`/services/${service.slug}`} onClick={() => setIsOpen(false)}>{service.title}</Link>
                        </li>
                      ))}
                      <li className="divider" />
                      <li>
                        <Link href="/services" onClick={() => setIsOpen(false)}>All Services</Link>
                      </li>
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default NavigationResponsive;
