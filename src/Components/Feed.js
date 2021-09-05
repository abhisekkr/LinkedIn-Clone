import React, { useState, useEffect, useRef } from "react";
import "./styles/feed.css";
import InputOption from "./InputOption";
import Post from "./Post";
import firebase from "firebase";
//Resources
import { db, storage } from "../Resources/firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
//Icons
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import { Avatar } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";

function Feed() {
	const user = useSelector(selectUser);
	const inputRef = useRef(null);
	const filePickerRef = useRef(null);
	const [imageToPost, setImageToPost] = useState(null);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		db.collection("posts")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);
	}, []);

	const sendPost = (e) => {
		e.preventDefault();

		if (!inputRef.current.value) return;

		db.collection("posts")
			.add({
				name: user.displayName,
				description: user.email,
				message: inputRef.current.value,
				photoUrl: user.photoUrl || "",
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			})
			.then((doc) => {
				if (imageToPost) {
					const uploadTask = storage
						.ref(`posts/${doc.id}`)
						.putString(imageToPost, "data_url");

					removeImage();

					uploadTask.on(
						"state_change",
						null,
						(error) => console.log(error),
						() => {
							storage
								.ref("posts")
								.child(doc.id)
								.getDownloadURL()
								.then((url) => {
									db.collection("posts").doc(doc.id).set(
										{
											postImage: url,
										},
										{ merge: true }
									);
								});
						}
					);
				}
			});
		inputRef.current.value = "";
		toast("Post Successful", { position: "top-right" });
	};

	const addImageToPost = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}

		reader.onload = (readerEvent) => {
			setImageToPost(readerEvent.target.result);
		};
	};
	const removeImage = () => {
		setImageToPost(null);
	};

	return (
		<div className="feed">
			<div className="feed__inputContainer">
				<div className="feed__input">
					<Avatar src="https://lh3.googleusercontent.com/ogw/ADea4I6HPtwmbVbs6f28UonZinHbjkWTJ8po7DiYj5cS_g=s32-c-mo"></Avatar>
					<form>
						<input ref={inputRef} type="text" placeholder="Start a Post" />
						<button onClick={sendPost} type="submit">
							Send
						</button>
					</form>
					{imageToPost && (
						<div onClick={removeImage} className="imagePreview">
							<img src={imageToPost} alt="" />
							<p>REMOVE</p>
						</div>
					)}
				</div>
				<div className="feed__inputOptions">
					<input
						id="myImage"
						ref={filePickerRef}
						onChange={addImageToPost}
						onClick={() => filePickerRef.current.click()} //will click the hidden button with the input that opens up
						style={{ display: "none" }}
						type="file"
					/>

					<label htmlFor="myImage">
						<InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
					</label>

					<InputOption Icon={SubscriptionsIcon} title="Video" color="#7FC15E" />
					<InputOption Icon={EventNoteIcon} title="Event" color="#FFBF00" />
					<InputOption
						Icon={CalendarViewDayIcon}
						title="Write article"
						color="#FA8258"
					/>
				</div>
			</div>

			{posts.map(
				({
					id,
					data: { name, description, message, photoUrl, postImage, timestamp },
				}) => (
					<Post
						key={id}
						postId={id}
						name={name}
						description={description}
						message={message}
						photoUrl={photoUrl}
						postImage={postImage}
						timestamp={timestamp}
					/>
				)
			)}
			<ToastContainer />
		</div>
	);
}

export default Feed;
