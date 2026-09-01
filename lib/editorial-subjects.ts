export const editorialSubjects = [
  { id: 'all', label: 'All' },
  { id: 'start-plan', label: 'Start & Plan' },
  { id: 'homes-areas', label: 'Homes & Areas' },
  { id: 'schools-family', label: 'Schools & Family' },
  { id: 'work-founder', label: 'Work & Founder' },
  { id: 'money-practical', label: 'Money & Practical Life' },
  { id: 'london-life', label: 'London Life' },
] as const;

export type EditorialSubjectId = (typeof editorialSubjects)[number]['id'];
export type ArticleSubjectId = Exclude<EditorialSubjectId, 'all'>;

export function isEditorialSubjectId(
  value: string | undefined
): value is EditorialSubjectId {
  return editorialSubjects.some((subject) => subject.id === value);
}

export function editorialSubjectLabel(subjectId: EditorialSubjectId) {
  return (
    editorialSubjects.find((subject) => subject.id === subjectId)?.label ??
    'All'
  );
}
