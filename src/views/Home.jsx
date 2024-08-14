import './Home.css';
import { SingleList } from '../components';

export function Home({ data, setListPath }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{data.map((list, id) => (
					<SingleList key={id} name={list.name} />
				))}
			</ul>
		</div>
	);
}
