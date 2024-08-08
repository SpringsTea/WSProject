import { useState } from 'react';
import { Modal, Button } from 'antd';

const ErrorModal = ({carderrors, onOK}) => {

  const [ loading, setLoading ] = useState(false);

  return (
  	<Modal
  		open={true}
      footer={
        <Button
          type="primary"
          onClick={() => onOK()}
        >
          OK
        </Button>
      }
  	>
  		<p>Deck was imported with errors.</p>
  		<p>The following cards were not found in the encore database:</p>

  		<ul>
  			{
  				carderrors.map((err) => 
  					<li key={err}>{err}</li>
  				)
  			}
  		</ul>
  	</Modal>
  )
}

export default ErrorModal;