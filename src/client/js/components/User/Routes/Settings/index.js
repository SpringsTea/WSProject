import { Component, useState } from 'react';
import { Card, Input } from 'antd';

import EmailChange from './EmailChange';

export default function UserSettings ({user}){

  return(
    <div className="container-userprofile-settings">
       <Card>
            <div style={{maxWidth: '300px'}}>
                <div>
                    Email:
                </div>
                <EmailChange email={user.email} />
            </div>
       </Card>
       <Card title="Language" size="small">

       </Card>
    </div>
  )
}