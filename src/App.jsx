import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice,setDice]=useState(allNewDies())
  const [tenzies,setTenzies]=useState(false)
  const [score,setScore]= useState(0)

  function lescore(){
    if(tenzies){
      setScore(0)
    }
    else{
      useEffect(setScore(x=>{return x+1}),[dice])
    }
  }

  useEffect(()=>{
    const allHelded  = dice.every(x=>{return x.isHeld})
    const oneValue = dice[0].value
    const allAreSame= dice.every(x=>x.value===oneValue)
    if(allHelded && allAreSame){
      setTenzies(true)
      console.log("You win")
    }
  },[dice])
  
  function holdDice(id){
    setDice(x=>{return x.map(
      xx=>{return (id===xx.id)? {...xx,isHeld:!xx.isHeld}:xx }
    )})
   }
 
  const diceElement=dice.map(x=>{
     return <Die key={x.id} value={x.value} isHeld={x.isHeld} holdDice={()=>holdDice(x.id)} />
  })
  
  // creer des nouvelles valeur de dé en retourne un tableau 
  function allNewDies(){
    const Dies=[]
    for(let i=0; i<=9 ;i++){
      Dies.push({value:Math.round(Math.random()*5 + 1), isHeld:false, id:nanoid()})
    }
  return Dies
  }

  function rollDice(){
    if(tenzies){
      setScore(x=>x=0)
      setTenzies(false)
      setDice(allNewDies())
    }else{
      setScore(x=>x+1)
    setDice(x=>{return x.map(xx=>{
      return xx.isHeld? xx : {value:Math.round(Math.random()*5 + 1), isHeld:false, id:nanoid()} 
    })})
    }
  }
  


  return (
    <main>
          {tenzies && <Confetti/>}
        <div className='game'>
          <h1 className='game--title'>Tenzies Game</h1>
          <div className='game--desc'>Selectionnez un chiffre et clicker jusqu'a obtenir un 
        ensemble de chiffre identique au chiffre selectionné </div>
        </div>
      <div className='container'>
      {diceElement}
      </div>
      <button onClick={rollDice}>{tenzies ? "New Game": "Roll"}</button>
       <p>{tenzies? "You won after ": ""}{score} rolls</p>
    </main>
  )
}

export default App
