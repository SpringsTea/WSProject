import { Component } from 'react';
import { Icon } from 'antd'
import SocialInput from './socialinput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

export default function SocialMedia ({user}){

  return(
    <div className="container-userprofile-socialmedia">
    	<div style={{width:'200px'}}>
    		<SocialInput 
    		icon={<Icon type="twitter" />}
    		addon="@"
    		placeholder="Handle"
    		/>
    	</div>
    	<div style={{width:'200px'}}>
    		<SocialInput 
    		icon={<Icon type="youtube" />}
    		addon="user/" 
    		placeholder="Username"
    		/>
    	</div>
    	<div style={{width:'200px'}}>
    		<SocialInput 
    		icon={<FontAwesomeIcon icon={faDiscord} />} 
    		addon="#"
    		placeholder="Discord"
    		/>
    	</div>
    </div>
  )
}