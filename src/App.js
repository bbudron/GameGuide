import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Games from "./pages/Games";
import NotFound from "./pages/NotFound";
import axios from 'axios';

class App extends Component {
  state = {
    articles: [],
    photos: []
	};

  componentWillMount() {
    // sends request to /news before component mounts
		axios.get("/api/news")
			.then(result => {
        // clean result and verify if needed content is there
				let articles = result.data.map(curArticle => {
					let article = {
						title: curArticle.title || "Untitled",
						author: curArticle.author || "No author given",
						description: curArticle.description || "No description available",
						source: curArticle.source.name,
						url: curArticle.url,
            image: curArticle.urlToImage
					}
					return article;
        })
        // organize photos from news articles into new array
        let photos = result.data.map(curPhoto => {
          let photo = {
            key: curPhoto.photo.key,
            src: curPhoto.photo.src,
            width: curPhoto.photo.width,
            height: curPhoto.photo.height
          }
          return photo
        })
        // set the state to contain the articles and photos array
        this.setState({ articles, photos });
    	});
  }
  
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path = "/" render = {() => <Home articles={this.state.articles}/>}/>
            <Route exact path = "/games/:id" render = {props => <Games id={props.match.params.id} articles={this.state.articles}/>}/>
            <Route exact path = "/articles" render = {props => <Articles articles={this.state.articles} photos={this.state.photos}/>}/>
            <Route exact path = "/articles/:id" render = {props => <Articles id={props.match.params.id} articles={this.state.articles} photos={this.state.photos}/>}/>
            <Route exact path = "*" render = {() => <NotFound error={{name: "page"}}/>}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;