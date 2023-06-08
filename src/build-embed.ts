import { toAcct } from './acct';
import { Note } from './types/note';
import { User } from './types/User';

export const buildUserEmbed = (user: User, localHost: string) => {
  const acct = toAcct(user);
  return {
    description: user.description || '自己紹介なし',
    author: {
      name: `${user.name || user.username} ${acct}`,
      url: `https://${localHost}/${acct}`,
      icon_url: user.avatarUrl,
    },
  };
};

export const buildNoteEmbed = (note: Note, localHost: string) => {
  const { user } = note;
  const acct = toAcct(user);
  const description = note.cw ? `${note.cw} (CW)` : note.text;
  return {
    title: 'ノート',
    url: `https://${localHost}/notes/${note.id}`,
    description,
    author: {
      name: `${user.name || user.username} ${acct}`,
      url: `https://${localHost}/${acct}`,
      icon_url: user.avatarUrl,
    },
  };
};

export const buildDiscordPayload = (content: string, embed: any) => {
  return {
    content,
    embeds: [embed],
  };
};
