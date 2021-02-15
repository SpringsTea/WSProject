import { Component, useState } from 'react';
import { Input, Button, message } from 'antd';
import { ValidateEmail } from 'Utils/regex';
import { setUserEmail } from 'Utils/api';

export default function EmailChange ({email}){
  const [value, setValue] = useState(email);
  const [loading, setLoading] = useState(false);

  const onSave = async() => {
    const valid = ValidateEmail(value)
    if(!valid){
      message.error('Email is not valid')
      return false;
    }
    setLoading(true)
    const res =  await setUserEmail({email:value});
    if(!!res.success){
      message.success('Email updated')
    }
    else{
      message.error(res.message || 'Something went wrong')
    }
    setLoading(false)
  }

  return(
    <span style={{display:'flex'}}>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button type="primary" style={{marginLeft:'1em'}} onClick={onSave}>
        Save
      </Button>
    </span>
  )
};