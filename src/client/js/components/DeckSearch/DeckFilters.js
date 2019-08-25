import { Component } from 'react';
import { Select, Input, Checkbox, Row, Col } from 'antd';
import { attributeIcons } from 'Constants/attributes';

const Option = Select.Option;

class DeckFilters extends Component {

	state = {
	}

	render(){
		const { serieses, filters, handleFilter, handleTextFilter } = this.props;
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
							<span>Series:</span>
							<Select
								style={{width:'100%'}}
								placeholder="Select a series"
								defaultValue={filters.set}
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
							<Input defaultValue={filters.text} placeholder="Search deckname" onChange={(e) => handleTextFilter(e.target.value)} />
						</div>
					</Col>
					<Col xxl={4} xl={6} lg={8} md={12}>
						<div className="filter">	
							<span>&nbsp;</span>
							<Checkbox.Group style={{display: 'block', marginTop: '5px'}} 
								options={Object.keys(attributeIcons)}
								defaultValue={ Array.isArray(filters.attributes) ? filters.attributes : [filters.attributes]}
								onChange={(val) => handleFilter(val, 'attributes')}>

							</Checkbox.Group>
						</div>
					</Col>
					<Col xxl={4} xl={6} lg={8} md={12}>
						<div className="filter">	
							<span>&nbsp;</span>
							<Checkbox.Group style={{display: 'block', marginTop: '5px'}} options={Object.keys(attributeIcons)}
								onChange={(val) => handleFilter(val, 'attributes')}>

							</Checkbox.Group>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
}

export default DeckFilters;