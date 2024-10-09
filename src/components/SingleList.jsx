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
		<li
			className="mx-auto w-full max-w-[450px] flex justify-between items-center mb-3 py-2 px-3 
			border-2 rounded-lg border-accent hover:shadow-lg hover:bg-accent 
			hover:text-primary item-transition"
		>
			<button onClick={handleClick}>{name}</button>
			{isUsersList && (
				<button onClick={() => handleDelete(path, userEmail)}>
					<FaTrashCan className="hover:text-red-700" />
				</button>
			)}
		</li>
	);
}
