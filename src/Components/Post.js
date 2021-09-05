import React, { useState, useEffect } from "react";
import InputOption from "./InputOption";
import "./styles/post.css";
import { db } from "../Resources/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import firebase from "firebase";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import { RiShareForwardLine } from "react-icons/ri";
import { Avatar } from "@material-ui/core";
import { RiSendPlaneFill } from "react-icons/ri";
import likeIcon from "../Images/Linkedin-Like-Icon-Thumbup250.png";
import celebrate from "../Images/Linkedin-Celebrate-Icon-ClappingHands250.png";
import love from "../Images/Linkedin-Love-Icon-Heart250.png";

function Post({
	name,
	description,
	message,
	photoUrl,
	postImage,
	timestamp,
	postId,
	username,
}) {
	const user = useSelector(selectUser);
	const [likes, setLikes] = useState(0);
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState("");
	const [openCommentBar, setOpenCommentBar] = useState("false");

	const postComment = (event) => {
		event.preventDefault();
		db.collection("posts").doc(postId).collection("comments").add({
			text: comment,
			username: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setComment("");
	};

	useEffect(() => {
		if (postId) {
			db.collection("posts")
				.doc(postId)
				.collection("comments")
				.orderBy("timestamp", "desc")
				.onSnapshot((snapshot) => {
					setComments(snapshot.docs.map((doc) => doc.data()));
				});
		}
	}, [postId]);

	useEffect(() => {
		setLikes(JSON.parse(window.localStorage.getItem("likes")));
	}, []);

	useEffect(() => {
		window.localStorage.setItem({ message }, likes);
	}, [likes]);

	return (
		<div className="post">
			<div className="post__header">
				<Avatar src={photoUrl}>{name[0]}</Avatar>
				<div className="post__info">
					<h4>{name}</h4>
					<p>{description}</p>
					<p>{new Date(timestamp?.toDate()).toUTCString()}</p>
				</div>
			</div>

			<div className="post__body">
				<p>{message}</p>
				<img src={postImage} alt="" />
			</div>

			<div className="post__reaction">
				<img src={likeIcon} className="like" alt="" />
				<img src={celebrate} className="like" alt="" />
				<img src={love} className="like" alt="" />
				<p className="text">{likes} likes</p>
				<p className="text">|</p>
				<p className="text"> {comments.length} comments</p>
			</div>

			<div className="horizontal" />
			<div className="post__buttons">
				<InputOption
					onClick={(e) => setLikes(likes + 1)}
					Icon={ThumbUpAltOutlinedIcon}
					title="like"
					color="gray"
				/>
				<InputOption
					Icon={ChatBubbleOutlineRoundedIcon}
					title="Comment"
					color="gray"
					onClick={(e) => setOpenCommentBar("true")}
				/>
				<InputOption Icon={RiShareForwardLine} title="Share" color="gray" />
				<InputOption Icon={RiSendPlaneFill} title="Send" color="gray" />
			</div>

			{openCommentBar === "true" && (
				<div className="comments">
					<Avatar src={photoUrl}>{name[0]}</Avatar>
					<form className="comment">
						<input
							type="text"
							placeholder="Add a Comment "
							className="comment__box"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<button
							className="comment__button"
							disabled={!comment}
							type="submit"
							onClick={postComment}
						/>
					</form>
				</div>
			)}

			{comments.map((comment) => (
				<div className="readComments">
					<Avatar src={photoUrl}>{name[0]}</Avatar>
					<div className="readComments__box">
						<h5>{comment.username}</h5>
						<p>{comment.text}</p>
					</div>
				</div>
			))}
		</div>
	);
}

export default Post;
