/**
 * Format a date to display as a relative time (e.g., "Today", "Yesterday", "2 days ago")
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted relative date string
 */
export const formatRelativeDate = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const dateObj = new Date(date);
  
  // Check if invalid date
  if (isNaN(dateObj.getTime())) return 'Invalid date';
  
  const diffTime = Math.abs(now - dateObj);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Check if same day
  if (
    dateObj.getDate() === now.getDate() &&
    dateObj.getMonth() === now.getMonth() &&
    dateObj.getFullYear() === now.getFullYear()
  ) {
    return 'Today';
  }
  
  // Check if yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  ) {
    return 'Yesterday';
  }
  
  // Check if tomorrow
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (
    dateObj.getDate() === tomorrow.getDate() &&
    dateObj.getMonth() === tomorrow.getMonth() &&
    dateObj.getFullYear() === tomorrow.getFullYear()
  ) {
    return 'Tomorrow';
  }
  
  // Check if within a week
  if (diffDays < 7) {
    return dateObj > now 
      ? `In ${diffDays} day${diffDays !== 1 ? 's' : ''}` 
      : `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }
  
  // Check if same year
  if (dateObj.getFullYear() === now.getFullYear()) {
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  // Different year
  return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

/**
 * Check if a date is overdue (before current date)
 * @param {string|Date} date - The date to check
 * @returns {boolean} True if date is before current date
 */
export const isOverdue = (date) => {
  if (!date) return false;
  
  const now = new Date();
  const dateObj = new Date(date);
  
  // Set time to end of day for due dates
  dateObj.setHours(23, 59, 59, 999);
  
  return dateObj < now;
};

/**
 * Format a date for input fields (YYYY-MM-DD)
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDateForInput = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  // Check if invalid date
  if (isNaN(dateObj.getTime())) return '';
  
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Format a date to display in a standard format (e.g., "May 15, 2025")
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatStandardDate = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  // Check if invalid date
  if (isNaN(dateObj.getTime())) return 'Invalid date';
  
  return dateObj.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

/**
 * Get date range for current week, month, or year
 * @param {string} period - The period to get range for ('week', 'month', 'year')
 * @returns {Object} Object with start and end dates
 */
export const getDateRange = (period) => {
  const now = new Date();
  let start, end;
  
  switch (period) {
    case 'week':
      // Start of week (Sunday)
      start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      start.setHours(0, 0, 0, 0);
      
      // End of week (Saturday)
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      break;
      
    case 'month':
      // Start of month
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      start.setHours(0, 0, 0, 0);
      
      // End of month
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      end.setHours(23, 59, 59, 999);
      break;
      
    case 'year':
      // Start of year
      start = new Date(now.getFullYear(), 0, 1);
      start.setHours(0, 0, 0, 0);
      
      // End of year
      end = new Date(now.getFullYear(), 11, 31);
      end.setHours(23, 59, 59, 999);
      break;
      
    default:
      // Default to today
      start = new Date(now);
      start.setHours(0, 0, 0, 0);
      
      end = new Date(now);
      end.setHours(23, 59, 59, 999);
  }
  
  return { start, end };
};