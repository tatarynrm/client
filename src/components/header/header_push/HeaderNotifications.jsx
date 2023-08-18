import React from 'react'
import './HeaderPush.scss'
import { MdNotificationsNone,MdMailOutline } from 'react-icons/md';
import {SiGooglemeet} from 'react-icons/si'
import { useDispatch } from 'react-redux';
import { eventsOpenChange,emailOpenChange } from '../../../redux/slices/edit';
const HeaderNotifications = () => {
    const dispatch = useDispatch()
  return (
    <div className='header__notifications'>
        <i  className='header__notification'> <a target='_blank' href="https://meet.google.com/fxd-wpda-uic"><SiGooglemeet /></a>  </i>
        <i onClick={()=> dispatch(eventsOpenChange()) } className='header__notification'><MdNotificationsNone/></i>
        <i onClick={()=> dispatch(emailOpenChange()) } className='header__notification mail'><MdMailOutline/></i>
    </div>
    
  )
}

export default HeaderNotifications;