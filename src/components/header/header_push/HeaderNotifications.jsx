import React, { useEffect } from 'react'
import './HeaderNotifications.scss'
import { MdNotificationsNone } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import NotificationPanel from '../../notification_panel/NotificationPanel';
import { eventsOpenChange } from '../../../redux/slices/edit';
const HeaderNotifications = () => {
    const userData = useSelector(state => state.auth.data)
    const event = useSelector(state => state.events.items)
    const eventsOpen = useSelector(state => state.edit.eventsOpen)
    console.log('...eventsOpen',eventsOpen);
    const dispatch = useDispatch()
    useEffect(()=>{

    },[])
  return (
    <div className='header__notifications'>
        <i onClick={()=> dispatch(eventsOpenChange()) } className='header__notification'><MdNotificationsNone/></i>
 
    </div>
    
  )
}

export default HeaderNotifications