export type Paper = {
  id?: number;
  title: string;
  authors?: string | null;
  journal?: string | null;
  year?: string | null;
  pmid?: string | null;
  doi?: string | null;
  source?: string;
  source_url: string;
  abstract?: string | null;
  score?: number;
  created_at?: string;
};

