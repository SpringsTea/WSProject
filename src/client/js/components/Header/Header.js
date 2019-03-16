import React, { Component } from 'react';
import { Icon } from 'antd';

import { logout } from 'Utils/api';

class Header extends Component {

	handleLogout = async() => {
		await logout();
		window.location.reload();
	}

	render(){
		const { handleLogout } = this;
		const { title, loggedin } = this.props;
		
		return(
			<div className="container-header">
				{
					title &&
					<title>{title}</title>
				}
				<a className="header-button logo clickable" href="/"> <img src="/images/assets/logo.png" /> EncoreDecks</a>
				<a className="header-button clickable" href="/builder">Builder</a>
				<a className="header-button clickable" href="/">Decks</a>
				
				{
					loggedin == 'true' ?
						<a className="header-button clickable right" onClick={handleLogout}><Icon type="logout" /></a>
					:
						<a className="header-button clickable right" href="/login"><Icon type="login" /></a>
				}
				{
					loggedin == 'true' &&
					<a className="header-button clickable right"><Icon type="user" /></a>
				}
				
			</div>
		)
	}
}

export default Header;