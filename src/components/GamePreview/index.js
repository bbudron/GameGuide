import React, {Component} from 'react';
import './style.css';

class GamePreview extends Component {

	gameSelect = (event) => {
		this.props.gameSelect(event.target.id)
	}

	render() {

		return (
			<div className="gamesPreview">
				{this.props.games.map((game, i) => {
					let {cover} = game;
					return(
						<div key={i} onClick={this.gameSelect} id={i} className="gamePreview">
						{cover === "undefined" ? <div className="gamePreviewImageLoading" id={i}>{this.props.games[i].name}<br /><p className="gamePreviewImageLoadingText">Image not found</p></div> : <img id={i} alt="game preview" className="gamePreviewImage" src={cover}/>}
						</div>)
				})}
			</div>
		)
	}
}

export default GamePreview;