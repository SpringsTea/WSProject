import { useState } from 'react';
import { Button, Tooltip, Input, Radio, message } from 'antd';
import { 
  CloudDownloadOutlined
} from '@ant-design/icons';

import ErrorModal from './ErrorModal'

import {
  receiveDeck,
} from 'Actions/BuilderActions';

import { importDecklog } from 'Utils/api';

const { Search } = Input;

const ImportDeck = () => {

  const [ loading, setLoading ] = useState(false);
  const [ open, setOpen ] = useState(false);
  const [ lang, setLang ] = useState('EN');
  const [ errors, setErrors ] = useState(null);

  const onSearch = (ID) => {

  	if(!ID){
  		return false;
  	}

  	setLoading(true)

  	importDecklog(ID.toUpperCase(), lang)
  	.then((res) => {
  		receiveDeck({ 
  			cards: res.cards, name: res.name,
  			description: `Imported from ${res.source}/${ID}`
  		})

  		if( res.carderrors.length > 0 ){
  			setErrors(res.carderrors)
  		}
  	})
  	.catch((res) => {
  		console.log(res)
  		message.error(res?.response?.data?.message || 'Something went wrong')
  	})
  	.finally((res) => {
  		setLoading(false)
  	})
  }

  return(
  	<>
  		{
  			!open &&
			<Tooltip
		  		title="Import deck from Decklog"
		  	>
			    <Button
			    	className="btn-import-decklog"
			    	type="default" 
			    	icon={<CloudDownloadOutlined />} 
			    	size='large'
			    	onClick={() => setOpen(!open)}
			    >
			    </Button>
		    </Tooltip>
		}
		{
			!!open &&
			<>	
				<Search
			      placeholder="Decklog ID"
			      allowClear
			      enterButton={<CloudDownloadOutlined />}
			      size="large"
			      style={{
			        width: 200,
			      }}
			      loading={loading}
			      onSearch={onSearch}
			    />
			    <br />
			    <Radio.Group 
			    	onChange={(e) => {
			    		setLang(e.target.value)
			    	}} 
			    	value={lang}
			    >
			    <Tooltip
			    	title={'decklog-en.bushiroad.com'}
			    >
			      <Radio value={'EN'}>English</Radio>
			    </Tooltip>
			    <Tooltip
			    	title={'decklog.bushiroad.com'}
			    >
			      <Radio value={'JP'}>Japanese</Radio>
			    </Tooltip>
			    </Radio.Group>
		    </>
		}
		{
			!!errors &&
			<ErrorModal 
				carderrors={errors} 
				onOK={() => setErrors(null)}
			/>
		}
	</>
  )
}

export default ImportDeck;