import { Component } from 'react';
import { Select, Input, Row, Col } from 'antd';
import { throttle } from 'throttle-debounce';

import { searchDeck } from 'Utils/api';
import { receiveDecks } from 'Actions/DeckSearchActions';

const Option = Select.Option;

class DeckFilters extends Component {

	state = {
		filters:{
			...this.props.filters
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

	handleFilter = (value, prop) =>{
		const { updateDecks } = this;
		let { filters } = this.state;

		filters[prop] = value;
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
		const { handleFilter, handleTextFilter } = this;
		const { serieses } = this.props;
		const { filters } = this.state;
		return(
			<div className="container-deckfilters">
				<Row gutter={10}>
					<Col xxl={4} xl={6} lg={8} md={12}>
						<div className="filter">
							<span>Language:</span>
							<Select
								style={{width:'100%'}}
								placeholder="Select a language"
								defaultValue={null}
								onChange={(val) => handleFilter(val, 'lang')}
							>
								<Option value={null}>
									All
								</Option>
								<Option value={'JP'}>
									Japanese
								</Option>
								<Option value={'EN'}>
									English
								</Option>
							</Select>
						</div>
					</Col>
					<Col xxl={4} xl={6} lg={8} md={12}>
						<div className="filter">
							<span>Series:</span>
							<Select
								style={{width:'100%'}}
								placeholder="Select a series"
								filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
								onChange={(val) => handleFilter(val, 'set')}
								allowClear
								showSearch
							>
								{
									serieses.filter((s) => filters.lang ? s.lang === filters.lang : true)//filter by lang if selected
									.map( (series, i) => 
										<Option 
											key={i} 
											value={series._id}>
											{`${series.name} (${series.lang})`}
										</Option> )
								}
							</Select>
						</div>
					</Col>
					<Col xxl={4} xl={6} lg={8} md={12}>
						<div className="filter">	
							<span>Search:</span>
							<Input placeholder="Search deckname" onChange={(e) => handleTextFilter(e.target.value)} />
						</div>
					</Col>
				</Row>
			</div>
		)
	}
}

export default DeckFilters;