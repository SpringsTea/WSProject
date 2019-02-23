import { Component } from 'react';
import { Select, Row, Col } from 'antd';

import { searchDeck } from 'Utils/api';
import { receiveDecks } from 'Actions/DeckSearchActions';

const Option = Select.Option;

class DeckFilters extends Component {

	state = {
		filters:{

		}
	}

	updateDecks = async () =>{
		const { filters } = this.state;

		const [decks] = await Promise.all([
			searchDeck(filters)
		]);	

		receiveDecks(decks);		
	}

	handleSetFilter = (value) =>{
		const { updateDecks } = this;
		let { filters } = this.state;

		console.log('Fire!');

		filters.set = value;
		this.setState({filters}, updateDecks);
	}

	render(){
		const { handleSetFilter } = this;
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
				</Row>
			</div>
		)
	}
}

export default DeckFilters;