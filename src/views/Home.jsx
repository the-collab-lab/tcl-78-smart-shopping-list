import './Home.css';
import { SingleList } from '../components';
import { AddList } from '../components/AddList';
import { auth } from '../api/config.js';
import { SignInButton, useAuth } from '../api/useAuth';

export function Home({ data, setListPath, userId, userEmail }) {
	const { user } = useAuth();

	return (
		<div className="Home">
			{!!user ? (
				<>
					<p>Welcome back {auth.currentUser.displayName}!</p>
					{data.length === 0 && (
						<p>
							{' '}
							It seems you don&apos;t have any lists yet, Please create a list
							using the form below
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
