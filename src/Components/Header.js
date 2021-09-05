import React from "react";
import "./styles/header.css";
import HeaderOption from "./HeaderOption";
//Resources
import { logout, selectUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "../Resources/firebase";
import { useSelector } from "react-redux";
//Icons
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AppsIcon from "@material-ui/icons/Apps";
import smallLogo from "../Images/174857.png";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";

function Header() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const logoutOfApp = () => {
		dispatch(logout());
		auth.signOut();
	};

	return (
		<div className="header">
			<div className="header__left">
				<img src={smallLogo} alt="" />
				<div className="header__search">
					<SearchIcon />
					<input placeholder="Search" type="text" />
				</div>
			</div>
			<div className="header__right">
				<HeaderOption Icon={HomeIcon} title="Home" />
				<HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
				<HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
				<HeaderOption Icon={ChatIcon} title="Messaging" />
				<HeaderOption Icon={NotificationsIcon} title="Notifications" />
				<div className="me">
					<Avatar className="me__avatar">{user?.displayName[0]}</Avatar>
					<p>Me</p>
					<div className="signOut__modal">
						<p onClick={logoutOfApp}>SignOut</p>
					</div>
				</div>
				<div className="vertical" />
				<HeaderOption Icon={AppsIcon} title="Work" />
			</div>
		</div>
	);
}

export default Header;
