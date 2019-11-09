import { Component } from 'react';
import { Row, Col } from 'antd';

import TranslationsStore from '../../stores/TranslationsStore';

const buildState = () => ({
  serieses: TranslationsStore.getSerieses(),
});

class Translations extends Component {

  state = {
  	...buildState()
  }

  onChange = () => this.setState(buildState);

  componentDidMount() {
    TranslationsStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    TranslationsStore.removeChangeListener(this.onChange);
  }

	render(){
		return(
		  <div className="container-translations">
		  	;)
		  </div>
		)
	}
}

export default Translations;