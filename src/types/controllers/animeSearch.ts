export type AnimeSearchQueryParams = {
  q?: string;
  page?: string;
  type?: string;
  status?: string;
  rated?: string;
  score?: string;
  season?: string;
  language?: string;
  start_date?: string;
  end_date?: string;
  sort?: string;
  genres?: string;
};

export type SearchFilters = Omit<AnimeSearchQueryParams, "q" | "page">;

export type FilterKeys = Partial<
  keyof Omit<SearchFilters, "start_date" | "end_date">
>;
