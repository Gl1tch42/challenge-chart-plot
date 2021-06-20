import React from 'react';
import PropTypes from 'prop-types';

import './Alert.css';

function Alert(props){
	const open = props.error.hasOwnProperty('message');
	return(
		<>
			<div className = {`modal-overlay${open ? " open" : ""}`}></div>
			<div className = {`modal${open ? " open" : ""}`}>
				<div className = "modal-content">
					<div className = "title">An error has occurred!</div>
					<div className = "message">
						{props.error && (props.error.message)}
					</div>
					<div className = "stack-trace">
						{props.error && (props.error.stack)}
					</div>
					<br/>
					<div className = "btn">
						<button onClick = {props.dismiss}>Dismiss</button>
					</div>
				</div>
			</div>
			{props.children}
		</>
	);
};

Alert.propTypes = {
	error: PropTypes.object.isRequired,
	dismiss: PropTypes.func.isRequired
};

export default Alert;