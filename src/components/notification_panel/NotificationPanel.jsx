import React, { useState } from 'react'
import './NotificationPanel.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchEvents } from '../../redux/slices/events';
import toTimestamp from '../../helpers/functions';
import moment from "moment";
import "moment/locale/uk";
const NotificationPanel = () => {
    const userData = useSelector(state => state.auth.data)
    const dispatch = useDispatch()
    const events = useSelector(state => state.events.events.items)
    const [buttonFilter,setButtonFilter] = useState('')
    const [searchFilter,setSearchFilter] = useState('')
    const commentFilter = ()=>{
      setButtonFilter('Коментар до заявки')
    }
    const zapFilter = ()=>{
      setButtonFilter("Заявка (запит)")
    }
    const allFilter = ()=>{
      setButtonFilter("")
    }

    useEffect(() => {
      userData && dispatch(fetchEvents(userData?.KOD));
    }, [userData]);
  return (
<div className='notifications__panel'> 
<input className='notifications__panel-search' value={searchFilter} onChange={e=> setSearchFilter(e.target.value)} type="text" placeholder='Пошук: Код заявки,Автор'  />
<div className="notifications__panel-button-filters">
<button onClick={allFilter} className='normal'>Усі</button>
  <button onClick={commentFilter} className='normal'>Коментарі</button>
  <button onClick={zapFilter} className='normal'>Запити</button>
</div>
{events && events
.filter(item => {
  return buttonFilter.toLowerCase() === ""
  ? item
  : item.TITLE.includes(buttonFilter) 
      
})
.filter(item => {
  return searchFilter.toLowerCase() === ""
  ? item
  : item.KOD_ZAP.toString().includes(searchFilter) ||
   item.AUTOR.toLowerCase().includes(searchFilter)  

})
.map((item,idx)=>{
    return <div key={idx} className='notification notification__item' title={item.HINT}>
        <div className="notification__left">
        <div className='notification__author'>{item.AUTOR}</div>
        <div className='notification__date'>{moment(toTimestamp(item.DAT)).format("LLL") }</div>
        </div>
        <div className="notification__center">
        <div className='notification__title'>{item.TITLE} № {item.KOD_ZAP}</div>
        </div>
    </div>
})} 

</div>
  )
}

export default NotificationPanel