import React, { Component } from 'react';
import { Switch, Icon, Tabs, Input } from 'antd';
import { throttle } from 'throttle-debounce';

import { filterBuilder } from 'Actions/BuilderActions';

const { TabPane } = Tabs;

class Filters extends Component {

  state = {
    toggle: false
  }

  handleToggle = () =>{
    const { toggle } = this.state;
    this.setState({toggle: !toggle})
  }

  handleTextSearch = throttle( 500, (text) =>{
    filterBuilder({ type: 'text', value: text });
  })

  render(){

    const { handleToggle, handleTextSearch } = this;
    const { toggle } = this.state;

    return(
      <div className="container-filters">
        <span className="clickable icon-button" onClick={handleToggle} >
          <Icon type={ toggle ? "minus-circle" : "plus-circle"} />
          Filters
        </span> 

        {
          toggle === true &&
          <Tabs defaultActiveKey="1" size='small'>
            <TabPane tab="Type" key="1">
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
            <TabPane tab="Text" key="2">
              <Input placeholder="Search card names" onChange={ (e) => handleTextSearch(e.target.value ) } />
            </TabPane>
          </Tabs>
        }
      </div>
    )
  }
}

export default Filters;