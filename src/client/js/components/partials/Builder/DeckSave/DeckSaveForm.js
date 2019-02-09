import React, { Component } from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

class DeckSaveForm extends Component {
  render(){

    const { form } = this.props;
    const { getFieldDecorator } = form;

    return(
      <Form layout="vertical">
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Give your deck a name!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description')(<TextArea />)}
        </Form.Item>
      </Form>
    )
  }
}

export default DeckSaveForm;