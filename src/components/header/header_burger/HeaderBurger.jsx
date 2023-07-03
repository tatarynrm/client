import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import './HeaderBurger.scss'
const HeaderBurger = ({setOpenBurger,openBurger}) => {
  return (
    <div  onClick ={()=>setOpenBurger(value=>!value)} className='header__burger'> 
    {}
    <i  className='header__burger-icon'>
      
      {openBurger ?<AiOutlineClose/> : <GiHamburgerMenu/>}
    
    </i>
    </div>
  )
}

export default HeaderBurger