import React, { Component } from 'react';
import { Select } from 'antd';

import { fetchSeries } from '../../utils/api'; 
import { receiveSeries } from 'Actions/BuilderActions';

const Option = Select.Option; 

class SeriesSelect extends Component {

	onSelect = async(seriesid, remove = false) => {

		if( remove === false ){
			const [series] = await Promise.all([
				fetchSeries(seriesid)
			]);	

			receiveSeries(series, remove);
		}
		else{
			receiveSeries(seriesid, remove)
		}		
	}

	render(){
		const { onSelect } = this;
		const { serieses } = this.props;
		return(
			<div className="container-series-select">
				<Select
					mode="multiple"
					style={{width:'100%'}}
					placeholder="Select one or more series"
					filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
					onSelect={(val) => onSelect(val, false)}
					onDeselect={(val) => onSelect(val, true)}
				>
					{
						serieses.map( (series) => <Option key={series._id} value={series._id}>{series.name}</Option> )
					}
				</Select>
			</div>
		)
	}
}

export default SeriesSelect;