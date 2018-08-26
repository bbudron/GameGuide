import React from 'react';
import "./style.css";
import Header from "../../components/Header";
import RecentSearches from "../../components/RecentSearches";
import ArticlesPreview from "../../components/ArticlesPreview";

const Home = (props) => {
	return (
		<div>
			<Header headerStyle="header1" />
			<RecentSearches />
			<ArticlesPreview articles={props.articles}/>
		</div>
	);
	
}

export default Home;