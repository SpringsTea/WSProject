import React, { Component } from 'react';
import { Form, Input, InputNumber, Alert, Checkbox, Tooltip, Row, Col } from 'antd';
import { 
  HeartOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

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
      <Form 
        layout="vertical" 
        className="decksave-form" 
        initialValues={{
          description: deckdata.description || '',
          private: deckdata.private || false,
          'attribute-group': attributes.map( (a) => mode === 'edit' && a.name ),
          'record-wins': tournamentAttribute.record ? tournamentAttribute.record.wins : 0,
          'record-losses': tournamentAttribute.record ? tournamentAttribute.record.losses : 0,
        }}
        form={form}
      >
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
        <Form.Item 
          label="Name"
          name='name'
          rules={[
            { required: true, message: 'Give your deck a name!', transform(v) { return v.trim()} },
            { max: 100, message: 'Keep names to 100 characters long' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label="Description"
          name="description"
          rules={[
            { max: 5000, message: 'Keep descriptions to 5000 characters long' }
          ]}
        >
          <TextArea autosize={{minRows: 4, maxRows: 4}} />
        </Form.Item>

        <Form.Item
          name="private"
          valuePropName='checked'
        >
          <Checkbox>
            Private
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="attribute-group"
        >
          <Checkbox.Group style={{width: '100%'}}>
            <Row>
              <Tooltip title="Decks that have proved themselves effective in tournament play (locals included)">
                <Checkbox value="Tournament" onChange={(e) => this.setState({showrecord: e.target.checked})}>
                  Tournament <TrophyOutlined className="ws-tournament" />
                </Checkbox>
              </Tooltip>
              <Tooltip title="Decks that were made from love (Husbandos welcome)">
                <Checkbox defaultChecked={false} value="Waifu">
                  Waifu <HeartOutlined className="ws-heart" />
                </Checkbox>
              </Tooltip>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        {showrecord &&
          <span>
          Record:
            <Row>
              <Col span={6}>
                <Form.Item 
                  label="Wins"
                  name="record-wins"
                  rules={[{validator: validateRecord}]}
                >
                  <InputNumber min={0} max={100} />
                </Form.Item>
              </Col>
              <Col span={6}>
              <Form.Item 
                label="Losses"
                name="record-losses"
              >
                <InputNumber min={0} max={100} />
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