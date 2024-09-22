import dayjs from 'dayjs';

const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const DURATION_ITEM_MAX_LENGTH = 3;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomValuesFromArray = (values, amount) => {
  const randomValues = [];

  while (randomValues.length < amount && randomValues.length !== values.length) {
    const index = getRandomInteger(0, values.length - 1);
    const value = values[index];

    if (!randomValues.includes(value)) {
      randomValues.push(value);
    }
  }

  return randomValues;
};

const formatDate = (date, format) => (date) ? dayjs(date).format(format) : '';

const getEventDuration = (dateFrom, dateTo) => {
  const diffInDays = dayjs(dateTo).diff(dateFrom, 'day');
  const diffInHours = dayjs(dateTo).diff(dateFrom, 'hours');
  const diffInMinutes = dayjs(dateTo).diff(dateFrom, 'minutes');

  const diffDays = diffInDays > 0 ? `${diffInDays}D`.padStart(DURATION_ITEM_MAX_LENGTH, '0') : '';
  const diffHours = diffInHours > 0 ? `${diffInHours - diffInDays * HOURS_PER_DAY}H`.padStart(DURATION_ITEM_MAX_LENGTH, '0') : '';
  const diffMinutes = `${diffInMinutes - diffInHours * MINUTES_PER_HOUR}M`.padStart(DURATION_ITEM_MAX_LENGTH, '0');

  return `${diffDays} ${diffHours} ${diffMinutes}`.trim();
};

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export { getRandomInteger, getRandomValuesFromArray, formatDate, getEventDuration, capitalizeFirstLetter };
