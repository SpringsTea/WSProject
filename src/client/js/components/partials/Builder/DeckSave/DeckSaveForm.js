import React, { Component } from 'react';
import { Form, Input, InputNumber, Alert, Checkbox, Icon, Tooltip, Row, Col } from 'antd';
import CoverImageModal from './CoverImageModal';
import DeckImage from './DeckImage'

const { TextArea } = Input;

class DeckSaveForm extends Component {

  state = {
    showrecord: this.props.deckdata.attributes ? 
      this.props.deckdata.attributes.find( (a) => this.props.mode === 'edit' && a.name === "Tournament") : false,
    coverimagevisible: false
  }

  validateRecord = (rule, value, callback) => {
    const { form } = this.props;
    
    if (value < 1 && form.getFieldValue('record-losses') < 1) {
      callback("Record cannot be 0-0")
    }
    else{
      callback();
    }

  }

  render(){
    const { validateRecord } = this;
    const { form, mode, deck, deckdata = {} } = this.props;
    const { showrecord, coverimagevisible } = this.state;
    const { getFieldDecorator } = form;
    const tournamentAttribute = showrecord || {};
    const attributes = deckdata.attributes || [];

    let alerts = [];

    if( deck.length === 0 ){
      alerts.push({ type: 'warning', message: 'You cannot save a deck with no cards'});
    }
    else if( deck.length !== 50 ){
      alerts.push({ type: 'warning', message: 'Your deck does not have 50 cards', description: 'You can still save your deck and complete it later' });
    } 

    return([
      <Form layout="vertical" className="decksave-form" key="form">
        {
          alerts.map( (data, i) => 
            <span key={i}>
              <Alert type={data.type} message={data.message} description={data.description} showIcon /> 
              <hr />
            </span>
          )
        }
        {
          deck.length > 0 &&
          <span>
            Cover Image <a onClick={() => this.setState({coverimagevisible: true})}>(change)</a>
            <DeckImage card={deck[0]} />
          </span>
        }
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: deckdata.name || '',
            rules: [
              { required: true, message: 'Give your deck a name!', transform(v) { return v.trim()} },
              { max: 100, message: 'Keep names to 100 characters long' },
            ],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            initialValue: deckdata.description || '',
            rules: [{ max: 5000, message: 'Keep descriptions to 5000 characters long' }]
          })(
            <TextArea autosize={{minRows: 4, maxRows: 4}} />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('attribute-group', {
            initialValue: attributes.map( (a) => mode === 'edit' && a.name ),
          })(
          <Checkbox.Group style={{width: '100%'}}>
            <Row>
              <Col span={12}>
                <Tooltip title="Decks that have proved themselves effective in tournament play (locals included)">
                  <Checkbox value="Tournament" onChange={(e) => this.setState({showrecord: e.target.checked})}>
                    Tournament <Icon type="trophy" className="ws-tournament" />
                  </Checkbox>
                </Tooltip>
              </Col>
              <Col span={12}>
                <Tooltip title="Decks that were made from love (Husbandos welcome)">
                  <Checkbox defaultChecked={false} value="Waifu">
                    Waifu <Icon type="heart" className="ws-heart" />
                  </Checkbox>
                </Tooltip>
              </Col>
            </Row>
          </Checkbox.Group>
          )}
        </Form.Item>
        {showrecord &&
          <span>
          Record:
            <Row>
              <Col span={6}>
                <Form.Item label="Wins">
                {getFieldDecorator('record-wins', {
                  initialValue: tournamentAttribute.record ? tournamentAttribute.record.wins : 0, rules: [{validator: validateRecord}]
                })(
                    <InputNumber min={0} max={100} />
                )}
                </Form.Item>
              </Col>
              <Col span={6}>
              <Form.Item label="Losses">
              {getFieldDecorator('record-losses', {
                initialValue: tournamentAttribute.record ? tournamentAttribute.record.losses : 0
              })(
                  <InputNumber min={0} max={100} />
              )}
              </Form.Item>
              </Col>
            </Row>
          </span>
        }
      </Form>,
      <CoverImageModal key="coverimage" deck={deck} deckdata={deckdata}
        visible={coverimagevisible} handleVisible={(v) => this.setState({coverimagevisible: v === true})}
      />
    ])
  }
}

export default DeckSaveForm;