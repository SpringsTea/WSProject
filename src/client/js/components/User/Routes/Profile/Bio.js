import { Component, useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';

import { setUserConfig } from 'Utils/api';
import { throttle } from 'throttle-debounce';

const { TextArea } = Input;

const onSave = throttle( 1000, false, (text, onFinish) =>{
    setUserConfig({bio: text}).then((res) => {
        if(res.success === true){
            //message.success('Bio saved')
            onFinish(res.config)
        }
        else{
            message.error(res.message || 'Something went wrong')
        }
    })
})

export default function Bio ({user, onFinish}){

  return(
    <div className="container-userprofile-bio">
        {
            !!user.currentuser ?
        	<TextArea 
                placeholder="Tell us about your self" rows={4} 
                onChange={(e) => onSave(e.target.value, onFinish)}
                maxLength={10000}
                defaultValue={user.config.bio}
            />
            :
            <div style={{whiteSpace: 'pre-line', maxHeight: '200px', overflowY: 'auto'}}>
                {user.config.bio}
            </div>
        }
    </div>
  )
}