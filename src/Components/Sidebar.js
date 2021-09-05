import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./styles/sidebar.css";
//Icons
import { HiUserGroup } from "react-icons/hi";
import { IoIosAdd } from "react-icons/io";

function Sidebar() {
	const user = useSelector(selectUser);
	const recentItem = (topic) => (
		<div className="sidebar__recentItem">
			<span className="sidebar__hash">#</span>
			<p>{topic}</p>
		</div>
	);

	const Groups = ({ topic, Icon }) => (
		<div className="sidebar__BottomGroups">
			{Icon && <Icon className="sidebar__group" />}
			<p>{topic}</p>
		</div>
	);

	return (
		<div className="sidebar">
			<div className="sidebar__top">
				<img
					src="https://png.pngtree.com/thumb_back/fh260/background/20200425/pngtree-color-technology-sense-creative-integrated-circuit-background-image_334517.jpg"
					alt=""
				/>
				<Avatar src={user.photoUrl} className="sidebar__avatar">
					{user.displayName[0]}
				</Avatar>
				<h4>{user.displayName}</h4>
				<p>{user.email}</p>
			</div>

			<div className="sidebar__stats">
				<div className="sidebar__stat">
					<p>Who viewed your profile</p>
					<p className="sidebar__statNumber">30</p>
				</div>
				<div className="sidebar__stat">
					<p>Views of your post</p>
					<p className="sidebar__statNumber">100</p>
				</div>
			</div>

			<div className="sidebar__bottom">
				<p>Recent</p>
				{recentItem("ReactJS")}
				{recentItem("Programming")}
				{recentItem("UI designs")}
				{recentItem("MERN developer")}
				{recentItem("Internships")}
				<p>Groups</p>
				<Groups Icon={HiUserGroup} topic="GeeksforGeeks" />
				<Groups Icon={HiUserGroup} topic="React Developers" />
				<Groups Icon={HiUserGroup} topic="Frontend Devs" />
				<div className="sidebar__event">
					<p>Events</p>
					<IoIosAdd />
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
