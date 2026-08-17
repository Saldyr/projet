export type ClubItem = {
  clubName: string;
  clubSubtitle: string;
};

export type ClubSectionProps = {
  title?: string;
  clubs?: ClubItem[];
  emptyMessage?: string;
};
