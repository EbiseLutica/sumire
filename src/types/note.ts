import { User } from './User';

export type Note = {
  id: string;
  createdAt: string;
  text: string | null;
  cw: string | null;
  user: User;
  userId: string;
  visibility: string;
};
