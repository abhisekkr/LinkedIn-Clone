import React from "react";
import "./styles/headerOption.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Avatar } from "@material-ui/core";

function HeaderOption({ avatar, Icon, title, onClick, className }) {
	const user = useSelector(selectUser);
	return (
		<div onClick={onClick} className="headerOption">
			{Icon && <Icon className="headerOption__icon" />}
			{avatar && (
				<Avatar className="headerOption__icon">{user?.displayName[0]}</Avatar>
			)}
			<h3 className="headerOption__title">{title}</h3>
		</div>
	);
}

export default HeaderOption;
