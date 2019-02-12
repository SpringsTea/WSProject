import React, { Component } from 'react';
import { Form, Input, Alert } from 'antd';

const { TextArea } = Input;

class DeckSaveForm extends Component {

  render(){
    const { generateAlerts } = this;
    const { form, deck } = this.props;
    const { getFieldDecorator } = form;

    let alerts = [];

    if( deck.length !== 50 ){
      alerts.push({ type: 'warning', message: 'Your deck does not have 50 cards', description: 'You can still save your deck and complete it later' });
    } 

    return(
      <Form layout="vertical">
        {
          alerts.map( (data, i) => 
            <span key={i}>
              <Alert type={data.type} message={data.message} description={data.description} showIcon /> 
              <hr />
            </span>
          )
        }
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Give your deck a name!' },
              { max: 100, message: 'Keep names to 100 charicters long' }
            ],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            rules: [{ max: 2000, message: 'Keep descriptions to 2000 charicters long' }]
          })(
            <TextArea autosize={{minRows: 4, maxRows: 4}} />
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default DeckSaveForm;