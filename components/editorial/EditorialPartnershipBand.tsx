import Link from 'next/link';

export type EditorialPartnership = {
  eyebrow: string;
  title: string;
  text: string;
  formats: string[];
};

export default function EditorialPartnershipBand({
  partnership,
}: {
  partnership: EditorialPartnership;
}) {
  return (
    <section
      className="editorial-partnership"
      aria-labelledby="editorial-partnership-title"
    >
      <div className="editorial-partnership__heading">
        <span>{partnership.eyebrow}</span>
        <h2 id="editorial-partnership-title">{partnership.title}</h2>
      </div>
      <div className="editorial-partnership__body">
        <p>{partnership.text}</p>
        <ul aria-label="Ways to work with us">
          {partnership.formats.map((format) => (
            <li key={format}>{format}</li>
          ))}
        </ul>
        <div className="editorial-partnership__action">
          <Link href="/partner-application">
            See partnership options <span aria-hidden="true">↗</span>
          </Link>
          <small>
            Paid content is clearly labelled. A partner cannot buy a
            recommendation or change an Ask Relo answer.
          </small>
        </div>
      </div>
    </section>
  );
}
