import { Note } from './note';
import { User } from './User';

export type PayloadCommonProp = {
  hookId: string;
  userId: string;
  eventId: string;
  createdAt: number;
} & (
  | {
      type: 'follow' | 'followed' | 'unfollow';
      body: { user: User };
    }
  | {
      type: 'note' | 'reply' | 'renote' | 'mention';
      body: { note: Note };
    }
);
