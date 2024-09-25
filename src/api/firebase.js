import {
	addDoc,
	arrayUnion,
	getDoc,
	setDoc,
	collection,
	doc,
	onSnapshot,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';
import { getFutureDate, getDaysBetweenDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

/**
 * A custom hook that subscribes to the user's shopping lists in our Firestore
 * database and returns new data whenever the lists change.
 * @param {string | null} userId
 * @param {string | null} userEmail
 * @returns
 */
export function useShoppingLists(userId, userEmail) {
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		if (!userId || !userEmail) return;
		const userDocRef = doc(db, 'users', userEmail);

		onSnapshot(userDocRef, (docSnap) => {
			if (docSnap.exists()) {
				const listRefs = docSnap.data().sharedLists;
				const newData = listRefs.map((listRef) => {
					return { name: listRef.id, path: listRef.path };
				});
				setData(newData);
			}
		});
	}, [userId, userEmail]);

	return data;
}

/**
 * A custom hook that subscribes to a shopping list in our Firestore database
 * and returns new data whenever the list changes.
 * @param {string | null} listPath
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function useShoppingListData(listPath) {
	/** @type {import('firebase/firestore').DocumentData[]} */
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		if (!listPath) return;

		return onSnapshot(collection(db, listPath, 'items'), (snapshot) => {
			const nextData = snapshot.docs.map((docSnapshot) => {
				const item = docSnapshot.data();

				item.id = docSnapshot.id;

				return item;
			});

			setData(nextData);
		});
	}, [listPath]);
	return data;
}

/**
 * Add a new user to the users collection in Firestore.
 * @param {Object} user The user object from Firebase Auth.
 */
export async function addUserToDatabase(user) {
	const userDoc = await getDoc(doc(db, 'users', user.email));

	if (userDoc.exists()) {
		return;
	} else {
		await setDoc(doc(db, 'users', user.email), {
			email: user.email,
			name: user.displayName,
			uid: user.uid,
		});
	}
}

/**
 * Create a new list and add it to a user's lists in Firestore.
 * @param {string} userId The id of the user who owns the list.
 * @param {string} userEmail The email of the user who owns the list.
 * @param {string} listName The name of the new list.
 */
export async function createList(userId, userEmail, listName) {
	const listDocRef = doc(db, userId, listName);

	await setDoc(listDocRef, {
		owner: userId,
	});

	const userDocumentRef = doc(db, 'users', userEmail);

	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocRef),
	});
}

/**
 * Shares a list with another user.
 * @param {string} listPath The path to the list to share.
 * @param {string} recipientEmail The email of the user to share the list with.
 */
export async function shareList(listPath, currentUserId, recipientEmail) {
	if (!listPath.includes(currentUserId)) {
		throw new Error('You do not have permission to share this list');
	}

	const usersCollectionRef = collection(db, 'users');
	const recipientDoc = await getDoc(doc(usersCollectionRef, recipientEmail));

	if (!recipientDoc.exists()) {
		throw new Error('The user with the provided email does not exist');
	}
	const listDocumentRef = doc(db, listPath);
	const userDocumentRef = doc(db, 'users', recipientEmail);
	await updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocumentRef),
	});
	return `The list has been successfully shared with ${recipientEmail}`;
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listPath The path of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listPath, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = await collection(db, listPath, 'items');

	try {
		await addDoc(listCollectionRef, {
			dateCreated: new Date(),
			dateLastPurchased: null,
			dateNextPurchased: getFutureDate(daysUntilNextPurchase),
			name: itemName,
			totalPurchases: 0,
		});
	} catch (error) {
		console.log(error);
	}
}

export async function updateItem(listPath, itemId, { totalPurchases }) {
	try {
		const itemRef = doc(db, listPath, 'items', itemId);
		const docSnap = await getDoc(itemRef);
		const data = docSnap.data();

		const lastPurchase = data.dateLastPurchased
			? data.dateLastPurchased.toDate()
			: data.dateCreated.toDate();
		const nextPurchase = data.dateNextPurchased.toDate();

		const prevEstimate = getDaysBetweenDates(lastPurchase, nextPurchase);
		const daysSinceLastPurch = getDaysBetweenDates(lastPurchase, new Date());
		const newEstimate = calculateEstimate(
			prevEstimate,
			daysSinceLastPurch,
			data.totalPurchases,
		);

		await updateDoc(itemRef, {
			dateLastPurchased: new Date(),
			totalPurchases: totalPurchases,
			dateNextPurchased: getFutureDate(newEstimate),
		});
	} catch (error) {
		console.log(error);
	}
}

export async function deleteItem(listPath, itemId) {
	try {
		const itemRef = doc(db, listPath, 'items', itemId);
		await deleteDoc(itemRef);
		return 'Item has been deleted successfully';
	} catch (error) {
		console.log(error);
		throw new Error('Error deleting the item');
	}
}
/**
 * Sorts the items in the list according to category using urgencyIndex and inactiveIndex to determine what category an item belongs.
 * @param {string} data The path to the data object to sort.
 */

export async function comparePurchaseUrgency(data) {
	const now = new Date();
	const inactivityPeriod = 60;
	const dayOfPurchase = 0;
	const soon = 7;
	const kindOfSoon = 30;

	data.map((item) => {
		const urgencyIndex = Math.ceil(
			getDaysBetweenDates(now, item.dateNextPurchased.toDate()),
		);

		const lastPurchase = item.dateLastPurchased
			? item.dateLastPurchased.toDate()
			: item.dateCreated.toDate();

		const inactiveItem = getDaysBetweenDates(lastPurchase, now);
		item.inactiveIndex = inactiveItem;
		item.urgencyIndex = urgencyIndex;

		if (inactiveItem > inactivityPeriod) {
			item.category = 'inactive';
		} else if (urgencyIndex < dayOfPurchase) {
			item.category = 'Overdue';
		} else if (urgencyIndex <= soon) {
			item.category = 'soon';
		} else if (urgencyIndex < kindOfSoon) {
			item.category = 'kind of soon';
		} else {
			item.category = 'Not soon';
		}
		return item;
	});

	data.sort((a, b) => {
		if (a.category === 'inactive' && b.category !== 'inactive') {
			return 1;
		} else if (a.category !== 'inactive' && b.category === 'inactive') {
			return -1;
		} else if (a.urgencyIndex !== b.urgencyIndex) {
			return a.urgencyIndex - b.urgencyIndex;
		} else {
			return a.name.localeCompare(b.name);
		}
	});
	return data;
}
