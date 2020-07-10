// This file contains helper functions for displaying dates in customized ways

import moment from 'moment';

// Returns the date in a readable format relative to the current date
export function getRelativeDateDisplay (date) {
    let currentTime = moment();
    let daysSinceDate = currentTime.diff(date, 'days');

    // Won't occur in practice, but with test data we may have
    // dates in the future, in which case just display the date
    if (daysSinceDate < 0) {
      return date.format("ddd, MMM Do, YYYY");
    } else if (currentTime.isSame(date, 'day')) {
      return "Today";
    } else if (currentTime.subtract(1, 'days').isSame(date, 'day')) {
      return "Yesterday";
    } else if (daysSinceDate <= 4) { // Day of the week for the last 4 days
      return date.format('dddd');
    } else if (currentTime.isSame(date, 'year')) { // Only show the year if it wasn't this year
      return date.format("ddd, MMM Do");
    } else {
      return date.format("ddd, MMM Do, YYYY");
    }
  }