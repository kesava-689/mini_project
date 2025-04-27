import React from 'react'
import './Vedioplayer.css'
import { useRef } from 'react'
import vedio from '../../assets/food_donation_vedio.mp4'
const Vedioplayer = ({playState, setPlayState}) => {
    const player = useRef(null);
    const closePlayer = (e) => {
        if(e.target === player.current){
            setPlayState(false);
        }
    }
  return (
    <div className={`vedio-player ${playState ? '' :'hide'}`} ref={player} onClick={closePlayer}>
      <video src={vedio} autoPlay muted controls></video>
    </div>
  )
}

export default Vedioplayer
