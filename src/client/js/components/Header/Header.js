import React, { Component } from 'react';
import { Icon, Tooltip, Layout, Menu } from 'antd';
import { isMobile } from 'react-device-detect';

const { Header: LayoutHeader } = Layout;

import { logout } from 'Utils/api';

class Header extends Component {

	handleLogout = async() => {
		await logout();
		window.location.reload();
	}

	render(){
		const { handleLogout } = this;
		const { title, loggedin, roles, username } = this.props;

		return(
			<Layout>
			<LayoutHeader className="container-header" >
				{
					title &&
					<title>{title}</title>
				}
				<Menu mode="horizontal" theme="dark" style={{lineHeight: '44px'}}>
					<Menu.Item > 
						<a href="/">
							<img src="/images/assets/ClappyNoText_240.png" style={{paddingRight: '3px'}} />
							{
								!isMobile && `EncoreDecks`
							} 							
						</a>
					</Menu.Item>
					<Menu.Item><a href="/builder">Builder</a></Menu.Item>
					<Menu.Item><a href="/">Decks</a></Menu.Item>
					{
						roles.translator &&
						<Menu.Item><a href="/translations">Translations</a></Menu.Item>
					}				
					{
						loggedin == 'true' ?
							<Menu.Item className="right" onClick={handleLogout}><Icon type="logout" style={{fontSize: '22px'}} /></Menu.Item>
						:
							<Menu.Item className="right"><a href="/login"><Icon type="login" style={{fontSize: '22px'}} /></a></Menu.Item>
					}
					{
						loggedin == 'true' &&
						<Menu.Item className="right"><a href="/user"><Icon type="user" style={{fontSize: '22px'}} /></a></Menu.Item>
					}
					{
						loggedin == 'true' &&
						<Menu.Item className="right"><a href={`/user/${username}/decks`}><Icon type="book" style={{fontSize: '22px'}} /></a></Menu.Item>
					}
					
					<Menu.Item className="right"> 
						<Tooltip title="Get development updates!" placement="bottom">
							<a target="_blank" href="https://discord.gg/cFsZJCq">
								<img style={{height:'25px'}} src="/images/assets/discord.png" />
							</a>
						</Tooltip>
					</Menu.Item>
				</Menu>
			</LayoutHeader>
			</Layout>
		)
	}
}

export default Header;