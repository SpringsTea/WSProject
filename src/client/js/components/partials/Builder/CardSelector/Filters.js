import React, { Component } from 'react';
import { Switch, Icon, Tabs, Input } from 'antd';
import { throttle } from 'throttle-debounce';

import { filterBuilder } from 'Actions/BuilderActions';

const { TabPane } = Tabs;

class Filters extends Component {

  handleTextSearch = throttle( 500, (text) =>{
    filterBuilder({ type: 'text', value: text });
  })

  render(){

    const { handleTextSearch } = this;

    return(
      <div className="container-filters">
          <Tabs defaultActiveKey="1" size='small'>
            <TabPane tab="Text" key="1">
              <Input allowClear placeholder="Search card names" onChange={ (e) => handleTextSearch(e.target.value ) } />
            </TabPane>
            <TabPane tab="Type" key="2">
            <div className="toggles">
              <span>
                Charicters <Switch defaultChecked size="small" onChange={ (val) => filterBuilder({ type:'cardtype', filter: 'CH', value: val }) } />
              </span>
              <span>
                Events <Switch defaultChecked size="small" onChange={ (val) => filterBuilder({ type:'cardtype', filter: 'EV', value: val }) } />
              </span>
              <span>
                Cx <Switch defaultChecked size="small" onChange={ (val) => filterBuilder({ type:'cardtype', filter: 'CX', value: val }) } />
              </span>
            </div>
            </TabPane>
          </Tabs>
      </div>
    )
  }
}

export default Filters;