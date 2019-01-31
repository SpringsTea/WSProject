import React, { Component } from 'react';
import { Switch, Icon } from 'antd';

import { filterBuilder } from 'Actions/BuilderActions';

class Filters extends Component {

  state = {
    toggle: false
  }

  handleToggle = () =>{
    const { toggle } = this.state;
    this.setState({toggle: !toggle})
  }

  render(){

    const { handleToggle } = this;
    const { toggle } = this.state;

    return(
      <div className="container-filters">
        <span className="clickable icon-button" onClick={handleToggle} >
          <Icon type={ toggle ? "minus-circle" : "plus-circle"} />
          Filters
        </span> 

        {
          toggle === true &&
          <div className="toggles">
            <span>
              Charicters <Switch defaultChecked size="small" onChange={ (val) => filterBuilder({ filter: 'CH', value: val }) } />
            </span>
            <span>
              Events <Switch defaultChecked size="small" onChange={ (val) => filterBuilder({ filter: 'EV', value: val }) } />
            </span>
            <span>
              Cx <Switch defaultChecked size="small" onChange={ (val) => filterBuilder({ filter: 'CX', value: val }) } />
            </span>
          </div>
        }
      </div>
    )
  }
}

export default Filters;