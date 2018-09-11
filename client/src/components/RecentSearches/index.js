import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';


const RecentSearches = (props) => {

	// gets searches from local storage and into an array
	const searchTerm1 = localStorage.getItem("search1");
	const searchTerm2 = localStorage.getItem("search2");
	const searchTerm3 = localStorage.getItem("search3");
	const searches = [searchTerm1, searchTerm2, searchTerm3];


	return (
		<div className="recent-searches-container">
			{(searches[0] !== null && searches[0] !== "null") && <h1 className="recent-search-title">Recent Searches</h1>}
			<div className="recent-searches-list">
			{searches.map((search, i) => {
				if(search !== null && search !== "null") {
					return (
						<Link to = {`/games/${search}`} key={i} className="recent-search-item">
							<div className="svg-point"></div>
							<div className="recent-search-term">{search}</div>
						</Link>
				)} else return null;
			})}
			</div>
		</div>
	);
}

export default RecentSearches;
