import React from 'react'
import './HeaderPush.scss'
import { MdNotificationsNone,MdMailOutline } from 'react-icons/md';
import {SiGooglemeet} from 'react-icons/si'
import { useDispatch } from 'react-redux';
import { eventsOpenChange,emailOpenChange } from '../../../redux/slices/edit';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const HeaderNotifications = () => {
    const dispatch = useDispatch()
    const events = useSelector(state => state.events.events.items)
 
    useEffect(()=>{},[events[0]?.GOOGLEMEET])
  return (
    <div className='header__notifications'>
       {events[0]?.GOOGLEMEET ?  <i  className='header__notification'> <a target='_blank' title='Приєднатись до Google Meet' href={events[0]?.GOOGLEMEET}><SiGooglemeet /></a>  </i> : null}
        <i title='Події з заявками' onClick={()=> dispatch(eventsOpenChange()) } className='header__notification'><MdNotificationsNone/></i>
        <i title='Повідомлення від адмінстраторів та керівників' onClick={()=> dispatch(emailOpenChange()) } className='header__notification mail'><MdMailOutline/></i>
    </div>
    
  )
}

export default HeaderNotifications;