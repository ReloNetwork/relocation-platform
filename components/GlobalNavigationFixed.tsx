'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
const links = [
  ['Move', '/move'],
  ['Live', '/live'],
  ['Discover', '/discover'],
  ['Network', '/network'],
  ['Journal', '/journal'],
  ['About', '/about'],
];
export default function GlobalNavigationFixed() {
  const [open, setOpen] = useState(false);
  return (
    <header className="editorial-nav">
      <Link className="editorial-logo" href="/">
        <span>R</span> RELO NETWORK
      </Link>
      <nav className={open ? 'is-open' : ''}>
        {links.map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <Link className="nav-ask" href="/ask-relo">
          ASK RELO
        </Link>
        <Link className="nav-move" href="/move">
          START YOUR MOVE
        </Link>
      </nav>
      <button
        className="nav-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
