import { Component } from 'react';
import { Row, Col, Pagination, Spin } from 'antd';

import { searchDeck } from 'Utils/api';
import { receiveDecks } from 'Actions/DeckSearchActions';
import setParam from 'Utils/querystringman';

import DeckCard from '../partials/DeckSearch/DeckCard';

class DeckListDisplay extends Component {

	state = {
		loading: false
	}

	handlePaginate = async(page) =>{
		const { setLoading, filters } = this.props;
		setLoading(true);
		const [
			pages,
		] = await Promise.all([
			searchDeck({...filters, page: page}),
		]);

		setParam({...filters, ...{invalid: undefined, username: undefined, page: page}})

		receiveDecks(pages);
		setLoading(false);
	}

	render(){
		const { handlePaginate } = this;
		const { pages, loading, loggedin } = this.props; 
		return(
			<Spin spinning={loading}>
				<div className="container-decksdisplay">
					{
						pages.decks.length > 0 ?
							<Row gutter={18}>
								{
									pages.decks.map( (deck) => 
										<Col xxl={3} xl={4} lg={8} md={12} key={deck.deckid}>
											<DeckCard deck={deck} loggedin={loggedin} /> 
										</Col>
									)
								}
							</Row>
						:
						<div className="nodecks">
							No Decks Were Found
						</div>
					}
				</div>
				<Pagination className="pagination" current={pages.page} total={pages.totalDecks} 
					defaultPageSize={pages.pagelimit} onChange={handlePaginate} />
			</Spin>
		)
	}
}

export default DeckListDisplay;