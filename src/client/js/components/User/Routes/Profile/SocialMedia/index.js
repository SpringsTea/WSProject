import { Component } from 'react';
import { 
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

import SocialInput from './socialinput';

import { setUserConfig } from 'Utils/api';

export default function SocialMedia ({user, onFinish}){

    const onSave = async (value, name) => {
        return await setUserConfig({[name]: value}).then((res) => {
            if(res.success === true){
                onFinish(res.config)
            }
            else{
                message.error(res.message || 'Something went wrong')
            }
        })
    }

    return(
    <div className="container-userprofile-socialmedia" style={{display:'flex'}}>
    	<span style={{width:'300px', marginRight:'1em'}}>
    		<SocialInput 
            name='Twitter'
            value={user.config.Twitter}
    		icon={<TwitterOutlined />}
    		addon="@"
    		placeholder="Handle"
            currentuser={user.currentuser}
            onSave={onSave}
    		/>
    	</span>
    	<span style={{width:'300px', marginRight:'1em'}}>
    		<SocialInput 
            name="Youtube"
            value={user.config.Youtube}
    		icon={<YoutubeOutlined />}
    		addon="channel/" 
    		placeholder="Username"
            currentuser={user.currentuser}
            onSave={onSave}
    		/>
    	</span>
    	<span style={{width:'300px', marginRight:'1em'}}>
    		<SocialInput 
            name="Discord"
            value={user.config.Discord}
    		icon={<FontAwesomeIcon icon={faDiscord} />} 
    		placeholder="Discord"
            currentuser={user.currentuser}
            onSave={onSave}
    		/>
    	</span>
    </div>
    )
}