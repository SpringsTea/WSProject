import { Component } from 'react';
import { Row, Col, Tabs } from 'antd';

import LoginForm from 'Partials/Forms/LoginForm';
import RegisterForm from 'Partials/Forms/RegisterForm';
import PasswordRecoveryForm from 'Partials/Forms/PasswordRecoveryForm';
import PasswordChangeForm from 'Partials/Forms/PasswordChangeForm';

const { TabPane } = Tabs;

class Login extends Component {

	state = {
		tab: this.props.tab || 'login',
		token: this.props.token,//token needed for password change
		logindata: {},//store user password from register
	}

	handleTabChange = (tab, data = {}) =>{
		this.setState({tab: tab, ...data});
	}

	render(){
		const { handleTabChange } = this;
		const { tab, token, logindata } = this.state;
		return(
		  <div className="container-login">
		  	<div className="header">
		  		<img className="logo" src="/images/assets/Clappy_240.png" />
		  		<h1></h1>
		  	</div>
		  	<div className="container-login-form">
		  		<Tabs activeKey={tab} tabBarStyle={{display:'none'}}>
		  			<TabPane logindata key="login" tab="Login">
		    			<LoginForm handleFormChange={handleTabChange} logindata={logindata} />
		    		</TabPane>
		    		<TabPane key="register" tab="Register">
		    			<RegisterForm handleFormChange={handleTabChange} />
		    		</TabPane>
		    		<TabPane key="forgot" tab="Password Forgot">
		    			<PasswordRecoveryForm handleFormChange={handleTabChange} />
		    		</TabPane>
		    		<TabPane key="reset" tab="Password Reset" >
		    			<PasswordChangeForm handleFormChange={handleTabChange} token={token} />
		    		</TabPane>
		    	</Tabs>
		    </div>
		  </div>
		)
	}
}

export default Login;