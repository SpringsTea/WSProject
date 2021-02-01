import React from 'react';
import { Layout, Menu } from 'antd';
import { withRouter } from "react-router";
import { Link, useRouteMatch } from "react-router-dom";

const { Sider } = Layout;

export default function RouterMenu ({route}){
  let { path, url } = useRouteMatch('/user/:username');

	return (
    <Sider
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[route]}
      >
        <Menu.Item key={`${url}`}>
          <Link to={`${url}`} className="link">Profile</Link>
        </Menu.Item>
        <Menu.Item key={`${url}/decks`}>
          <Link to={`${url}/decks`} className="link">Decks</Link>
        </Menu.Item>
      </Menu>
    </Sider>
	)
}