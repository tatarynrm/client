import './Feedback.scss'
import moment from 'moment';
import "moment/locale/uk";
import { useEffect } from 'react';
import axios from '../../utils/axios'
import { useState } from 'react';
import toTimestamp from '../../helpers/functions';
const Feedback = () => {

    const [feedbacks,setFeedbacks] = useState([])
const getAllFeedbacks = async ()=>{
    try {
        const data = await axios.get('/feedback')
        console.log(data);
        if (data.status === 200) {
            setFeedbacks(data.data)
        }
    } catch (error) {
        console.log(error);
    }
}
    useEffect(()=>{
        getAllFeedbacks()
    },[])
  return (
    <div className='feedback container page'>
       <div className="feedback__inner">
        {feedbacks?.
         sort((a, b) => toTimestamp(b.created) - toTimestamp(a.created))
        .map((item,idx)=>{
            return <div key={idx} className='feedback'>
                <div className='date'>{moment(item.created).format('lll')}</div>
                <div className='date'>{item.manager}</div>
                <div className='date'>{item.feedback}</div>
            </div>
        })}
       </div>

    </div>
  )
}

export default Feedback