import { Component, Fragment } from 'react';
import { Row, Col, Layout, Menu } from 'antd';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import UserStore from 'Stores/UserStore';

import RouterMenu from './RouterMenu';
import UserProfile from './Routes/Profile/UserProfile';
import DeckSearch from '../DeckSearch/DeckSearch';
import Settings from './Routes/Settings';

const { Content } = Layout;

const buildState = () => ({
  user: UserStore.getUser(),
});

class User extends Component {

  state = {
  	...buildState(),
  }

  onChange = () => this.setState(buildState);

  componentDidMount() {
    UserStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.onChange);
  }

	render(){
		const {username, filters, loggedin, theme} = this.props;
		const { user } = this.state;
		
		return(
			<div className={`container-user ${theme}`}>
				<Row>
					<Layout>
			          <BrowserRouter>
			          	<Route
			          		path="/user/:username/:tab?"
			          		render={({ match: { url } }) => (
			            		<RouterMenu route={url} user={user} />
			            	)}
			            />
			            <Content className="user-content">
			              <Switch>
			              	<Route
			              		path="/user/:username"
			              		render={({ match }) => (
			              			<Fragment>
			              				<Route exact path={`${match.path}`}>
						                  <UserProfile user={user} />
						                </Route>					              	
			              				<Route path={`${match.path}/decks`} render={() => 
						                  <DeckSearch loggedin={loggedin} filters={{username: username, invalid: true, ...filters}} />
						              	}/>
						              	{
						              		user.currentuser === true &&
							              	<Route exact path={`${match.path}/settings`}>
							                  <Settings user={user} />
							                </Route>
						            	}
			              			</Fragment>
			              		)}
			         		/>
			              </Switch>
			            </Content>
			          </BrowserRouter>
			        </Layout>	
	    			{
						
					}
				</Row>
			</div>
		)
	}
}

export default User;