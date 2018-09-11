import React from 'react';
import "./style.css";
import Header from '../../components/Header';
import NotFound from '../../components/NotFound';
import RecentSearches from "../../components/RecentSearches";


const NotFoundPage = (props) => {
	return(
		<div>
			<Header headerStyle="header2" />
			<NotFound error={props.error} />
			<RecentSearches />
		</div>
	);
}

export default NotFoundPage;