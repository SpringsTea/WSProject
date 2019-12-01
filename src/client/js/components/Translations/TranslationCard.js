import React, { Component } from 'react';
import { Icon, Input, Row, Col, Card, Button } from 'antd';
import Img from 'react-image';

const { TextArea } = Input;

import { generateCardImageLink } from 'Utils/cardshorthands';
import Stats from 'Partials/Translations/TranslationCard/Stats';
import Keywords from './Keywords';

import { editTranslation } from 'Actions/TranslationActions'

class TranslationCard extends Component {

	state = {
		activeability: null,
	}

	handleChange = (input, value, index = 0) => {
		let { card } = this.props;
		let { translation } = card;

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
		
		editTranslation(translation)
	}

	//Insert the given text into the last focused ability box, depending on where the cursor is
	//This is kind of akward because cursor position isn't controlled by react
	handleKeyword = (text) => {
		let { card } = this.props;
		let { activeability } = this.state;
		let { translation } = card;

		if( activeability === null ){
			return false;
		}

		const abilityref = this.refs[`ability${activeability}`].textAreaRef
		const ability = translation.ability[activeability] || '';

		const start = abilityref.selectionStart
		const end = abilityref.selectionEnd

		//Insert text between the selected text
		translation.ability[activeability] = ability.substring(0, start) + text + ability.substring(end);
		abilityref.value = translation.ability[activeability];

		//This timeout is nessesary to set selection range
		//https://github.com/facebook/react/issues/6483
		setTimeout(() => {
			//Set the cursor selection to the end of the inserted value
			abilityref.setSelectionRange(start + text.length, start + text.length)
		}, 0);

		this.handleChange('ability',translation.ability[activeability], activeability)
	}

	render(){
		const { handleKeyword, handleChange } = this;
		const { card, attributes } = this.props;
		const { locale = {}, translation = {} } = card;

		return(
			<div className="container-translationcard">
				<Card style={{marginBottom: '5px'}}>
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
									<Input style={{width:'100%'}} defaultValue={translation.name} placeholder="Enter Translated Name" 
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
										defaultValue={translation.ability ? translation.ability[i] : ''}
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

				<Card style={{marginBottom:'5px'}}>
					<Keywords handleKeywordClick={handleKeyword} attributes={attributes} />
				</Card>
			</div>
		)
	}
}

export default TranslationCard;