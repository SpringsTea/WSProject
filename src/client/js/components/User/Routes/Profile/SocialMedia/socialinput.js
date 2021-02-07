import { Component } from 'react';
import { Input } from 'antd';

export default function SocialInput ({onChange, value, icon, addon, size, placeholder}){

  return(
      <Input size={size} suffix={icon} addonBefore={addon} placeholder={placeholder} />
  )
}