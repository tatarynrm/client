import React, { useEffect } from 'react'
import './GoogleMeetItem.scss'
import { SiGooglemeet } from 'react-icons/si'
import { CgCloseR } from 'react-icons/cg'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { changeGoogleMeetOpen } from '../../redux/slices/edit'
const GoogleMeetItem = () => {
   const dispatch = useDispatch()
    const events = useSelector(state => state.events.events.items)
    const removeGoogleMeet = ()=>{
        if (window.confirm('Ви відхиляєте участь в нараді ?')) {
            dispatch(changeGoogleMeetOpen())
        }
    }
    useEffect(()=>{

    },[events])
  return (
    <div className='google__meet-block'>
        <div className="google__meet-info">
        <a href={events[0]?.GOOGLEMEET ? events[0]?.GOOGLEMEET : null} target="_blank" rel="noopener noreferrer">
        <button style={{color:"black",backgroundColor:"lightgreen"}} className="normal google__meet-button">
          
              <i>
                <SiGooglemeet fill='black' />
              </i>
     
              Приєднатись до наради
            </button>
            </a>
        <button onClick={removeGoogleMeet} style={{color:"black",backgroundColor:"red"}} className="danger google__meet-button">
              <i>
                <AiFillCloseCircle fill='black' />
              </i>
              Відхилити запрошення
            </button>
        </div>
    </div>
  )
}

export default GoogleMeetItem