import React from 'react'
import { useState } from 'react'
import "./ActiveUsersList.scss"
const ActiveUsersList = ({users}) => {
console.log(users);

  return (
    <div className='active__users-list'>
       {users?.map((item,idx)=>{
        return <div key={idx}>
            <div>{idx + 1}. {item.PIP}</div>
        </div>
       })}
    </div>
  )
}

export default ActiveUsersList