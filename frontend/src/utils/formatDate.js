import { format, isToday, isTomorrow, isYesterday, formatDistanceToNow } from 'date-fns';

/**
 * Format a date for display
 * @param {string|Date} date - The date to format
 * @param {string} formatStr - Optional format string
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatStr = 'MMM d, yyyy') => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  if (isToday(dateObj)) {
    return `Today at ${format(dateObj, 'h:mm a')}`;
  } else if (isTomorrow(dateObj)) {
    return `Tomorrow at ${format(dateObj, 'h:mm a')}`;
  } else if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, 'h:mm a')}`;
  } else {
    return format(dateObj, formatStr);
  }
};

/**
 * Format a date as relative time
 * @param {string|Date} date - The date to format
 * @returns {string} Relative time string
 */
export const formatRelativeDate = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

/**
 * Check if a date is overdue
 * @param {string|Date} date - The date to check
 * @returns {boolean} True if date is in the past
 */
export const isOverdue = (date) => {
  if (!date) return false;
  
  const dateObj = new Date(date);
  const now = new Date();
  
  return dateObj < now;
};

/**
 * Format a date for input fields
 * @param {string|Date} date - The date to format
 * @returns {string} Date formatted as YYYY-MM-DD
 */
export const formatDateForInput = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  return format(dateObj, 'yyyy-MM-dd');
};