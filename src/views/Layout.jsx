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
			<div className="flex flex-col h-dvh">
				<header className="lg:mb-4">
					<div className="container mx-auto flex justify-between items-center p-2">
						<Link to="/">
							<h1 className="logo">
								{' '}
								<img
									className="h-[50px] md:h-[60px]"
									src="/img/plastic-bag.png"
									alt=""
								/>{' '}
								Shop&apos;n Go
							</h1>
						</Link>
						{!!user ? (
							<SignOutButton></SignOutButton>
						) : (
							<SignInButton></SignInButton>
						)}
					</div>
				</header>
				<main className="mx-auto w-full max-w-[600px] p-5 pb-16 md:pb-20">
					<Outlet />
				</main>
				<nav className="bottom-0 fixed w-full p-2 md:py-0 bg-base dark:bg-secondary">
					<div className="container mx-auto flex flex-row justify-evenly">
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
