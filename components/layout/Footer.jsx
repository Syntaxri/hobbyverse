'use client';

import Link from 'next/link';
import { Container } from './Container';

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { name: 'Music', href: '/hobbies?category=music' },
      { name: 'Photography', href: '/hobbies?category=photography' },
      { name: 'Art', href: '/hobbies?category=art' },
      { name: 'Astronomy', href: '/hobbies?category=astronomy' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '#' },
      { name: 'Safety', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Privacy', href: '#' },
    ],
  },
];

export const Footer = () => (
  <footer className="relative border-t border-hv-border/50 bg-white/50 backdrop-blur-xl">
    <Container className="py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-hv-cyan to-hv-sky flex items-center justify-center">
              <span className="w-2 h-2 bg-white rounded-sm" />
            </div>
            <span className="text-base font-bold text-hv-foreground">HobbyVerse</span>
          </Link>
          <p className="text-sm text-hv-muted leading-relaxed max-w-xs">
            Discover your passion before making a major investment. Rent premium equipment and explore new skills.
          </p>
        </div>
        {footerLinks.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold text-hv-foreground mb-4 tracking-wider uppercase">{group.title}</h3>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-hv-muted hover:text-hv-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-6 border-t border-hv-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-hv-muted">&copy; {new Date().getFullYear()} HobbyVerse. All rights reserved.</p>
        <div className="flex gap-5">
          {['Twitter', 'Instagram', 'GitHub', 'Discord'].map((s) => (
            <Link key={s} href="#" className="text-xs text-hv-muted hover:text-hv-foreground transition-colors">{s}</Link>
          ))}
        </div>
      </div>
    </Container>
  </footer>
);
