import { FaLinkedin, FaGithub } from 'react-icons/fa';

export function DeveloperCard({ name, githubLink, linkedinLink }) {
	return (
		<div>
			<ul>
				<li className="flex flex-row align-middle">
					{name}{' '}
					<a className="p-2" href={githubLink}>
						<FaGithub className="hover:text-accent" />
					</a>{' '}
					<a className="p-2" href={linkedinLink}>
						<FaLinkedin className="hover:text-accent" />
					</a>{' '}
				</li>
			</ul>
		</div>
	);
}
