import React from 'react'

export default function Die(props){
    const styles={
        backgroundColor: props.isHeld ? "#59E391" : ""
    }

   return(
    <div>
        <h2 className='lede' style={styles} onClick={props.holdDice}>{props.value}</h2>
    </div>
   ) 
}
