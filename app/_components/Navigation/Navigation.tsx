'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/home', label: 'Home' },
    { href: '/create', label: 'Create' },
    { href: '/items', label: 'Items' },
    { href: '/library', label: 'Library' },
  ];

  return (
    <nav className={styles.nav}>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`${styles.link} ${pathname === href ? styles.active : ''}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
