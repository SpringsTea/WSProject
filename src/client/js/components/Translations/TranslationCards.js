import React, { Component } from 'react';
import { Row, Col, Pagination } from 'antd';

import TranslationCard from './TranslationCard';

class TranslationCards extends Component {

	state={
		page: 1,
		pagesize: 8
	}

	handlePagination = (page) =>{
		this.setState({page:page})
	}

	render(){
		const { handlePagination } = this;
		const { cards } = this.props;
		const { page, pagesize } = this.state;
		return(
			<div className="container-translationcards">
				<Row gutter={16}>
					{ cards.slice( (pagesize * page) - pagesize , pagesize * page ).map( (card, i) => 
						<Col span={12} key={i}>
							<TranslationCard card={card} />
						</Col>
					) }
				</Row>
				{
					cards.length > 0 &&
					<Pagination defaultCurrent={1} total={cards.length} onChange={handlePagination} />
				}				
			</div>
		)
	}
}

export default TranslationCards;