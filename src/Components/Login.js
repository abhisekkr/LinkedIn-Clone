import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { auth } from "../Resources/firebase";
import "./styles/login.css";
import logo from "../Images/580b57fcd9996e24bc43c528.png";
import loginPageImage from "../Images/loginPageImage.png";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [registerOption, setRegisterOption] = useState(false);
	const dispatch = useDispatch();

	const register = () => {
		setRegisterOption(true);
		if (!name) {
			return alert("Please enter Full Name");
		}
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((userAuth) => {
				userAuth.user
					.updateProfile({
						displayName: name,
					})
					.then(() => {
						dispatch(
							login({
								email: userAuth.user.email,
								uid: userAuth.user.uid,
								displayName: name,
							})
						);
					});
			})
			.catch((error) => alert(error));
	};

	const loginToApp = (e) => {
		e.preventDefault();

		auth
			.signInWithEmailAndPassword(email, password)
			.then((userAuth) => {
				dispatch(
					login({
						email: userAuth.user.email,
						uid: userAuth.user.uid,
						displayName: userAuth.user.displayName,
						profileUrl: userAuth.user.photoURL,
					})
				);
			})
			.catch((error) => alert(error));
	};

	return (
		<div className="loginPage">
			<img src={loginPageImage} alt="" />
			<div className="login">
				<img src={logo} alt="" />
				{registerOption === false ? (
					<form>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
							type="email"
						/>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							type="password"
						/>
						<button type="submit" onClick={loginToApp}>
							{" "}
							Sign In
						</button>
					</form>
				) : (
					<form>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Full Name"
							type="text"
						/>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
							type="email"
						/>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							type="password"
						/>
						<button type="submit" onClick={register}>
							{" "}
							Sign Up
						</button>
					</form>
				)}
				{registerOption === false ? (
					<p>
						Not a Member ?
						<span
							className="login__register"
							onClick={(e) => setRegisterOption(true)}>
							{" "}
							Register Now
						</span>
					</p>
				) : (
					<p>
						Already a Member ?
						<span
							className="login__register"
							onClick={(e) => setRegisterOption(false)}>
							{" "}
							Sign In
						</span>
					</p>
				)}
			</div>
		</div>
	);
}

export default Login;
