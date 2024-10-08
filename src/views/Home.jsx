import './Home.css';
import { SingleList, AddList } from '../components';
import { auth } from '../api/config.js';
import { SignInButton, useAuth } from '../api/useAuth';

export function Home({ data, setListPath, userId, userEmail }) {
	const { user } = useAuth();

	return (
		<div className="Home">
			<div className="container mx-auto px-2 flex flex-col items-center justify-center justify-items-center">
				{!!user ? (
					<>
						<p className="text-3xl ">
							Welcome back {auth.currentUser.displayName.split(' ')[0]}!
						</p>
						{data.length === 0 && (
							<p>
								{' '}
								You don&apos;t have any shopping lists yet. Start by creating
								your first one!
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
						<p className="text-2xl text-center">
							Welcome to Shop&apos;n Go the smart app that keeps track of your
							shopping lists and schedule.
						</p>
						<p className="text-lg italic mt-5 text-center">
							Smart Choices, Swift Shopping!
						</p>
						<SignInButton className="rounded-full border-yellow-300 border-2 hover:bg-yellow-300"></SignInButton>
					</>
				)}
			</div>
		</div>
	);
}
