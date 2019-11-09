import { Component } from 'react';
import { Row, Col, Select } from 'antd';
const { Option } = Select;

import TranslationsStore from '../../stores/TranslationsStore';
import { fetchSeries } from 'Utils/api';

import {
  receiveSeries
} from 'Actions/BuilderActions';

const buildState = () => ({
  serieses: TranslationsStore.getSerieses(),
  cards: TranslationsStore.getSeries(),
});

class Translations extends Component {

	state = {
		...buildState(),
	}

	onChange = () => this.setState(buildState);

	componentDidMount() {
		TranslationsStore.addChangeListener(this.onChange);
	}

	componentWillUnmount() {
		TranslationsStore.removeChangeListener(this.onChange);
	}

	handleSeriesSelect = async(id) =>{
    	const seriescards = await fetchSeries(id);
    	receiveSeries(seriescards);
  	}

	render(){
		const { handleSeriesSelect } = this;
		const { serieses, cards } = this.state;

		return(
		  <div className="container-translations">
		  	<Row gutter={14}>
		  		<Col span={24}>
		  			<Select
		  				showSearch
		  				style={{width:'100%'}}
		  				onChange={handleSeriesSelect}
		  				filterOption={(input, option) =>
					      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					    }
		  			>
		  			{
		  				serieses.map( (series, i) => 
		  					<Option value={series._id} key={i}>
		  						{`${series.name} (${series.set}/${series.side}${series.release})`}
		  					</Option> 
		  				)
		  			}
		  			</Select>
		  		</Col>
		  	</Row>
		  </div>
		)
	}
}

export default Translations;