import { Component, Fragment } from 'react';
import { Row, Col, Layout, Menu } from 'antd';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import RouterMenu from './RouterMenu';
import DeckSearch from '../DeckSearch/DeckSearch';

const { Content } = Layout;


export default function User ({username, filters, loggedin}){

	
	return(
		<div className="container-user">
			<Row>
				<h2>{username}s Decks</h2>
			</Row>
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
					                  <div>Howdy</div>
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