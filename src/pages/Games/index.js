import React, {Component} from 'react';
import './style.css';
import Header from "../../components/Header";
import ArticlesPreview from '../../components/ArticlesPreview';
import GameSelection from '../../components/GameSelection';

//import otherComponent from '../otherComponent';

class Games extends Component {
	state = {
		game: null
	}

	
	componentWillMount() {
		// sets the id of the selected game
		const game = this.props.id;
		this.setState({game})
	}
	

	componentWillReceiveProps(props) {
		// sets the id of the selected game
		const game = props.id;
		if(game !== this.state.game || game != null) this.setState({game});
	}

	render(){
		return (
			<div>
				<Header headerStyle="header3"/>
				<GameSelection game={this.state.game}/>
				<ArticlesPreview articles={this.props.articles} />
			</div>
		);
	}
}

export default Games;
