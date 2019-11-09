import React, { Component } from 'react';
import { Icon, Input, Row, Col, Card } from 'antd';
import Img from 'react-image';

const { TextArea } = Input;

import { generateCardImageLink } from 'Utils/cardshorthands';
import Stats from 'Partials/Translations/TranslationCard/Stats';

class TranslationCard extends Component {

	render(){
		const { card } = this.props;
		const locale = card.locale;
		return(
			<div className="container-translationcard">
				<Card>
					<div className="container-cardimage">
						<Img
						src={[
						  generateCardImageLink(card),
						]}
							unloader={<Icon className="image-not-found" type="question-circle" />}
						/>
					</div>
					<div className="card-constants">
						<Stats card={card} locale={locale} />
					</div>
					<div className="card-translations">
						Name:
						<Row gutter={6}>
							<Col span={12}>
								<div>
									
									<Input disabled value={locale.name} style={{width:'100%'}}/>
								</div>
							</Col>
							<Col span={12}>
								<div>
									<Input style={{width:'100%'}} placeholder="Enter Translated Name" />
								</div>
							</Col>
						</Row>
						Abilities:
						<Row gutter={6}>
							{locale.ability.map( (ability, i) => 
								<div style={{marginBottom:'3px', display:'flex'}} key={i}>
									<Col span={12}>
										<TextArea value={ability} 
										rows="3"
										/>
									</Col>
									<Col span={12}>
										<TextArea
										placeholder="Enter Translation for ability to the left of this textbox"
										rows="3"
										/>
									</Col>
								</div>
							)}
						</Row>
					</div>
				</Card>
			</div>
		)
	}
}

export default TranslationCard;