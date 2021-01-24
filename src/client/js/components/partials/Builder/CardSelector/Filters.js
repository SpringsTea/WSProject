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
    const { attributes } = this.props;

    return(
      <div className="container-filters">
          <Tabs defaultActiveKey="1" size='small'>
            <TabPane tab="Text" key="1">
              <Input placeholder="Search card names" onChange={ (e) => handleTextSearch(e.target.value ) } />
            </TabPane>
            <TabPane tab="Type" key="2">
            <div className="toggles">
              <span>
                Characters <Switch size="small" onChange={ (val) => filterBuilder({ type:'cardtype', filter: 'CH', value: val }) } />
              </span>
              <span>
                Events <Switch size="small" onChange={ (val) => filterBuilder({ type:'cardtype', filter: 'EV', value: val }) } />
              </span>
              <span>
                Cx <Switch size="small" onChange={ (val) => filterBuilder({ type:'cardtype', filter: 'CX', value: val }) } />
              </span>
            </div>
            </TabPane>
            <TabPane tab="Level" key="3">
              <div className="toggles">
                <span>
                  Level 0 <Switch size="small" onChange={ (val) => filterBuilder({ type:'level', filter: 0, value: val }) } />
                </span>
                <span>
                  Level 1 <Switch size="small" onChange={ (val) => filterBuilder({ type:'level', filter: 1, value: val }) } />
                </span>
                <span>
                  Level 2 <Switch size="small" onChange={ (val) => filterBuilder({ type:'level', filter: 2, value: val }) } />
                </span>
                <span>
                  Level 3 <Switch size="small" onChange={ (val) => filterBuilder({ type:'level', filter: 3, value: val }) } />
                </span>
              </div> 
            </TabPane>
            <TabPane tab="Colour" key="4">
              <div className="toggles">
                {
                  colours.map( (colour) => 
                    <span key={colour}>
                      {Capitalize(colour)} <Switch className={colour} size="small" 
                      onChange={ (val) => filterBuilder({ type:'colour', filter: colour, value: val }) } />
                    </span> 
                  )
                }
              </div>
            </TabPane>
            <TabPane tab="Traits" key="5">
              <div className="toggles">
                {
                  attributes.map( (attr) => 
                    <span key={attr}>
                      {Capitalize(attr)} <Switch size="small" 
                      onChange={ (val) => filterBuilder({ type:'attributes', filter: attr, value: val }) } />
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