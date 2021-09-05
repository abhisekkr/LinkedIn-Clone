import React from "react";
import "./styles/inputOption.css";

function InputOption({ Icon, title, color, onClick }) {
	return (
		<div onClick={onClick} className="inputOption">
			<Icon style={{ color: color }} />
			<h4>{title}</h4>
		</div>
	);
}

export default InputOption;
