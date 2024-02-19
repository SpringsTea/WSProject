import { Component, useState } from 'react';
import { Card, Input, Radio, Space } from 'antd';

import EmailChange from './EmailChange';
import LanguageSelect from './LanguageSelect';
import ThemeSelect from './ThemeSelect';

import {
  receiveUser
} from 'Actions/UserActions';

export default function UserSettings ({user}){

  const UpdateUser = (values) => {
    let newuser = {
      ...user,
      ...values
    };

    receiveUser(newuser)
  } 

  return(
    <div className="container-userprofile-settings">
       <Card>
            <div style={{maxWidth: '300px'}}>
                <div>
                    My Email:
                </div>
                <EmailChange onChange={UpdateUser} email={user.email} />
            </div>
            <br />
            <div>
              <ThemeSelect onChange={UpdateUser} config={user.config} />
            </div>
       </Card>
       <Card title="Card Language" size="small">
        <LanguageSelect onChange={UpdateUser} config={user.config} />
       </Card>
    </div>
  )
}