import { Outlet, NavLink, Link } from 'react-router-dom';
import './Layout.css';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth';

export function Layout() {
	const { user } = useAuth();
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<Link to="/">
						<h1>#APP/LogoPic</h1>
					</Link>
					{!!user ? (
						<SignOutButton></SignOutButton>
					) : (
						<SignInButton></SignInButton>
					)}
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					<div className="Nav-container">
						<NavLink to="/" className="Nav-link">
							Home
						</NavLink>
						{user && (
							<NavLink to="/list" className="Nav-link">
								List
							</NavLink>
						)}
						{user && (
							<NavLink to="/manage-list" className="Nav-link">
								Manage List
							</NavLink>
						)}
						<NavLink to="/about" className="Nav-link">
							About
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}
