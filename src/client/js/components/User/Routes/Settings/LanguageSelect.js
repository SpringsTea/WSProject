import { Component } from 'react';
import { Radio, Checkbox, Tooltip, message } from 'antd';

import { setUserConfig } from 'Utils/api';

export default function LanguageSelect ({config = {}, onChange}){

  const onSave = (key, value) => {

    setUserConfig({[key]: value}).then((res) => {
        if(res.success === true){
            onChange({
              config: {
                ...config,
                [key]: value
              }
            })
        }
        else{
            message.error(res.message || 'Something went wrong')
        }
    })

    
  }

  return(
    <span>
      <Radio.Group defaultValue={config.preferredlocale || 'EN'} onChange={(e) => onSave('preferredlocale', e.target.value)}>
        <Radio value="EN">English</Radio>
        <Radio value="JP">Japanese</Radio>        
      </Radio.Group>     
      <Tooltip placement='top' title="Display unofficial community translations"> 
        <Checkbox 
          checked={config.unofficialen !== false}
          onChange={(e) => onSave('unofficialen', e.target.checked)}
        >
          Unofficial English Translations
        </Checkbox>
      </Tooltip>
    </span>
  )
};