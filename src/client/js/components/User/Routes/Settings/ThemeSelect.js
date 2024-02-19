import { Radio, Space, message } from 'antd';

import { setUserConfig } from 'Utils/api';

export default function ThemeSelect ({config = {}, onChange}){

  const onSave = (e) => {

    let radiovalue = e.target.value;

    setUserConfig({'theme': radiovalue}).then((res) => {
        if(res.success === true){
          location.reload()
        }
        else{
            message.error(res.message || 'Something went wrong')
        }
    })

    
  }

  return(
    <span>
      Site Theme: <Space/>
      <Radio.Group onChange={onSave} defaultValue={config.theme || 'light'}>
        <Radio value='light'> Light </Radio>
        <Radio value='dark'> Dark </Radio>
      </Radio.Group>
    </span>
  )
};