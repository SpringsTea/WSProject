import React, { Component } from 'react';
import { Icon, Input, Row, Col, Card } from 'antd';
import Img from 'react-image';

const { TextArea } = Input;

import { generateCardImageLink } from 'Utils/cardshorthands';
import Stats from 'Partials/Translations/TranslationCard/Stats';
import Keywords from './Keywords';

class TranslationCard extends Component {

	state = {
		activeability: null,
		translation: {}
	}

	componentDidMount(){
		const { card } = this.props;
		const { translation = {} } = card;

		this.setState({translation})
	}

	handleChange = (input, value, index = 0) => {
		let { translation } = this.state;

		switch(input){
			case 'name':
				translation[input] = value;
			break;
			case 'ability':
				translation[input][index] = value;
			break;
			default:
			break;
		}

		
		this.setState({translation: translation})
	}

	handleKeyword = (text) => {
		let { activeability, translation } = this.state;

		if( activeability === null ){
			return false;
		}

		const abilityref = this.refs[`ability${activeability}`].textAreaRef
		const ability = translation.ability[activeability];

		const start = abilityref.selectionStart
		const end = abilityref.selectionEnd

		translation.ability[activeability] = ability.substring(0, start) + text + ability.substring(end);
		this.setState({translation})
	}

	render(){
		const { handleKeyword, handleChange } = this;
		const { card } = this.props;
		const { translation } = this.state;
		const { locale = {} } = card;

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
									<Input disabled value={locale.name} defaultValue="" style={{width:'100%'}}/>
								</div>
							</Col>
							<Col span={12}>
								<div>
									<Input style={{width:'100%'}} value={translation.name} placeholder="Enter Translated Name" 
										onChange={(e) => handleChange('name', e.target.value)}
									/>
								</div>
							</Col>
						</Row>
						Abilities:
						<Row gutter={6}>
							{locale.ability.map( (ability, i) => 
								<div style={{marginBottom:'3px', display:'flex'}} key={i}>
									<Col span={12}>
										<TextArea value={ability} 
										rows="3"/>
									</Col>
									<Col span={12}>
										<TextArea
										ref={`ability${i}`}
										placeholder="Enter Translation for ability to the left of this textbox"
										value={translation.ability ? translation.ability[i] : ''}
										rows="3"
										onChange={ (e) => handleChange('ability', e.target.value, i) }
										onFocus={() => this.setState({activeability: i})}
										/>
									</Col>
								</div>
							)}
						</Row>
					</div>
				</Card>

				<Card>
					<Keywords handleKeywordClick={handleKeyword} />
				</Card>
			</div>
		)
	}
}

export default TranslationCard;