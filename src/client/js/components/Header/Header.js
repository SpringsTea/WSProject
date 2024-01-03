import React, { Component } from 'react';
import { Tooltip, Layout, Menu, ConfigProvider } from 'antd';
import { LoginOutlined, LogoutOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';

const { Header } = Layout;

import { logout } from 'Utils/api';

class EncoreHeader extends Component {

	handleLogout = async() => {
		await logout();
		window.location.reload();
	}

	render(){
		const { handleLogout } = this;
		const { title, loggedin, roles, username } = this.props;

		return(
			<ConfigProvider
			  theme={{
			    components: {
			      Layout: {
			      	headerBg: '#5f5f5f',
			        headerPadding: '0 10px',
			        headerHeight: '44px'
			      },
			      Menu: {
			      	darkItemBg: '#5f5f5f'
			      }
			    },
			  }}
			>
				<Layout>
					<Header className="container-header" >
						{
							title &&
							<title>{title}</title>
						}

						{					
							<Menu mode="horizontal" theme="dark" 
								style={{display:'inline-block', width: '100%'}}
							>
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
									//roles.translator &&
									//<Menu.Item><a href="/translations">Translations</a></Menu.Item>
								}				
								{
									loggedin == 'true' ?
										<Menu.Item className="right" onClick={handleLogout}><LogoutOutlined /></Menu.Item>
									:
										<Menu.Item className="right"><a href="/login"><LoginOutlined /></a></Menu.Item>
								}
								{
									loggedin == 'true' &&
									<Menu.Item className="right"><a href="/user"><UserOutlined /></a></Menu.Item>
								}
								{
									loggedin == 'true' &&
									<Menu.Item className="right"><a href={`/user/${username}/decks`}><BookOutlined /></a></Menu.Item>
								}
								
								<Menu.Item className="right"> 
									<Tooltip title="Get development updates!" placement="bottom">
										<a target="_blank" href="https://discord.gg/cFsZJCq">
											<img style={{height:'25px'}} src="/images/assets/discord.png" />
										</a>
									</Tooltip>
								</Menu.Item>
							</Menu>
						}
						
					</Header>
				</Layout>
			</ConfigProvider>
		)
	}
}

export default EncoreHeader;