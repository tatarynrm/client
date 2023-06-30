import React from 'react'
import './HeaderNotifications.scss'
import { MdNotificationsNone } from 'react-icons/md';
import { useSelector } from 'react-redux';
const HeaderNotifications = () => {
    const userData = useSelector(state => state.auth.data)
  return (
    <>
    <i onClick={()=>window.alert(`${userData.IMJA},тут скоро будуть сповіщення.`)} className='header__notification'><MdNotificationsNone/></i>
    
    </>
  )
}

export default HeaderNotifications