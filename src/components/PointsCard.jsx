import React from 'react'
import "./PointsCard.css"
const PointsCard = ({playerName,icon,color,points}) => {
    const Images = ["icons hero/hulk.jpg", "icons hero/20814893-9d12-4039-b8f0-31109a383538.jpg", "icons hero/iron man.jpg", "icons hero/thor.jpg", "icons hero/kratos.jpg", "icons hero/pikachu.jpg", "icons hero/deadpool.jpg", "icons hero/aizawa.jpg", "icons hero/darkshadow.jpg", "icons hero/deku.jpg", "icons hero/chopper.jpg", "icons hero/Luffy.jpg", "icons hero/sanji.jpg", "icons hero/zoro.jpg"]
  return (
    <>
      <div className="card-container">
        <img src={icon} alt="" />
        <div className="player-info">
            <div className="player-name" style={{color:{color}}}>{playerName}</div>
            <div className="points">{points} Points</div>
        </div>
      </div>
    </>
  )
}

export default PointsCard
