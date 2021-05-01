import { Component, useState } from 'react';
import { Input, Icon, Button } from 'antd';

import { links } from 'Constants/sociallinks';

export default function SocialInput ({onSave, value, name, icon, addon = '', size, placeholder, currentuser = false}){

  const [editable, setEditable] = useState(!value)
  const [inputvalue, setValue] = useState(value);
  return(
	<div>
		{
		(currentuser && editable) ?
  		<Input 
  			size={size} 
  			suffix={icon} 
  			addonBefore={addon} 
  			addonAfter={<Icon className="clickable" type="save" 
  				onClick={() => onSave(inputvalue, name).then((r) => setEditable(false))} />
  			}
  			placeholder={placeholder} 
  			value={inputvalue}
  			onChange={(e) => setValue(e.target.value)}
  		/>
  		:
  		<span style={{fontWeight: 'bold'}}>
  			<div>{name}:</div>
        {
        !!value &&
    			<a href={ links[name] ? `${links[name]}${value}` : null} target="_blank">
    				<Icon type="link" />
    					{icon}
    				{
    					`${name === 'Youtube' ? 'Youtube' : `${addon}${value}`}`
    				}
    			</a>
        }
  		</span>
  		}
  		{
  			(currentuser && editable === false) &&
  			<a style={{marginLeft: '4px'}}>
  				<Icon type="edit" onClick={() => setEditable(true)} />
  			</a>
  		}
		</div>  		
  )
}