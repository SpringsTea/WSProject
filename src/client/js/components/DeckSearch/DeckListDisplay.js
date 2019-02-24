import { Component } from 'react';
import { Row, Col } from 'antd';

import DeckCard from '../partials/DeckSearch/DeckCard';

class DeckListDisplay extends Component {
	render(){
		const { decks } = this.props; 
		return(
			<div className="container-deckdisplay">
				{
					decks.length > 0 ?
					<Row gutter={18}>
						{
							decks.map( (deck) => 
								<Col xxl={3} xl={4} lg={8} md={12} key={deck.deckid}>
									<DeckCard deck={deck} /> 
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
		)
	}
}

export default DeckListDisplay;