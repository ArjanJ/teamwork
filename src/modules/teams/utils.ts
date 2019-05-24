export const normalizeTeamName = (name: string) =>
  name.replace(/([^a-z0-9]+)/gi, '-');
