import React, { Component } from 'react';
import { Icon, Input, Row, Col, Card } from 'antd';
import Img from 'react-image';

import Stats from 'Partials/Translations/TranslationCard/Stats';

class TranslationCard extends Component {

	render(){
		const { card } = this.props;
		const locale = card.locale.NP ? card.locale.NP : {};
		return(
			<div className="container-translationcard">
				<Card>
					<div className="card-constants">
						<Stats card={card} locale={locale} />
					</div>
				</Card>
			</div>
		)
	}
}

export default TranslationCard;