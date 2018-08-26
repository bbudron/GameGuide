import React from 'react';
import './style.css';


const Article = (props) => {
	
	let {article} = props;

	// opens new window
	const openLink = () =>  window.open(article.url);

	if(typeof article !== "undefined") {
		return (
			<div className="article">
				<div className="article-title">{article.title}</div>
				<div className="article-image-container"><img className="article-image" src={article.image} alt={article.title} /></div>
				<div>
					<div className="article-indent">_</div>
					<div className="article-description">{article.description}..</div>
					<div onClick={openLink} className="article-description-continue">read more</div>
				</div>
				<div className="article-author-source">
					<p className="article-source">Written by {article.author}</p>
					<p onClick={openLink} className="article-link">Original Source: IGN</p>
				</div>
			</div>
		);
	} else {
		return (
			<div className="article">
				<h1>article cannot be found right now, please try again</h1>
				<div id="articleImage"><img src="http://via.placeholder.com/350x150" alt="not found" /></div>
			</div>
		);
	}
}

export default Article;