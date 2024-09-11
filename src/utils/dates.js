import { Timestamp } from 'firebase/firestore';

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
 * @param {Timestamp} lastPurchase
 * @param {Timestamp} nextPurchase
 * @returns {number}
 */
export function getDaysBetweenDates(lastDate, nextDate) {
	// const lastDateInMS = lastPurchase.toDate().getTime();
	// const nextDateInMS = nextPurchase.toDate().getTime();
	return Math.abs(nextDate - lastDate) / ONE_DAY_IN_MILLISECONDS;
}
