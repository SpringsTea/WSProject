import React, { Component } from 'react';
import { Icon } from 'antd';

class Header extends Component {

	render(){
		return(
			<div className="container-header">
				<a className="header-button logo clickable"> <Icon type="database" /> WS</a>
				<a className="header-button clickable">Builder</a>
				<a className="header-button clickable">Decks</a>
				<a className="header-button clickable right"><Icon type="search" /></a>
			</div>
		)
	}
}

export default Header;