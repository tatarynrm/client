import React from 'react'
import './HeaderPush.scss'
import { MdNotificationsNone,MdMailOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { eventsOpenChange,emailOpenChange } from '../../../redux/slices/edit';
const HeaderNotifications = () => {
    const dispatch = useDispatch()
  return (
    <div className='header__notifications'>
        <i onClick={()=> dispatch(eventsOpenChange()) } className='header__notification'><MdNotificationsNone/></i>
        <i onClick={()=> dispatch(emailOpenChange()) } className='header__notification mail'><MdMailOutline/></i>
    </div>
    
  )
}

export default HeaderNotifications;