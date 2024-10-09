import { SingleList, AddList } from '../components';
import { auth } from '../api/config.js';
import { useAuth } from '../api/useAuth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export function Home({ data, setListPath, userId, userEmail }) {
	const { user } = useAuth();

	return (
		<>
			{!!user ? (
				<>
					<h2 className="subheading">
						Welcome back {auth.currentUser.displayName.split(' ')[0]}!
					</h2>
					<AddList
						setListPath={setListPath}
						userId={userId}
						userEmail={userEmail}
					/>
					{data.length === 0 && (
						<p>
							{' '}
							You don&apos;t have any shopping lists yet. Start by creating your
							first one!
						</p>
					)}
					{data.length > 0 && (
						<ul>
							{data.map((list, id) => (
								<SingleList
									key={id}
									name={list.name}
									path={list.path}
									setListPath={setListPath}
									userId={userId}
									userEmail={userEmail}
								/>
							))}
						</ul>
					)}
				</>
			) : (
				<>
					<p className="text-2xl text-center">
						Welcome to Shop&apos;n Go the smart app that keeps track of your
						shopping lists and schedule.
					</p>
					<p className="text-lg italic mt-5 mb-16 text-center">
						Smart Choices, Swift Shopping!
					</p>
					<p className="text-xl text-center">
						To get started,{' '}
						<button
							className="text-accent underline underline-offset-2 hover:font-medium hover:decoration-[3px]"
							onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
						>
							sign in
						</button>{' '}
						and begin creating your own shopping lists.
					</p>
				</>
			)}
		</>
	);
}
