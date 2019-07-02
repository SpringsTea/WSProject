import React, { Component } from 'react';
import { Button, Menu, Dropdown, Icon } from 'antd';
import DeckExportText from './DeckExportText';
import DeckExportCSV from './DeckExportCSV';

class DeckExportMenu extends Component {
	render(){
		const { cards, deck } = this.props;
        
        const menu = (
            <Menu>
              <Menu.Item key="1"><DeckExportText cards={cards} deck={deck} /></Menu.Item>
              <Menu.Item key="2"><DeckExportCSV cards={cards} deck={deck} /></Menu.Item>
            </Menu>
          );

		return(
            <Dropdown overlay={menu}>
            <Button type="primary">
                <Icon type="export" /> Export Deck As <Icon type="down" />
            </Button>
            </Dropdown>
		);
	}
}

export default DeckExportMenu;