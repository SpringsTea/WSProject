import React, { Component } from 'react';
import { Select, Switch, Spin } from 'antd';

import { fetchSeries, fetchSerieses } from '../../utils/api'; 
import { receiveSeries, receiveSerieses, clearCards } from 'Actions/BuilderActions';

const Option = Select.Option; 

class SeriesSelect extends Component {

	state = {
		loading: false,
		selectvals: [],
	}

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

	onLangChange = async(lang) =>{
		this.setState({loading:true, selectvals:[]});
		const [serieses] = await Promise.all([
			fetchSerieses(lang)
		]);	

		clearCards();
		receiveSerieses(serieses);
		this.setState({loading:false});
	}

	render(){
		const { onSelect, onLangChange } = this;
		const { serieses } = this.props;
		const { loading, selectvals } = this.state;
		return(
			<div className="container-series-select">
				<Spin spinning={loading} style={{flex:1, marginRight: '5px'}}>
					<Select
						value={selectvals}
						mode="multiple"
						style={{width:'100%'}}
						placeholder="Select one or more series"
						filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						onSelect={(val) => onSelect(val, false)}
						onDeselect={(val) => onSelect(val, true)}
						onChange={(val) => this.setState({selectvals: val})}
						autoClearSearchValue={false}
					>
						{
							serieses.map( (series) => 
								<Option key={series._id} value={series._id}>
									{`${series.name} (${series.side}${series.release})`}
									{
										series.game === 'ROSE' &&
										<img src="/images/assets/RoseR.png" style={{maxHeight: '1em'}} />
									}									
								</Option> 
							)
						}
					</Select>
				</Spin>
				<Switch className="squared" onChange={ (val) => onLangChange(val === true ? 'EN' : 'JP')}
					checkedChildren="EN" unCheckedChildren="JP" defaultChecked/>
			</div>
		)
	}
}

export default SeriesSelect;