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
        <Link href="/executive-intake">Start your move</Link>
      </div>
      <div>
        <b>READ &amp; CONNECT</b>
        <Link href="/network">Network</Link>
        <Link href="/journal">Journal</Link>
        <Link href="/newsletter">The London Brief</Link>
        <Link href="/partner-application">Partner with us</Link>
      </div>
      <div>
        <b>CONTACT</b>
        <a href="mailto:hello@therelonetwork.com">hello@therelonetwork.com</a>
        <span>London</span>
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/cookies">Cookies</Link>
        <Link href="/editorial-policy">Editorial standard</Link>
      </div>
    </footer>
  );
}
