import React, { Component } from 'react';
import { Input, Row, Col, Button } from 'antd'

import DeckSearhStore from '../../stores/DeckSearchStore';

const buildState = () => ({

});

class DeckSearch extends Component {

  state = {
  	...buildState(),
  }

  onChange = () => this.setState(buildState);

  componentDidMount() {
    DeckSearhStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    DeckSearhStore.removeChangeListener(this.onChange);
  }

	render(){
		return(
			<div className="container-decksearch">
				FUCK
			</div>
		)
	}
}

export default DeckSearch;