import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, Layout, List, ManageList, About } from './views';

import { useAuth, useShoppingListData, useShoppingLists } from './api';

import { useStateWithStorage } from './utils';

export function App() {
	const [listPath, setListPath] = useStateWithStorage(
		'tcl-shopping-list-path',
		null,
	);

	const { user } = useAuth();
	const userId = user?.uid;
	const userEmail = user?.email;

	const lists = useShoppingLists(userId, userEmail);

	const data = useShoppingListData(listPath);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={
							<Home
								data={lists}
								setListPath={setListPath}
								userId={userId}
								userEmail={userEmail}
							/>
						}
					/>
					<Route path="/about" element={<About />} />
					<Route
						path="/list"
						element={<List data={data} lists={lists} listPath={listPath} />}
					/>
					<Route
						path="/manage-list"
						element={
							<ManageList listPath={listPath} userId={userId} data={data} />
						}
					/>
				</Route>
			</Routes>
		</Router>
	);
}
