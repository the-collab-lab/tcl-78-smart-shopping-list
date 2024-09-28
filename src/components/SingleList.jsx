import './SingleList.css';
import { useNavigate } from 'react-router-dom';
import { deleteList } from '../api';

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
		<li className="SingleList">
			<button onClick={handleClick}>{name}</button>
			{isUsersList && (
				<button onClick={() => handleDelete(path, userEmail)}>X</button>
			)}
		</li>
	);
}
