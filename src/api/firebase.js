import {
	addDoc,
	arrayUnion,
	getDoc,
	setDoc,
	collection,
	doc,
	onSnapshot,
	updateDoc,
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
	// Start with an empty array for our data.
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		// If we don't have a userId or userEmail (the user isn't signed in),
		// we can't get the user's lists.
		if (!userId || !userEmail) return;

		// When we get a userEmail, we use it to subscribe to real-time updates
		const userDocRef = doc(db, 'users', userEmail);

		onSnapshot(userDocRef, (docSnap) => {
			if (docSnap.exists()) {
				const listRefs = docSnap.data().sharedLists;
				const newData = listRefs.map((listRef) => {
					// We keep the list's id and path so we can use them later.
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
	// Start with an empty array for our data.
	/** @type {import('firebase/firestore').DocumentData[]} */
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		if (!listPath) return;

		// When we get a listPath, we use it to subscribe to real-time updates
		// from Firestore.
		return onSnapshot(collection(db, listPath, 'items'), (snapshot) => {
			// The snapshot is a real-time update. We iterate over the documents in it
			// to get the data.
			const nextData = snapshot.docs.map((docSnapshot) => {
				// Extract the document's data from the snapshot.
				const item = docSnapshot.data();

				// The document's id is not in the data,
				// but it is very useful, so we add it to the data ourselves.
				item.id = docSnapshot.id;

				return item;
			});

			// Update our React state with the new data.
			setData(nextData);
		});
	}, [listPath]);

	// Return the data so it can be used by our React components.
	return data;
}

/**
 * Add a new user to the users collection in Firestore.
 * @param {Object} user The user object from Firebase Auth.
 */
export async function addUserToDatabase(user) {
	// Check if the user already exists in the database.
	const userDoc = await getDoc(doc(db, 'users', user.email));
	// If the user already exists, we don't need to do anything.
	if (userDoc.exists()) {
		return;
	} else {
		// If the user doesn't exist, add them to the database.
		// We'll use the user's email as the document id
		// because it's more likely that the user will know their email
		// than their uid.
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
	// Check if current user is owner.
	if (!listPath.includes(currentUserId)) {
		throw new Error('You do not have permission to share this list');
	}
	// Get the document for the recipient user.
	const usersCollectionRef = collection(db, 'users');
	const recipientDoc = await getDoc(doc(usersCollectionRef, recipientEmail));
	// If the recipient user doesn't exist, we can't share the list.
	if (!recipientDoc.exists()) {
		throw new Error('The user with the provided email does not exist');
	}
	// Add the list to the recipient user's sharedLists array.
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
	// TODO: Replace this call to console.log with the appropriate
	// Firebase function, so this information is sent to your database!
	try {
		await addDoc(listCollectionRef, {
			dateCreated: new Date(),
			// NOTE: This is null because the item has just been created.
			// We'll use updateItem to put a Date here when the item is purchased!
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
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to update an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */

	try {
		// Get a reference to the specific item document in Firestore
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

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}

export async function comparePurchaseUrgency(data) {
	const inactiveItem = -1;
	const buyKindOfSoon = 30;
	const buySoon = 7;
	const buyNotSoon = 60;

	const now = new Date();
	const newCategory = data.map((item) => {
		const urgencyIndex = Math.ceil(
			getDaysBetweenDates(now, item.dateNextPurchased.toDate()),
		);

		item.urgencyIndex = urgencyIndex;
		if (urgencyIndex < 0) {
			item.category = 'Overdue';
		} else if (urgencyIndex <= buySoon) {
			item.category = 'soon';
		} else if (urgencyIndex <= buyKindOfSoon) {
			item.category = 'kind of soon';
		} else if (urgencyIndex <= buyNotSoon) {
			item.category = 'Not soon';
		} else {
			item.category = 'inactive';
		}

		return item;
	});

	data.sort((a, b) => {
		//if urgency is inactive, sort it to the bottom
		if (a.category === 'inactive' && b.category !== 'inactive') {
			return 1;
		}
		//if urgency is not inactive, sort it to the top
		if (a.category !== 'inactive' && b.category === 'inactive') {
			return -1;
		}
		//if urgency is the same, sort based on UrgencyIndex(days until next purchase)
		if (a.urgencyIndex !== b.urgencyIndex) {
			return a.urgencyIndex - b.urgencyIndex;
		}
		//if futureEstimate is the same, sort based on name
		return a.name.localeCompare(b.name);
	});

	return data;
}
