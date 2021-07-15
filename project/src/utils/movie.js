const MAX_MINUTES = 59;
const MINUTES_PER_HOUR = 60;

export const getRuntime = (number) => number > MAX_MINUTES
  ? `${Math.floor(number / MINUTES_PER_HOUR)}h ${number % MINUTES_PER_HOUR}m`
  : `${number % MINUTES_PER_HOUR}m`;
