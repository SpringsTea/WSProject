import { Component } from 'react';
import { Select, Input, Checkbox, Row, Col } from 'antd';
import { attributeIcons } from 'Constants/attributes';

import { searchCards } from 'Utils/api';

const Option = Select.Option;

class DeckFilters extends Component {

	state = {
	}

	render(){
		const { serieses, neosets, filters, loggedin, handleFilter, handleTextFilter } = this.props;
		return(
			<div className="container-deckfilters">
				<Row gutter={10}>
					<Col xxl={4} xl={6} lg={8} md={12}>
						<div className="filter">
							<span>Language:</span>
							<Select
								style={{width:'100%'}}
								placeholder="Select a language"
								defaultValue={filters.lang}
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
							<span>Neo Standard:</span>
							<Select
								style={{width:'100%'}}
								placeholder="Select a set"
								defaultValue={filters.neoset}
								filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
								onChange={(val) => handleFilter(val, 'neoset')}
								allowClear
								showSearch
								dropdownMatchSelectWidth={false}
							>
								{
									neosets.sort((a,b) => (a.name > b.name) ? 1 : -1)
									.map( (set, i) => 
										<Option 
											key={i} 
											value={set._id}>
											{`${set.name}`}
										</Option> )
								}
							</Select>
						</div>
					</Col>
					<Col xxl={4} xl={6} lg={8} md={12}>
						<div className="filter">
							<span>Series:</span>
							<Select
								style={{width:'100%'}}
								placeholder="Select a series"
								defaultValue={filters.set}
								filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
								onChange={(val) => handleFilter(val, 'set')}
								allowClear
								showSearch
								dropdownMatchSelectWidth={false}
							>
								{
									serieses.sort((a,b) => (a.name > b.name) ? 1 : -1)
									.filter((s) => filters.lang ? s.lang === filters.lang : true)//filter by lang if selected
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
							<Input defaultValue={filters.text} placeholder="Search deckname" onChange={(e) => handleTextFilter(e.target.value)} />
						</div>
					</Col>
					<Col xxl={4} xl={6} lg={8} md={12}>
						<div className="filter">
							<span>Contains Cards</span>
							<Select
								mode="multiple"
								placeholder="Search one or more cards"
								style={{width: '100%'}}
								onSearch={(val) => searchCards(val)}
							>

							</Select>
						</div>
					</Col>
					<Col xxl={8} xl={6} lg={8} md={12}>
						<span>&nbsp;</span>
						<div className="filter">	
							<Checkbox.Group style={{marginTop: '5px'}} 
								options={Object.keys(attributeIcons)}
								defaultValue={ Array.isArray(filters.attributes) ? filters.attributes : [filters.attributes]}
								onChange={(val) => handleFilter(val, 'attributes')}>
							</Checkbox.Group>
							{
								(loggedin === 'true' || filters.username) &&
								<Checkbox
									defaultChecked={filters.favorites === "true"}
						            onChange={(e) => handleFilter(e.target.checked, 'favorites')}
						        >
						        	Favorites
						        </Checkbox>
							}
						</div>
					</Col>
				</Row>
			</div>
		)
	}
}

export default DeckFilters;