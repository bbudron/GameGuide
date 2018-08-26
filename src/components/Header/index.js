import React, {Component} from 'react';
import "./style.css";
import {Link, withRouter} from 'react-router-dom';

const search = (
	<svg className="search-button-image" height="25" width="25" version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" xmlSpace="preserve">
		<g fill="black">
			<path d="M37.189,34.361c-0.851,1.03-1.799,1.977-2.828,2.828L44,46.829L46.828,44L37.189,34.361z" fill="black"/>
			<path d="M21,40C10.523,40,2,31.477,2,21S10.523,2,21,2s19,8.523,19,19S31.477,40,21,40z M21,4 C11.626,4,4,11.626,4,21s7.626,17,17,17s17-7.626,17-17S30.374,4,21,4z" fill="black"/>
		</g>
	</svg>);

class HeaderWO extends Component  {
	state = {
		query: null
	}

	handleChange = (event) => {
		event.preventDefault();
		const {name, value} = event.target;    
		this.setState({
			[name]: value
		});
	}

	handleEnter = (event) => {
		if((event.key === "Enter")) {
			let address = `/games/${this.state.query}`;
			this.props.history.push(address);
	}}
		
	render() {
		return(
			<div className={this.props.headerStyle}>
				<Link to = "/" ><div className="logo">game guide</div></Link>
				<div className="search-container">
					<div className="search-box">
						<input onKeyPress={this.handleEnter} autoComplete="off" onChange={this.handleChange} className="search-input" type="text" name="query" placeholder="Call of Duty, Mario, etc."/>
						<Link to = {`/games/${this.state.query}`} className="search-button">{search}</Link>
					</div>
				</div>
			</div>
		);
	}
}
const Header = withRouter(HeaderWO);
export default Header;