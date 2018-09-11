import React, {Component} from 'react';
import "./style.css";
import {Link, withRouter} from 'react-router-dom';

// svg animation
const arrow = (
	<svg id="arrows" width="25" height="25" viewBox="0 0 48 48" stroke="white" strokeWidth="5">
		<g fill="white">
			<path d="M14.83 16.42L24 25.59l9.17-9.17L36 19.25l-12 12-12-12z"/>
		</g>
	</svg>);

class ArticlesPreviewWO extends Component {

	articleSelect = (event) => {
		let address = `/articles/${event.target.id}`;
		this.props.history.push(address);
	}

	articlePageSelect = () => {
		this.props.history.push("/articles")
	}

	render() {
		const curPage = this.props.location.pathname.length === 1 ? "-home" : "";
		return (
			<div className={`footer${curPage}`} id="footer" onClick={this.articlePageSelect}>
			<h3 className="footerTitle">{arrow}<div className="footerTitleText">Latest News In Gaming</div>{arrow}</h3>
			<div className="articles-collapsed">
				{this.props.articles.map((article, i) => {
					if(i < 3) {
					return (
						<div key={i} id={i} onClick={this.articleSelect} className={`articlePreview${curPage}`}>
						<img id={i} className="articlePreviewImage" src={article.image} alt={article.title} />
						<div id={i} className="articlePreviewTitle">{article.title}</div>
						</div>
					)} else return null;
				})}
			</div>
			<div className="footer-view-more">
				<Link to = {`/articles`}>
					<p className={`footer-view-more-text${curPage}`}>view more</p>
				</Link>
			</div>
			</div>
		);
	}
}
const ArticlesPreview = withRouter(ArticlesPreviewWO);
export default ArticlesPreview;