"use client";

import Link from 'next/link';
import React from 'react';

type CTAProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
};

export default function CTA({ href, className = 'cta-pill', children, external = false }: CTAProps) {
  const isMail = href.startsWith('mailto:');
  if (isMail || external) {
    return (
      // plain anchor for external/mail links
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
