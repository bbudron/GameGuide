import React from 'react';
import "./style.css";

const NotFound = (props) => {
	return(
		<div className="gameSelectionContainer">
			<div className="game-choice">
				<div className="game-choice-title-error">{props.error.name} not found</div>
			</div>
		</div>
	);
}

export default NotFound;