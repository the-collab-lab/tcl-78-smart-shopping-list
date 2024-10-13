import { FaGithub, FaShareAlt, FaHome } from 'react-icons/fa';
import { DeveloperCard } from '../components/DeveloperCard';
import { NavLink } from 'react-router-dom';

export function About() {
	return (
		<div className="flex flex-col h-dvh">
			<section className="mb-4 text-center">
				<h1 className="subheading">About this application</h1>
				<p>
					Shop&apos;n Go is a smart shopping list application that enables users
					to level up their shopping experience. Create specialized lists, share
					them with your friends, and keep track of your shopping with ease!
				</p>
			</section>
			<section className="m-4">
				<h3 className="subheading">How does it work?</h3>
				<ol className="list-decimal pl-5">
					<li>Sign in with your Gmail account</li>
					<li>
						Create a List (if you don&apos;t already have one), click on an
						existing one or manage your lists in{' '}
						<NavLink
							to="/"
							className="inline-flex items-center font-semibold hover:text-accent hover:underline underline-offset-2 decoration-[2px]"
						>
							<FaHome className="mr-1" /> Home
						</NavLink>
					</li>
					<li>
						Inside your list, add a new item and select how soon you will need
						to buy it
					</li>
					<li>
						Once you have bought your item, check it off and wait to be reminded
						when you need it again
					</li>
					<li>
						Share your list with friends, family, colleagues or whomever you
						wish.
					</li>
				</ol>
			</section>
			<section className="m-5 text-center">
				<h3 className="subheading mb-4">This application was developed by:</h3>
				<section className="flex justify-items-center grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 max-w-4xl">
					<DeveloperCard
						name="Rebeca Taboada"
						githubLink={'https://github.com/GrannyYetta'}
						linkedinLink={'https://www.linkedin.com/in/rebecataboada/'}
					/>
					<DeveloperCard
						name="Didem Aydin Cakir"
						githubLink={'https://github.com/didemydn'}
						linkedinLink={'https://linkedin.com/in/didem-aydin-cakir'}
					/>

					<DeveloperCard
						name="Eva Langerova"
						githubLink={'https://github.com/eva-lng'}
						linkedinLink={'https://linkedin.com/in/eva-langerova-61059027a'}
					/>
					<DeveloperCard
						name="Tataw Clarkson"
						githubLink={'https://github.com/tataw-cl'}
						linkedinLink={'https://www.linkedin.com/in/tataw-clarkson-tech/'}
					/>
				</section>
				<p className="m-4">
					Get in touch with us, we&apos;d love to hear from you!
				</p>
				<p className="m-2 inline-flex items-center justify-center">
					You can find the repository to this application on GitHub{' '}
					<a href="https://github.com/the-collab-lab/tcl-78-smart-shopping-list">
						<FaGithub className="ml-1 hover:text-accent" />
					</a>
				</p>
			</section>
			<section className="m-5 text-center">
				<p className="items-center justify-center">
					Special thanks to our Mentors{' '}
					<a
						className="font-semibold hover:text-accent hover:underline underline-offset-2 decoration-[2px]"
						href="https://www.linkedin.com/in/chiamakaumeh/"
					>
						Chiamaka Umeh
					</a>{' '}
					and{' '}
					<a
						className="font-semibold hover:text-accent hover:underline underline-offset-2 decoration-[2px]"
						href="https://www.linkedin.com/in/viviana-yanez/"
					>
						Viviana Yanez{' '}
					</a>
					and{' '}
					<a
						className="font-semibold hover:text-accent hover:underline underline-offset-2 decoration-[2px]"
						href="https://the-collab-lab.codes/"
					>
						The Collab Lab&apos;s
					</a>{' '}
					Program. Check out their website to learn more about their awesome
					work!
				</p>
			</section>
		</div>
	);
}
