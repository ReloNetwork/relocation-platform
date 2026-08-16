import Link from 'next/link';

export default function EditorialFooter() {
  return (
    <footer className="editorial-footer">
      <div className="editorial-footer__brand">
        <span>R</span> RELO NETWORK
        <p>Relocation, intelligently guided. London first, always.</p>
      </div>
      <div>
        <b>EXPLORE</b>
        <Link href="/move">Move</Link>
        <Link href="/live">Live</Link>
        <Link href="/discover">Discover</Link>
      </div>
      <div>
        <b>COMPANY</b>
        <Link href="/network">Network</Link>
        <Link href="/journal">Journal</Link>
        <Link href="/about">About</Link>
      </div>
      <div>
        <b>CONTACT</b>
        <a href="mailto:hello@therelonetwork.com">hello@therelonetwork.com</a>
        <span>London</span>
      </div>
    </footer>
  );
}
