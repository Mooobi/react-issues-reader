export type DetailType = {
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
  created_at: string;
  updated_at: string;
  body: string;
  [key: string]: unknown;
};
