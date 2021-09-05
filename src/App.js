import React, { useEffect } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Feed from "./Components/Feed";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Login from "./Components/Login";
import { auth } from "./Resources/firebase";
import Widget from "./Components/Widget";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				dispatch(
					login({
						email: userAuth.email,
						uid: userAuth.uid,
						displayName: userAuth.displayName,
						photoUrl: userAuth.photoURL,
					})
				);
			} else {
				dispatch(logout());
			}
		});
	}, []);

	return (
		<div className="app">
			{!user ? (
				<Login />
			) : (
				<div>
					<Header />
					<div className="app__body">
						<Sidebar />
						<Feed />
						<Widget />
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
