import React, { Component } from 'react';
import {
  Button, Modal, Form, Input, Radio,
} from 'antd';

import DeckSaveForm from './DeckSaveForm';

const DeckSaveModal = Form.create({ name: 'deck_save_modal' })(
  // eslint-disable-next-line
  class extends React.Component {

  	handleSaveDeck = () => {
	    const { form, deck } = this.props;

	    form.validateFields((err, values) => {
	      if (err) {
	        console.log(err);
	      }

	      console.log(values, deck);
	    });
	  }

    render() {
      const { handleSaveDeck } = this;
      const {
        visible, togglevisible, form,
      } = this.props;
      return (
        <Modal
          visible={visible}
          title="Save Deck"
          okText="Save"
          onCancel={() => togglevisible(false)}
          onOk={handleSaveDeck}
        >
         <DeckSaveForm form={form} />
        </Modal>
      );
    }
  }
);

export default DeckSaveModal