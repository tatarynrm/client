import React, { useEffect } from 'react'
import './HeaderPush.scss'
import { MdNotificationsNone,MdMailOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import NotificationPanel from '../../notification_panel/NotificationPanel';
import { eventsOpenChange,emailOpenChange } from '../../../redux/slices/edit';
const HeaderNotifications = () => {
    const dispatch = useDispatch()
    useEffect(()=>{

    },[])
  return (
    <div className='header__notifications'>
        <i onClick={()=> dispatch(eventsOpenChange()) } className='header__notification'><MdNotificationsNone/></i>
        <i onClick={()=> dispatch(emailOpenChange()) } className='header__notification mail'><MdMailOutline/></i>
    </div>
    
  )
}

export default HeaderNotifications