import { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

class DeckFilters extends Component {

	handleSetFilter = (value) =>{
		console.log(value);
	}

	render(){
		const { handleSetFilter } = this;
		const { serieses } = this.props;
		return(
			<div className="container-deckfilters">
				<div className="filter">
					<Select
						style={{width:'100%'}}
						placeholder="Select a series"
						filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						onSelect={handleSetFilter}
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
			</div>
		)
	}
}

export default DeckFilters;