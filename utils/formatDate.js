import { DEFAULT_LOCALE, DEFAULT_TIME_ZONE } from './constants';

export const formatDate = (value, options = {}) => {
  if (!value) return '';

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const {
    locale = DEFAULT_LOCALE,
    timeZone = DEFAULT_TIME_ZONE,
    dateStyle = 'medium',
    ...dateTimeOptions
  } = options;

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeZone,
    ...dateTimeOptions,
  }).format(date);
};

export const formatRelativeDate = (value, options = {}) => {
  if (!value) return '';

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const { locale = DEFAULT_LOCALE, now = new Date() } = options;
  const diffInSeconds = Math.round((date.getTime() - now.getTime()) / 1000);
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1],
  ];

  const [unit, seconds] = units.find(([, secondsInUnit]) => Math.abs(diffInSeconds) >= secondsInUnit) || ['second', 1];
  return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(Math.round(diffInSeconds / seconds), unit);
};
