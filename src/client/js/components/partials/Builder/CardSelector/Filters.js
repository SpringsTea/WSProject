import React, { Component } from 'react';
import { Switch, Icon, Tabs, Input } from 'antd';
import { throttle } from 'throttle-debounce';

import { filterBuilder } from 'Actions/BuilderActions';
import { colours } from 'Constants/sortorder';
import { Capitalize } from 'Utils/stringfunctions';

const { TabPane } = Tabs;

class Filters extends Component {

  handleTextSearch = (text) =>{
    filterBuilder({ type: 'text', value: text });
  }

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
                Characters <Switch defaultChecked size="small" onChange={ (val) => filterBuilder({ type:'cardtype', filter: 'CH', value: val }) } />
              </span>
              <span>
                Events <Switch defaultChecked size="small" onChange={ (val) => filterBuilder({ type:'cardtype', filter: 'EV', value: val }) } />
              </span>
              <span>
                Cx <Switch defaultChecked size="small" onChange={ (val) => filterBuilder({ type:'cardtype', filter: 'CX', value: val }) } />
              </span>
            </div>
            </TabPane>
             <TabPane tab="Colour" key="3">
              <div className="toggles">
                {
                  colours.map( (colour) => 
                    <span key={colour}>
                      {Capitalize(colour)} <Switch className={colour} defaultChecked size="small" 
                      onChange={ (val) => filterBuilder({ type:'colour', filter: colour, value: val }) } />
                    </span> 
                  )
                }
              </div>
             </TabPane>
          </Tabs>
      </div>
    )
  }
}

export default Filters;