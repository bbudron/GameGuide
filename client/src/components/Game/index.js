import React from 'react';
import './style.css';

const star1 = (<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><g strokeLinecap="square" strokeLinejoin="miter" stroke="white"><polygon fill="white" stroke="white" strokeMiterlimit="10" points="12,2.49 15.09,8.75 22,9.754 17,14.628 18.18,21.51 12,18.262 5.82,21.51 7,14.628 2,9.754 8.91,8.75 "/></g></svg>);

const star2 = (<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><g strokeLinecap="square" strokeLinejoin="miter" stroke="currentColor"><polygon fill="none" stroke="currentColor" strokeMiterlimit="10" points="12,2.49 15.09,8.75 22,9.754 17,14.628 18.18,21.51 12,18.262 5.82,21.51 7,14.628 2,9.754 8.91,8.75 "/></g></svg>);

const Game = (props) => {

	let {rating, cover, first_release_date, name, summary, url, videos, websites} = props.game;

	// determine how many stars are needed based on game rating
	let stars = [];
	if(rating !== null) {
		for(let i = 0; i < 5; i++) {
			if(i <= rating)
				stars[i] = 1;
			else
				stars[i] = 0;
		}
	}

	if(cover === "undefined") cover = null;

	const openLink = () =>  window.open(url);

	return (
		<div>
			{name && (<div className="game-title">{name}</div>)}
			{cover && (<div className="game-image-container"> <img className="game-image" src={cover} alt={name} /></div>)}
			{rating && (<div className="game-rating">Rating {stars.map((star, i) => {
				if(star === 1) return (
					<div className="game-rating-star-container" key={i}>
						{star1}
					</div>);
				else return (
					<div className="game-rating-star-container" key={i}>
						{star2}
					</div>);
			})}</div>)}
			{summary ? (
				<div className="game-summary"><div className="game-indent">_</div>{summary}</div>) : <div>Not enough game information found.</div>}
			<div className="game-data-container">
				{first_release_date && (<p className="game-release-date">{`Released: ${first_release_date[0]} ${first_release_date[1]} ${first_release_date[2]}`}</p>)}
				{url && (<p onClick={openLink} className="game-source">Original Source: IGN</p>)}
			</div>
			{videos ? (<div className="game-videos">Related Videos: 
				{videos.map((video, i) => {
					let address = `https://www.youtube.com/embed/${video.video_id}`
					return <p key={i}><iframe width="448" height="252" src={address}  title={video.video_id} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe></p>}
				)}</div>) : null}
			{websites && (websites.forEach(website => {return <p>{website.url}</p>}))}
		</div>
	)
	
}

export default Game;
