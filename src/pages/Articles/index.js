import React, {Component} from 'react';
import "./style.css";
import Header from "../../components/Header";
import MDSpinner from "react-md-spinner";
import Gallery from 'react-photo-gallery';
import Article from '../../components/Article';
import PageNav from "../../components/PageNav";

class Articles extends Component {
	state = {
		index: null,
		openDetail: false
	}

	componentWillMount() {
		// sets the id of the selected article
		const {id} = this.props;
		if(typeof id !== "undefined") {
			this.setState({index: id, openDetail: true})
		};
	}
	
	photoClick = (event, photo) => {
		// go to selected article on photo click
		this.setState({index: photo.index, openDetail: true})
	}

	goToArticles = () => {
		// go to artcles page
		this.setState({index: null, openDetail: false});
	}

	goBack = () => {
		// go to previous article
		let id = this.state.index;
		id = parseInt(id, 10) - 1;
		this.setState({index: id})
	}

	goNext = () => {
		// go to next article
		let id = this.state.index;
		id = parseInt(id, 10) + 1;
		this.setState({index: id})
	}

	render() {
		// if photos havent loaded yet then display spinner
		if(this.props.photos.length === 0) {
			return (
				<div>
					<Header headerStyle="header1" />
					<MDSpinner className="loader" size={100} />
				</div>
			);
		} else {
			return (
				<div>
					<Header headerStyle="header3" />
					{!this.state.openDetail && <div className="article-gallery-title">Latest News In Gaming</div>}
					<div className="article-gallery">
						{!this.state.openDetail && <Gallery margin={5} photos={this.props.photos} columns={2} onClick={this.photoClick}/>}
						{this.state.openDetail && <Article article={this.props.articles[this.state.index]}/>}
						{this.state.openDetail && <PageNav index={this.state.index} goBack={this.goBack} goNext={this.goNext} goToArticles={this.goToArticles}/>}
						</div>
				</div>
			)
		}
	}
}

export default Articles;