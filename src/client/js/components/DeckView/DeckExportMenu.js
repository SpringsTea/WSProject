import React, { Component } from 'react';
import { Button, Menu, Dropdown, Tooltip } from 'antd';
import { 
  ExportOutlined,
  DownOutlined,
} from '@ant-design/icons';

import DeckExportText from './DeckExportText';
import DeckExportCSV from './DeckExportCSV';
import DeckExportPDFNA from './DeckExportPdfBSNA';
import DeckExportPDFWGPNA from './DeckExportPdfWGPNA';

class DeckExportMenu extends Component {
	render(){
		const { cards, deck } = this.props;
        
        const menu = (
            <Menu>
              <Menu.Item key="1"><DeckExportText cards={cards} deck={deck} /></Menu.Item>
              <Menu.Item key="2"><DeckExportCSV cards={cards} deck={deck} /></Menu.Item>
              <Menu.Item key="3"><DeckExportPDFNA deck={deck} /></Menu.Item>
              <Menu.Item key="4"><DeckExportPDFWGPNA deck={deck} /></Menu.Item>
            </Menu>
          );

		return(
            <Dropdown overlay={menu}>
              <Tooltip title="Export deck to various file types" >
                <Button type="primary" style={{top: '-1px'}}>
                    <ExportOutlined /> Export <DownOutlined />
                </Button>
              </Tooltip>
            </Dropdown>
		);
	}
}

export default DeckExportMenu;