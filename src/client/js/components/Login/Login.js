import { Component } from 'react';
import { Row, Col, Tabs } from 'antd';

import LoginForm from 'Partials/Forms/LoginForm';
import RegisterForm from 'Partials/Forms/RegisterForm';

const { TabPane } = Tabs;

class Login extends Component {

	state = {
		tab: 'register'
	}

	handleTabChange = (tab) =>{
		this.setState({tab: tab});
	}

	render(){
		const { handleTabChange } = this;
		const { tab } = this.state;
		return(
		  <div className="container-login">
		  	<div className="header">
		  		<img className="logo" src="/images/assets/logo.png" />
		  		<h1>Encore Decks</h1>
		  	</div>
		  	<div className="container-login-form">
		  		<Tabs activeKey={tab} tabBarStyle={{display:'none'}}>
		  			<TabPane key="login" tab="Login">
		    			<LoginForm handleFormChange={handleTabChange} />
		    		</TabPane>
		    		<TabPane key="register" tab="Register">
		    			<RegisterForm handleFormChange={handleTabChange} />
		    		</TabPane>
		    	</Tabs>
		    </div>
		  </div>
		)
	}
}

export default Login;