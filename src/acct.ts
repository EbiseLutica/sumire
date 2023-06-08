export const toAcct = (acct: { username: string; host: string | null }) => {
  if (!acct.host) {
    return `@${acct.username}`;
  }
  return `@${acct.username}@${acct.host}`;
};
