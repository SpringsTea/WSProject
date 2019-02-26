import React, { Component } from 'react';
import { Icon } from 'antd';

class Header extends Component {

	render(){
		return(
			<div className="container-header">
				<a className="header-button logo clickable"> <img src="/images/assets/logo.png" /> WS</a>
				<a className="header-button clickable" href="/">Builder</a>
				<a className="header-button clickable" href="/decks">Decks</a>
				<a className="header-button clickable right"><Icon type="search" /></a>
			</div>
		)
	}
}

export default Header;