export const SecondsToTime = (seconds: number): string =>
  new Date(seconds * 1000).toISOString().substr(11, 8);
