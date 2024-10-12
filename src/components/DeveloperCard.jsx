import { FaLinkedin, FaGithub } from 'react-icons/fa';

export function DeveloperCard({ name, githubLink, linkedinLink }) {
	return (
		<div>
			<ul>
				<li className="flex flex-row">
					{name}{' '}
					<a className="p-2" href={githubLink}>
						<FaGithub />
					</a>{' '}
					<a className="p-2" href={linkedinLink}>
						<FaLinkedin />
					</a>{' '}
				</li>
			</ul>
		</div>
	);
}
