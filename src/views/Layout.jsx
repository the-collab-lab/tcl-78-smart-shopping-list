import { Outlet, NavLink, Link } from 'react-router-dom';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth';

import {
	FaShoppingCart,
	FaHome,
	FaClipboardList,
	FaShareAlt,
	FaInfoCircle,
} from 'react-icons/fa';

export function Layout() {
	const { user } = useAuth();
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<div className="Header-container">
						<Link to="/">
							<h1 className="logo">
								{' '}
								<img src="/img/plastic-bag.png" alt="" /> Shop&apos;n Go
							</h1>
						</Link>
						{!!user ? (
							<SignOutButton></SignOutButton>
						) : (
							<SignInButton></SignInButton>
						)}
					</div>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					<div className="Nav-container">
						<NavLink to="/" className="Nav-link">
							<FaHome />
							<span className="hidden md:inline">Home</span>
						</NavLink>
						{user && (
							<NavLink to="/list" className="Nav-link">
								<FaClipboardList />
								<span className="hidden md:inline">List</span>
							</NavLink>
						)}
						{user && (
							<NavLink to="/manage-list" className="Nav-link">
								<FaShareAlt />
								<span className="hidden md:inline">Manage List</span>
							</NavLink>
						)}
						<NavLink to="/about" className="Nav-link">
							<FaInfoCircle />
							<span className="hidden md:inline">About</span>
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}
