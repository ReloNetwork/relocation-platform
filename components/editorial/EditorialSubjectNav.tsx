import Link from 'next/link';
import {
  editorialSubjects,
  type EditorialSubjectId,
} from '@/lib/editorial-subjects';

export default function EditorialSubjectNav({
  activeSubject,
  basePath,
}: {
  activeSubject: EditorialSubjectId;
  basePath: '/journal' | '/newsletter';
}) {
  return (
    <nav className="editorial-subjects" aria-label="Editorial subjects">
      <span>EXPLORE BY SUBJECT</span>
      <div>
        {editorialSubjects.map((subject) => (
          <Link
            key={subject.id}
            className={subject.id === activeSubject ? 'is-active' : ''}
            aria-current={subject.id === activeSubject ? 'page' : undefined}
            href={
              subject.id === 'all'
                ? basePath
                : `${basePath}?subject=${subject.id}`
            }
          >
            {subject.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
