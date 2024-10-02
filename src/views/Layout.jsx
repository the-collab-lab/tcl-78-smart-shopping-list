import { Outlet, NavLink, Link } from 'react-router-dom';
import './Layout.css';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth';
import { FaShoppingCart } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { FaListCheck } from 'react-icons/fa6';
import { LuSettings2 } from 'react-icons/lu';
import { TbInfoHexagonFilled } from 'react-icons/tb';

export function Layout() {
	const { user } = useAuth();
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<Link to="/">
						<h1>
							{' '}
							<FaShoppingCart /> Shop&apos;n Go
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
							<GoHomeFill /> Home
						</NavLink>
						{user && (
							<NavLink to="/list" className="Nav-link">
								<FaListCheck /> List
							</NavLink>
						)}
						{user && (
							<NavLink to="/manage-list" className="Nav-link">
								<LuSettings2 /> Manage
							</NavLink>
						)}
						<NavLink to="/about" className="Nav-link">
							<TbInfoHexagonFilled /> About
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}
