import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';

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
				<a className="header-button logo clickable" href="/"> <img src="/images/assets/ClappyNoText_240.png" /> EncoreDecks</a>
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
					<a className="header-button clickable right" href="/user"><Icon type="user" /></a>
				}
				<Tooltip title="Get development updates!" placement="bottom">
					<a target="_blank" className="header-button clickable right" href="https://discord.gg/cFsZJCq"> <img src="/images/assets/discord.png" /></a>
				</Tooltip>
			</div>
		)
	}
}

export default Header;