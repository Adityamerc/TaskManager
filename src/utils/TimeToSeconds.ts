export const TimeToSeconds = (str: string): number => {
  const arr = str.split(":");

  const seconds = +arr[0] * 60 * 60 + +arr[1] * 60 + +arr[2];

  return seconds;
};
