const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

/**
 * Get a difference of days between two dates.
 * @param {Date} lastPurchase
 * @param {Date} nextPurchase
 * @returns {number}
 */
export function getDaysBetweenDates(lastDate, nextDate) {
	return Math.ceil(nextDate - lastDate) / ONE_DAY_IN_MILLISECONDS;
}
