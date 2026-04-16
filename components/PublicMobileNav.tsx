'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';

type NavItem = {
  href: string;
  label: string;
};

export default function PublicMobileNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-orange-700 transition hover:border-orange-300 hover:bg-orange-100"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {isOpen ? (
            <>
              <path d="M6 6L18 18" />
              <path d="M6 18L18 6" />
            </>
          ) : (
            <>
              <path d="M4 7H20" />
              <path d="M4 12H20" />
              <path d="M4 17H20" />
            </>
          )}
        </svg>
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 top-16 z-40 bg-gray-950/20 backdrop-blur-[1px]"
          />
          <div
            id={panelId}
            className="absolute inset-x-0 top-full z-50 mt-3 rounded-2xl border border-orange-100 bg-white p-3 shadow-2xl"
          >
            <nav className="flex flex-col">
              {items.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition ${
                      isActive
                        ? 'bg-orange-50 text-orange-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
