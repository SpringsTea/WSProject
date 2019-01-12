import React, { Component } from 'react';
import { Select } from 'antd';

import { fetchSeries } from '../../utils/api'; 
import { receiveSeries } from 'Actions/BuilderActions';

const Option = Select.Option; 

class SeriesSelect extends Component {

	onSelect = async(seriesid) => {
		const [series] = await Promise.all([
			fetchSeries(seriesid)
		]);	

		receiveSeries(series);
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
					onSelect={onSelect}
				>
					{
						serieses.map( (series) => <Option key={series.id} value={series.id}>{series.name}</Option> )
					}
				</Select>
			</div>
		)
	}
}

export default SeriesSelect;