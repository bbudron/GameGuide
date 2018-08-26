import React, {Component} from 'react';
import './style.css';
import Game from '../Game'; 
import GamePreview from '../GamePreview';
import PageNav from '../PageNav';
import NotFound from '../NotFound';
import MDSpinner from "react-md-spinner";
import axios from 'axios';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

class GameSelection extends Component {
	state = {
		games: [],
		selected: "undefined",
		error: false
	}

	componentWillMount() {
		const game = this.props.game;

		// ensure searched game is not empty
		if((game !== "null"))  {
			// set loading screen
			this.setState({selected: "loading"});
			// send request to /games
			axios.post("/api/games", { game: game }, {cancelToken: source.token})
			.then(res => {
				// check if proper response is given, else send error
				if(res.data[0].id !== (-1)) {
					// set state to game data
					this.setState({error: false,  games: res.data, selected: "undefined"});

					// update local storage
					const search1 = localStorage.getItem("search1");
					const search2 = localStorage.getItem("search2");
					localStorage.setItem("search1", game);
					localStorage.setItem("search2", search1);
					localStorage.setItem("search3", search2);
				} else { this.setState({games: res.data, error: true, selected: "undefined"})}
			})
			.catch(e => {if(e.message === "Cancel") return null; else console.log(e)});
		}
	}

	componentWillReceiveProps(nextProps) {
		const game = nextProps.game;

		// ensure searched game is not empty
		if((game !== this.props.game) || !(game !== "null")) {
			// set loading screen
			this.setState({selected: "loading"});
			// send request to /games
			axios.post("/api/games", { game: game }, {cancelToken: source.token})
			.then(res => {
				// check if proper response is given, else send error
				if(res.data[0].id !== (-1)) {
					// set state to game data
					this.setState({ error: false, games: res.data, selected: "undefined"});

					// update local storage
					const search1 = localStorage.getItem("search1");
					const search2 = localStorage.getItem("search2");
					localStorage.setItem("search1", game);
					localStorage.setItem("search2", search1);
					localStorage.setItem("search3", search2);
				} else  { this.setState({games: res.data, error: true, selected: "undefined"})}
				
			})
			.catch(e => {if(e.message === "Cancel") return null; else console.log(e)});
		}
	}

	gameSelect = (num) => {
		// go to selected game on photo click
		this.setState({selected: num});
	}

	componentWillUnmount() {
		// cancel async requests if component is mounted prematurely
		source.cancel("Cancel");
	}

	goToGames = () => {
		// go to games page
		this.setState({selected: "undefined"});
	}

	goBack = () => {
		// go to previous game
		let id = this.state.selected;
		id = parseInt(id, 10) - 1;
		window.scrollTo(0, 0)
		this.setState({selected: id});
	}

	goNext = () => {
		// go to next game
		let id = this.state.selected;
		id = parseInt(id, 10) + 1;
		window.scrollTo(0, 0)
		this.setState({selected: id});
	}

	render(){
		// check if error message is given
		if(this.state.error === false) {
			// display game preview images on start
			if(this.state.selected === "undefined") {
				return (
					<div>
						<h3 className="games-header">Results for {this.props.game}:</h3>
						<div className="gameSelectionContainer">
							<GamePreview games={this.state.games} gameSelect={this.gameSelect} />
							{
								// this.state.games.map((game, i) => <GamePreview key={i} id={i} game={game} gameSelect={this.gameSelect}/>)
							}
						</div>
					</div>)
			// display loading screen when game is being searched
			} else if (this.state.selected === "loading") {
				return (
					<div>
						<h3 className="games-header">Loading results for {this.props.game}:</h3>
						<div className="gameSelectionContainer">
							<MDSpinner className="loader" size={100} />
						</div>
					</div>)
			// display game detail when game is selected
			} else {
				return (
					<div className="gameSelectionContainer">
							
						<Game game={this.state.games[this.state.selected]} gameSelect={this.gameSelect}/>
						<PageNav index={this.state.selected} goBack={this.goBack} goNext={this.goNext} goToArticles={this.goToGames}/>
					</div>)
			}
		} else {
			return <div className="gameSelectionContainer"><NotFound error={this.state.games[0]}/></div>
		}

	}
}

export default GameSelection;