import { Outlet, NavLink, Link } from 'react-router-dom';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth';

import {
	FaHome,
	FaClipboardList,
	FaShareAlt,
	FaInfoCircle,
} from 'react-icons/fa';

export function Layout() {
	const { user } = useAuth();
	return (
		<>
			<div className="layout">
				<header className="layout-header">
					<div className="header-container">
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
				<main className="layout-main">
					<Outlet />
				</main>
				<nav className="nav">
					<div className="nav-container">
						<NavLink to="/" className="nav-link">
							<FaHome />
							<span className="hidden md:inline">Home</span>
						</NavLink>
						{user && (
							<NavLink to="/list" className="nav-link">
								<FaClipboardList />
								<span className="hidden md:inline">List</span>
							</NavLink>
						)}
						{user && (
							<NavLink to="/manage-list" className="nav-link">
								<FaShareAlt />
								<span className="hidden md:inline">Share</span>
							</NavLink>
						)}
						<NavLink to="/about" className="nav-link">
							<FaInfoCircle />
							<span className="hidden md:inline">About</span>
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}
