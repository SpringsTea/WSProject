import React, { Component } from 'react';
import {
  Button, Modal, Form, Input, Radio,
} from 'antd';

import DeckSaveForm from './DeckSaveForm';

import { saveDeck } from 'Utils/api'; 

const DeckSaveModal = Form.create({ name: 'deck_save_modal' })(
  // eslint-disable-next-line
  class extends React.Component {

  	state = {
  		loading: false
  	}

  	handleSubmitForm = () => {
  		const { form } = this.props;

	    form.validateFields((err, values) => {
	      if (err) {
	        console.log(err);
	      }
	      else{
	      	this.handleSaveDeck(values)
	      }
	    });
  	}

  	handleSaveDeck = async(values) => {
  		const { deck } = this.props;
  		this.setState({loading: true});
		const [
		  res
		] = await Promise.all([
		    saveDeck({
		      	...values,
			  	cards: deck
		    })
		]);
		this.setState({loading: false});
		console.log(res);   
	}

    render() {
      const { handleSubmitForm } = this;
      const { loading } = this.state;
      const {
        visible, togglevisible, form,
      } = this.props;
      return (
        <Modal
          visible={visible}
          title="Save Deck"
          okText="Save"
          confirmLoading={loading}
          onCancel={() => togglevisible(false)}
          onOk={handleSubmitForm}
        >
         <DeckSaveForm form={form} />
        </Modal>
      );
    }
  }
);

export default DeckSaveModal