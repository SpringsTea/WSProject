import { Component, Fragment } from 'react';
import { Row, Col, Layout, Menu } from 'antd';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import UserStore from 'Stores/UserStore';

import RouterMenu from './RouterMenu';
import UserProfile from './Routes/UserProfile';
import DeckSearch from '../DeckSearch/DeckSearch';

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
		const {username, filters, loggedin} = this.props;
		
		return(
			<div className="container-user">
				<Row>
					<Layout>
			          <BrowserRouter>
			          	<Route
			          		path="/user/:username/:tab?"
			          		render={({ match: { url } }) => (
			            		<RouterMenu route={url} />
			            	)}
			            />
			            <Content className="user-content">
			              <Switch>
			              	<Route
			              		path="/user/:username"
			              		render={({ match }) => (
			              			<Fragment>
			              				<Route exact path={`${match.path}`}>
						                  <UserProfile username={username} />
						                </Route>					              	
			              				<Route path={`${match.path}/decks`} render={() => 
						                  <DeckSearch loggedin={loggedin} filters={{username: username, invalid: true, ...filters}} />
						              	}/>
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