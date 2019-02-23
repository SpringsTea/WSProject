import { Component } from 'react';
import { Row, Col } from 'antd';

import DeckCard from '../partials/DeckSearch/DeckCard';

class DeckListDisplay extends Component {
	render(){
		const { decks } = this.props; 
		return(
			<div className="container-deckdisplay">
				<Row gutter={18}>
					{
						decks.map( (deck) => 
							<Col xxl={4} xl={6} lg={8} md={12} key={deck.deckid}>
								<DeckCard deck={deck} /> 
							</Col>
						)
					}
				</Row>
			</div>
		)
	}
}

export default DeckListDisplay;