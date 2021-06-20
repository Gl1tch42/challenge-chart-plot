import React from 'react'
import PropTypes from 'prop-types';

import './Footer.css'

function Footer({ onClickButton }) {

	return (
		<div className="footer-area">
			<footer>
				<button onClick={onClickButton}>Generate Chart</button>
			</footer>
		</div>
		)

}

Footer.propTypes = {
	onClickButton: PropTypes.func.isRequired
};

export default Footer;
