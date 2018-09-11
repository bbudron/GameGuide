import React from 'react';
import "./style.css";
import Header from "../../components/Header";
import ArticlesPreview from "../../components/ArticlesPreview";

const Home = (props) => {
	return (
		<div>
			<Header headerStyle="header1" />
			<ArticlesPreview articles={props.articles}/>
		</div>
	);
	
}

export default Home;