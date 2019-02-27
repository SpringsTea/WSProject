import React, { Component } from 'react';
import { Icon } from 'antd';

class Header extends Component {

	render(){
		return(
			<div className="container-header">
				<a className="header-button logo clickable" href="/"> <img src="/images/assets/logo.png" /> EncoreDecks</a>
				<a className="header-button clickable" href="/builder">Builder</a>
				<a className="header-button clickable" href="/">Decks</a>
				{
					//<a className="header-button clickable right"></a>
				}
			</div>
		)
	}
}

export default Header;