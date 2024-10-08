// import './SingleList.css';
import { useNavigate } from 'react-router-dom';
import { deleteList } from '../api';
import { FaTrashCan } from 'react-icons/fa6';

export function SingleList({ name, path, setListPath, userId, userEmail }) {
	const navigate = useNavigate();
	const isUsersList = userId === path.split('/')[0];

	function handleClick() {
		setListPath(path);
		navigate('/list');
	}

	const handleDelete = async (path, userEmail) => {
		if (window.confirm(`Do you really want to delete ${name}?`)) {
			try {
				await deleteList(path, userEmail);
				setListPath(null);
			} catch (error) {
				console.log(error);
				alert('Failed to delete the list. Please try again!');
			}
		}
	};

	return (
		<li className="flex flex-row items-baseline text-lg m-4 p-2 border-2 rounded-xl border-yellow-300 hover:shadow-lg">
			<button onClick={handleClick}>{name}</button>
			{isUsersList && (
				<button
					className="flex place-self-center pl-2"
					onClick={() => handleDelete(path, userEmail)}
				>
					<FaTrashCan className="" />
				</button>
			)}
		</li>
	);
}
