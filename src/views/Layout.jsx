import { Outlet, NavLink, Link } from 'react-router-dom';
import './Layout.css';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth';
import { IoMdHome } from 'react-icons/io';
import { LuSettings2, LuListTodo } from 'react-icons/lu';
import { RiFileInfoFill } from 'react-icons/ri';
import { FaShoppingCart } from 'react-icons/fa';

export function Layout() {
	const { user } = useAuth();
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<Link to="/">
						<h1>
							{' '}
							<FaShoppingCart /> Shop&aposn Go
						</h1>
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
							<IoMdHome />
						</NavLink>
						{user && (
							<NavLink to="/list" className="Nav-link">
								<LuListTodo />
							</NavLink>
						)}
						{user && (
							<NavLink to="/manage-list" className="Nav-link">
								<LuSettings2 />
							</NavLink>
						)}
						<NavLink to="/about" className="Nav-link">
							<RiFileInfoFill />
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}
