import React from 'react';
import "./style.css";

// svg animations to be used
const arrow1 = (
	<svg className="left-arrow" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48" stroke="white" strokeWidth="5">
		<g fill="white">
			<path d="M14.83 16.42L24 25.59l9.17-9.17L36 19.25l-12 12-12-12z"/>
		</g>
	</svg>);
const arrow2 = (
	<svg className="right-arrow" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48" stroke="white" strokeWidth="5">
		<g fill="white">
			<path d="M14.83 16.42L24 25.59l9.17-9.17L36 19.25l-12 12-12-12z"/>
		</g>
	</svg>);
const articles = (
	<svg className="articles-button"  version="1.1" x="0px" y="0px" viewBox="0 0 32 32" width="32" height="32">
		<title>grid 45</title>
		<g fill="#4b9d49">
			<path fill="#4b9d49" d="M13,1H2C1.447,1,1,1.447,1,2v11c0,0.553,0.447,1,1,1h11c0.553,0,1-0.447,1-1V2C14,1.447,13.553,1,13,1z"/>
			<path data-color="color-2" d="M30,1H19c-0.553,0-1,0.447-1,1v11c0,0.553,0.447,1,1,1h11c0.553,0,1-0.447,1-1V2 C31,1.447,30.553,1,30,1z"/>
			<path data-color="color-2" d="M13,18H2c-0.553,0-1,0.447-1,1v11c0,0.553,0.447,1,1,1h11c0.553,0,1-0.447,1-1V19 C14,18.447,13.553,18,13,18z"/>
			<path fill="#4b9d49" d="M30,18H19c-0.553,0-1,0.447-1,1v11c0,0.553,0.447,1,1,1h11c0.553,0,1-0.447,1-1V19 C31,18.447,30.553,18,30,18z"/>
		</g>
	</svg>
	);

const PageNav = (props) => {
	return(
		<div className="page-nav">
		<br />
		<div className="arrow">
		{props.index > 0 ? <div id={props.index} className="arrow" onClick={props.goBack}>{arrow1}</div> : <div className="tab-space"></div>}
		<div id={props.index} onClick={props.goToArticles}>{articles}</div>
		{props.index < 9 ? <div id={props.index} className="arrow" onClick={props.goNext}>{arrow2}</div> : <div className="tab-space"></div>}
		</div>
		</div>
	);
}

export default PageNav;