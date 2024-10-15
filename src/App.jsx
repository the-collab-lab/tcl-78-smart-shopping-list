import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

import { Home, Layout, List, ManageList, About } from './views';

import { useAuth, useShoppingListData, useShoppingLists } from './api';

import { useStateWithStorage } from './utils';

function PrivateRoute({ children }) {
	const { user, loading } = useAuth();

	if (loading) {
		return <div>Loading...</div>;
	}

	return user ? children : <Navigate to="/" />;
}

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
						element={
							<PrivateRoute>
								<List data={data} lists={lists} listPath={listPath} />
							</PrivateRoute>
						}
					/>
					<Route
						path="/manage-list"
						element={
							<PrivateRoute>
								<ManageList listPath={listPath} userId={userId} data={data} />
							</PrivateRoute>
						}
					/>
				</Route>
			</Routes>
		</Router>
	);
}
