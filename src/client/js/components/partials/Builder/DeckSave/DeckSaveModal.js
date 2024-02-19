import { useState } from 'react';
import {
  Button, Modal, Input, Radio, Form, message
} from 'antd';

import DeckSaveForm from './DeckSaveForm';

import { saveDeck } from 'Utils/api'; 

const DeckSaveModal = ({visible, deck, deckdata, mode, togglevisible}) => {

  const [ loading, setLoading ] = useState(false);
  const [ form ] =  Form.useForm();

  const handleSaveDeck = async(values) => {

    setLoading(true)

    let submitdata = {
      ...values,
      cards: deck.map( (c) => c._id )
    }

    if ( deckdata && mode !== 'fork' ){
      submitdata.deckid = deckdata.deckid;
    }

    const [
      res
    ] = await Promise.all([
        saveDeck(submitdata)
    ]);
    if( res.status === 200 && res.data ){
      window.location.href = `/deck/${res.data.deck.deckid}`;
    }
    else{
      setLoading(false)
      message.error(res.response.data.message)
    }
  }

  const handleSubmitForm = () => {
    form.validateFields()
    .then((values) => {
      console.log(values)
      handleSaveDeck(values)
    })
  }

  return (
    <Modal
      visible={visible}
      title="Save Deck"
      okText="Save"
      confirmLoading={loading}
      onCancel={() => togglevisible(false)}
      onOk={handleSubmitForm}
      okButtonProps={ deck.length === 0 ? { disabled: true } : {} }
    >
      <DeckSaveForm form={form} deck={deck} mode={mode} deckdata={deckdata} />
    </Modal>
  )
}

/*
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
  		const { deck, deckdata, mode, togglevisible } = this.props;
  		this.setState({loading: true});

      let submitdata = {
        ...values,
        cards: deck.map( (c) => c._id )
      }

      if ( deckdata && mode !== 'fork' ){
        submitdata.deckid = deckdata.deckid;
      }

  		const [
  		  res
  		] = await Promise.all([
  		    saveDeck(submitdata)
  		]);
      if( res.status === 200 && res.data ){
        window.location.href = `/deck/${res.data.deck.deckid}`;
      }
      else{
        this.setState({loading: false});
        message.error(res.response.data.message)
      }
  	}

    render() {
      const { handleSubmitForm } = this;
      const { deck, deckdata, mode } = this.props;
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
          okButtonProps={ deck.length === 0 ? { disabled: true } : {} }
        >
         <DeckSaveForm form={form} deck={deck} mode={mode} deckdata={deckdata} />
        </Modal>
      );
    }
  }
);
*/

export default DeckSaveModal