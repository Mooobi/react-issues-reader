export type CardType = {
  url: string;
  id: number;
  number: number;
  title: string;
  user: {
    login: string;
    id: number;
    avatar_url: string;
    [key: string]: unknown;
  };
  comments: number;
  created_at: string | null;
  updated_at: string | null;
  body: string;
  [key: string]: unknown;
};
