import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUr } from '../../redux/slices/ur';
import moment from "moment";
import "moment/locale/uk";
const Carrier = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ur = useSelector(state => state.ur.ur.items);
    console.log(ur);
    useEffect(()=>{
      dispatch(fetchUr(id))
    },[id])
  return (
    <div className="carrier container">
    <div className="carrier__inner">

      <div className="carrier__item">
  {ur.length  <=0 ?  <p>...Договорів не знайдено</p> 
  
: ur?.map((item,idx)=>{
    return <div key={idx} className='carrier__dog'>
        <div>{item.IDNT}</div>
        <div>{item.DOGNUM}</div>
        <div>{item.NUR}</div>
        <div>{ moment(item.DAT1).format('ll')}</div>
        <div>{moment(item.DAT2).format('ll')}</div>
    </div>
})
}
      </div>
    </div>
  </div>
  )
}

export default Carrier