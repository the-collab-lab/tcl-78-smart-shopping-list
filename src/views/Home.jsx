import './Home.css';
import { SingleList, AddList } from '../components';
import { auth } from '../api/config.js';
import { SignInButton, useAuth } from '../api/useAuth';

export function Home({ data, setListPath, userId, userEmail }) {
	const { user } = useAuth();

	return (
		<div className="Home">
			{!!user ? (
				<>
					<p>Welcome back {auth.currentUser.displayName.split(' ')[0]}!</p>
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
					<AddList
						setListPath={setListPath}
						userId={userId}
						userEmail={userEmail}
					/>
				</>
			) : (
				<>
					<p>
						Welcome to the Shopping List app. Some catchy phrase / intro
						message. Picture below?
					</p>
					<SignInButton></SignInButton>
				</>
			)}
		</div>
	);
}
