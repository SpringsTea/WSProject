import { Component } from 'react';
import { Select, Input, Row, Col } from 'antd';
import { throttle } from 'throttle-debounce';

import { searchDeck } from 'Utils/api';
import { receiveDecks } from 'Actions/DeckSearchActions';

const Option = Select.Option;

class DeckFilters extends Component {

	state = {
		filters:{

		}
	}

	updateDecks = async () =>{
		const { setLoading } = this.props;
		const { filters } = this.state;

		setLoading(true);
		const [decks] = await Promise.all([
			searchDeck(filters)
		]);	

		receiveDecks(decks);
		setLoading(false);		
	}

	handleSetFilter = (value) =>{
		const { updateDecks } = this;
		let { filters } = this.state;

		filters.set = value;
		this.setState({filters}, updateDecks);
	}

	handleTextFilter = throttle( 1000, (value) =>{
		const { updateDecks } = this;
		let { filters } = this.state;

		if( value.length <= 3 && value.length > 0 ){
			return false;
		}

		filters.text = value;
		this.setState({filters}, updateDecks);
	})

	render(){
		const { handleSetFilter, handleTextFilter } = this;
		const { serieses } = this.props;
		return(
			<div className="container-deckfilters">
				<Row gutter={10}>
					<Col xxl={4} xl={6} lg={8} md={12}>
						<div className="filter">
							<Select
								style={{width:'100%'}}
								placeholder="Select a series"
								filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
								onChange={handleSetFilter}
								allowClear
								showSearch
							>
								{
									serieses.map( (series) => 
										<Option 
											key={series._id} 
											value={`${series.set}/${series.side}${series.release}`}>
											{series.name}
										</Option> )
								}
							</Select>
						</div>
					</Col>
					<Col xxl={4} xl={6} lg={8} md={12}>
						<div className="filter">
							<Input placeholder="Search deckname" onChange={(e) => handleTextFilter(e.target.value)} />
						</div>
					</Col>
				</Row>
			</div>
		)
	}
}

export default DeckFilters;