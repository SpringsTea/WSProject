import { Component } from 'react';
import { Row, Col, Tabs } from 'antd';

import LoginForm from 'Partials/Forms/LoginForm';
import RegisterForm from 'Partials/Forms/RegisterForm';
import PasswordRecoveryForm from 'Partials/Forms/PasswordRecoveryForm';

const { TabPane } = Tabs;

class Login extends Component {

	state = {
		tab: 'login',
		logindata: {},//store user password from register
	}

	handleTabChange = (tab, data = {}) =>{
		this.setState({tab: tab, ...data});
	}

	render(){
		const { handleTabChange } = this;
		const { tab, logindata } = this.state;
		return(
		  <div className="container-login">
		  	<div className="header">
		  		<img className="logo" src="/images/assets/logo.png" />
		  		<h1>Encore Decks</h1>
		  	</div>
		  	<div className="container-login-form">
		  		<Tabs activeKey={tab} tabBarStyle={{display:'none'}}>
		  			<TabPane logindata key="login" tab="Login">
		    			<LoginForm handleFormChange={handleTabChange} logindata={logindata} />
		    		</TabPane>
		    		<TabPane key="register" tab="Register">
		    			<RegisterForm handleFormChange={handleTabChange} />
		    		</TabPane>
		    		<TabPane key="password" tab="Password">
		    			<PasswordRecoveryForm handleFormChange={handleTabChange} />
		    		</TabPane>
		    	</Tabs>
		    </div>
		  </div>
		)
	}
}

export default Login;