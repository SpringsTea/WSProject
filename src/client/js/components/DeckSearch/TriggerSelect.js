import { useState, useEffect } from 'react';
import { Select, Tag } from 'antd';
import Img from 'react-image';

import { 
  QuestionCircleOutlined
} from '@ant-design/icons';

import triggers from 'Constants/triggers';

const { Option } = Select;


//This component has some weird functionality to make it possible to select the same trigger twice
export default function TriggerSelect({ onSelect }) {

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const [checkRender, setCheckRender] = useState(false);

	const handleSelect = (value) => {
	  if( selectedItems.length === 0 || selectedItems.length >= 2 ){
	  	setSelectedItems([value])
	  }
	  else{
	  	setSelectedItems([selectedItems[0], value])
	  	setDropdownOpen(false)
	  }
	};

	const handleDeselect = (label) => {
	    const updatedItems = selectedItems.filter((val) => val !== label);
	    setSelectedItems(updatedItems);
	};

	useEffect(() => {
		if(dropdownOpen === false && checkRender === true){
			//cut off the leading key for submission
			const selectedTriggers = selectedItems.map((item) => item.substring(1))
			onSelect(selectedTriggers)//send triggers to parent
		}		

		if( checkRender === false ){
			setCheckRender(true)
		}

	}, [dropdownOpen, selectedItems])

	const tagRender = (props) => {
	  const { label, value, closable, onClose } = props;

	  const trigger = label?.substring(1);

	  const onPreventMouseDown = (event) => {
	    event.preventDefault();
	    event.stopPropagation();
	  };
	  return (
	    <Tag
	      onMouseDown={onPreventMouseDown}
	      closable={closable}
	      onClose={() => handleDeselect(label)}
	      style={{
	        marginInlineEnd: 4,
	        display: 'flex'
	      }}
	    >
	      <Img
			style={{
				width: '22px',
			}}
		    src={`/images/assets/triggers/${trigger}.png`}
	    	unloader={<QuestionCircleOutlined className="image-not-found" />}
	    />
	    </Tag>
	  );
	};

	return (
		<div>
			<Select
		      mode="multiple"
		      value={selectedItems}
		      open={dropdownOpen}
		      onDropdownVisibleChange={(open) => setDropdownOpen(open)} // Syncs manual and user interaction
		      style={{ width: "100%" }}
		      tagRender={tagRender}
		      dropdownRender={(menu) => (
		      	<div>
		      		<div>
		      			{
		      				triggers.map((trigger) => (
		      					<Img
		      						key={trigger}
		      						title={trigger}
		      						className="clickable"
		      						onClick={() => handleSelect(`${selectedItems.length}${trigger}`)}
									style={{
										width: '32px',
										marginRight: '8px'
									}}
								    src={`/images/assets/triggers/${trigger}.png`}
							    	unloader={<QuestionCircleOutlined className="image-not-found" />}
							    />
		      				))
		      			}
		      		</div>
		      	</div>
		      )}
		    >

		    </Select>
		</div>

	)
}