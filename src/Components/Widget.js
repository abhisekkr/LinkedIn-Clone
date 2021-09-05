import React from "react";
import "./styles/widget.css";
//Icons
import InfoIcon from "@material-ui/icons/Info";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import bottomImage from "../Images/Screenshot 2021-06-12 080247.png";

function Widget() {
	const newsArticle = (heading, subtitle) => (
		<div className="widgets__article">
			<div className="widgets__articleLeft">
				<FiberManualRecordIcon />
			</div>
			<div className="widgets__articleRight">
				<h4>{heading}</h4>
				<p>{subtitle}</p>
			</div>
		</div>
	);

	return (
		<div className="widget">
			<div className="widget__top">
				<div className="widget__header">
					<h2>LinkedIn News</h2>
					<InfoIcon />
				</div>
				{newsArticle(
					"Covid surge kills shoppers'apetite",
					"10d ago . 1,524 readers "
				)}
				{newsArticle(
					"Using a job offer to get a pay hike",
					"5d ago . 21,156 readers "
				)}
				{newsArticle("Is WFH burdening women ? ", "8d ago . 13,170 readers ")}
				{newsArticle(
					"How to spend day off work ? ",
					"12d ago . 4,524 readers "
				)}
				{newsArticle(
					"Oppurtunities boom in data science",
					"10d ago . 5,226 readers "
				)}
			</div>

			<div className="widget__bottom">
				<div className="widget__bottomHeader">
					<h2>Today's most viewed courses</h2>
					<InfoIcon />
				</div>
				{newsArticle(
					"The Six Morning Habits of High Perfor...",
					"Pete Mockaitis"
				)}
				{newsArticle("Speaking Confidently and Effectively", "Pete Mockaitis")}
				{newsArticle("Unconsious Bias", "Stacey Gordon")}
			</div>
			<div className="widget__bottomImage">
				<img src={bottomImage} alt="" />
			</div>
		</div>
	);
}

export default Widget;
