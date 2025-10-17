'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type Props = { href: string; children: React.ReactNode; exact?: boolean };

export default function NavLink({ href, children, exact = false }: Props) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={clsx(
        'px-3 py-2 rounded-lg text-sm transition-colors',
        isActive ? 'bg-black text-white' : 'text-neutral-700 hover:bg-neutral-100'
      )}
    >
      {children}
    </Link>
  );
}
