import React from 'react';
import "./style.css";
import Header from '../../components/Header';
import NotFound from '../../components/NotFound';


const NotFoundPage = (props) => {
	return(
		<div>
			<Header headerStyle="header2" />
			<NotFound error={props.error} />
		</div>
	);
}

export default NotFoundPage;