import { Component } from 'react';
import { Row, Col, Select, List } from 'antd';
const { Option } = Select;

import TranslationCard from './TranslationCard';
import CardItemIcon from 'Partials/Builder/CardItem/CardItemIcon';

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
		selectedcard: null
	}

	onChange = () => this.setState(buildState);

	componentDidMount() {
		TranslationsStore.addChangeListener(this.onChange);
		this.handleSeriesSelect('5ccddc33f364535e091ac562')
	}

	componentWillUnmount() {
		TranslationsStore.removeChangeListener(this.onChange);
	}

	handleSeriesSelect = async(id) =>{
    	const seriescards = await fetchSeries(id);
    	receiveSeries(seriescards);
    	this.setState({selectedcard: this.state.cards[0]})
  	}

	render(){
		const { handleSeriesSelect } = this;
		const { serieses, cards, selectedcard } = this.state;

		return(
		  <div className="container-translations">
		  	<Row gutter={14}>
		  		<Col span={24}>
		  			<Select
		  				showSearch
		  				placeholder="Pick a series"
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
		  	<Row gutter={16}>
			  	<Col span={18}>
				  	{
				  		selectedcard &&
				  		<TranslationCard card={selectedcard} />
				  	}	
				</Col>
				<Col span={6}>
					<div className="card-list">
						<List 
							dataSource={cards}
							renderItem={card => (
						        <List.Item 
									className={`card-item ${card.selected === true ? 'selected' : ''}`}>
										<List.Item.Meta 
											className="clickable"
											//onClick={ () => selectCard({card}, true) }
											avatar={<CardItemIcon card={card} />}
											//title={`${locale.name} ${card.quantity ? `(${card.quantity})` : ''}`}
										/>
									</List.Item>
						      )}
						>
						</List>
					</div>
				</Col>
		  	</Row>	  	
		  </div>
		)
	}
}

export default Translations;