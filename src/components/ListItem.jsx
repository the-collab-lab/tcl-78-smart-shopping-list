import { useState } from 'react';
import './ListItem.css';

export function ListItem({ name, id, onCheck }) {
	const { isChecked, setIsChecked } = useState(false);

	const handleChecked = () => {
		const newCheckedStatus = !isChecked;
		setIsChecked(newCheckedStatus);
		onCheck(id, newCheckedStatus);
	};
	return (
		<li className="ListItem">
			<label>
				<input type="checkbox" checked={isChecked} onChange={handleChecked} />
				{name}
			</label>
		</li>
	);
}
