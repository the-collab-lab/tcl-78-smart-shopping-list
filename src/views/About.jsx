import { FaGithub, FaShareAlt, FaHome } from 'react-icons/fa';
import { DeveloperCard } from '../components/DeveloperCard';

export function About() {
	return (
		<div className="flex flex-col h-dvh items-center justify-center max-w-3xl w-full px-4 sm:px-6 lg:px-8 ">
			<section className="mb-4 text-center">
				<h1 className="subheading">About this application</h1>
				<p>
					Shop&apos;n Go is a smart shopping list application that enables our
					users to level up their shopping experience. Create specialized lists
					and share them how best suits you!
				</p>
			</section>
			<section className="m-4">
				<h3 className="subheading">How does it work?</h3>
				<ol className="list-decimal pl-5">
					<li>Sign in with your Gmail account</li>
					<li>
						Create a List (if you don&apos;t already have one), click on an
						existing one or manage your lists in{' '}
						<span className="inline-flex items-center">
							<FaHome className="mr-1" />
							Home
						</span>
					</li>
					<li>
						Inside your list, add a new item and select how soon you will need
						to buy it.
					</li>
					<li>
						Once you have bought your item, check it off and wait to be reminded
						when you need it again.
					</li>
					<li>
						Share your list with friends, family, colleagues or whomever you
						wish. Just click on{' '}
						<span className="inline-flex items-center">
							{' '}
							<FaShareAlt className="mr-1" />
							Share{' '}
						</span>
					</li>
				</ol>
			</section>
			<section className="m-5 text-center">
				<h3 className="subheading">This application was developed by:</h3>
				<section className="grid grid-cols-2 gap-4 mt-2 ">
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
					<FaGithub className="ml-1" />
				</p>
			</section>
			<section className="m-5 text-center">
				<p className="items-center justify-center">
					Special thanks to our Mentors{' '}
					<a
						className="font-semibold"
						href="https://www.linkedin.com/in/chiamakaumeh/"
					>
						Chiamaka Umeh
					</a>{' '}
					and{' '}
					<a
						className="font-semibold"
						href="https://www.linkedin.com/in/viviana-yanez/"
					>
						Viviana Yanez{' '}
					</a>
					and{' '}
					<a className="font-semibold" href="https://the-collab-lab.codes/">
						The Collab Lab&apos;s
					</a>{' '}
					Program. Check out their website to learn more about their awesome
					work!
				</p>
			</section>
		</div>
	);
}
