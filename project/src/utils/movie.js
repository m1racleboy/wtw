const MAX_MINUTES = 59;
const MINUTES_PER_HOUR = 60;
const SECONDS_IN_HOUR = 3600;
const FIRST_TWO_DIGIT_NUMBER = 10;

export const getRuntime = (number) => number > MAX_MINUTES
  ? `${Math.floor(number / MINUTES_PER_HOUR)}h ${number % MINUTES_PER_HOUR}m`
  : `${number % MINUTES_PER_HOUR}m`;

export const adaptTimeToPlayer = (time) => {
  const hours = ~~(time / SECONDS_IN_HOUR);
  const minutes = ~~((time % SECONDS_IN_HOUR) / MINUTES_PER_HOUR);
  const seconds = ~~time % MINUTES_PER_HOUR;

  let result = '-';

  if (hours > 0) {
    result += `${hours}:${minutes < FIRST_TWO_DIGIT_NUMBER ? '0' : ''}`;
  }

  result += `${minutes}:${seconds < FIRST_TWO_DIGIT_NUMBER ? `0${seconds}` : `${seconds}`}`;

  return result;
};
