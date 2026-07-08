export const categories = ['world', 'politics', 'business', 'technology', 'health', 'sports'];

export const formatTitle = (value = '') =>
  value
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
