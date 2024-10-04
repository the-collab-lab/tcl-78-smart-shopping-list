import { useEffect, useState } from 'react';
import { auth } from './config.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addUserToDatabase } from './firebase.js';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

export const SignInButton = () => (
	<button
		className="btn-auth"
		type="button"
		onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
	>
		<span className="text-md md:text-xl">Sign In</span>
		<FiLogIn className="text-2xl" />
	</button>
);

export const SignOutButton = () => (
	<button className="btn-auth" type="button" onClick={() => auth.signOut()}>
		<span className="text-md md:text-xl">Sign Out</span>
		<FiLogOut className="text-2xl" />
	</button>
);

/**
 * A custom hook that listens for changes to the user's auth state.
 * Check out the Firebase docs for more info on auth listeners:
 * @see https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data
 */
export const useAuth = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setUser(user);
			if (user) {
				addUserToDatabase(user);
			}
		});
	}, []);

	return { user };
};
