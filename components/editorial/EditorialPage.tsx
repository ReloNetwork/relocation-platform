import Image from 'next/image';
import AskReloBand from './AskReloBand';

type Item = { title: string; text: string; number?: string };

export default function EditorialPage({
  label,
  title,
  intro,
  image,
  sectionTitle,
  items,
}: {
  label: string;
  title: string;
  intro: string;
  image: string;
  sectionTitle: string;
  items: Item[];
}) {
  return (
    <main>
      <section className="editorial-hero">
        <span className="vertical-label">{label}</span>
        <div>
          <h1>{title}</h1>
          <i />
          <p>{intro}</p>
        </div>
        <Image
          src={image}
          width={1400}
          height={900}
          alt="London editorial view"
          priority
        />
      </section>
      <section className="editorial-grid">
        <h2>{sectionTitle}</h2>
        <div>
          {items.map((item) => (
            <article key={item.title}>
              {item.number && <span>{item.number}</span>}
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <AskReloBand compact />
    </main>
  );
}
