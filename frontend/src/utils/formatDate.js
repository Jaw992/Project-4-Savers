import { format } from 'date-fns';

/**
 * Formats a date to 'dd-MMM-yyyy' format.
 * @param {string | Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (date) => {
    console.log('Input date:', date); // Log the input date
    const formattedDate = format(new Date(date), 'EEEE, dd-MMM-yy');
    console.log('Formatted date:', formattedDate); // Log the formatted date
    return formattedDate;
};