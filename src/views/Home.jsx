import { SingleList, AddList } from '../components';
import { auth } from '../api/config.js';
import { SignInButton, useAuth } from '../api/useAuth';

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
					<p className="text-lg italic mt-5 text-center">
						Smart Choices, Swift Shopping!
					</p>
					<SignInButton className="btn-auth"></SignInButton>
				</>
			)}
		</>
	);
}
