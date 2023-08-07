import React from 'react'

const ClosedColors = () => {
  return (
    <div className="closed__zap-colors">
    <div className="close__color" style={{display:"flex",gap:"5px",alignItems:"center",textAlign:"center"}}>
      <div className="color" style={{backgroundColor:'rgba(63, 226, 63, 0.4)',width:"15px",height:"15px",borderRadius:"10px"}}></div>
      <span className="title">Закрита нами</span>
    </div>
    <div className="close__color" style={{display:"flex",gap:"5px",alignItems:"center",textAlign:"center"}}>
      <div className="color" style={{backgroundColor:'rgb(243, 6, 6,0.4)',width:"15px",height:"15px",borderRadius:"10px"}}></div>
      <span className="title">Не закрита нами</span>
    </div>
    <div className="close__color" style={{display:"flex",gap:"5px",alignItems:"center",textAlign:"center"}}>
      <div className="color" style={{backgroundColor:'rgba(187, 95, 95,0.4)',width:"15px",height:"15px",borderRadius:"10px"}}></div>
      <span className="title">Відхилена замовником</span>
    </div>
    <div className="close__color" style={{display:"flex",gap:"5px",alignItems:"center",textAlign:"center"}}>
      <div className="color" style={{backgroundColor:'rgba(168, 55, 233, 0.4)',width:"15px",height:"15px",borderRadius:"10px"}}></div>
      <span className="title">Закрита замовником замовником</span>
    </div>
    <div className="close__color" style={{display:"flex",gap:"5px",alignItems:"center",textAlign:"center"}}>
      <div className="color" style={{backgroundColor:'rgba(236, 245, 111, 0.4)',width:"15px",height:"15px",borderRadius:"10px"}}></div>
      <span className="title">Запит ціни</span>
    </div>    
    </div>
  )
}

export default ClosedColors