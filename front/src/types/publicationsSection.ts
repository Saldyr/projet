export type PublicationItem = {
  clubName: string;
  articleTitle: string;
};

export type PublicationsSectionProps = {
  title?: string;
  articles?: PublicationItem[];
  emptyMessage?: string;
};
