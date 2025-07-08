import { useState, useRef, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import './index.css'
import Die from "./components/Die"
import {nanoid} from 'nanoid'
function App() {

  const[generatedDice, setGeneratedDice] = useState(() => generateAllNewDice())
  const buttonFocus = useRef(null)
  const[rollCount, setRollCount] = useState(0)
  const [catala,setCatala] = useState(false)
  let gameWon = generatedDice.every(x=>x.isHeld) && generatedDice.every(x=>x.value===generatedDice[0].value)
   const { width, height } = useWindowSize()

  useEffect(()=>{
    if(gameWon){
      buttonFocus.current.focus()
    }
  },[gameWon])
  
  function generateAllNewDice(){
    let p1 = []
    for(let i=0;i<10;i++){
      p1.push({
        value: Math.ceil(Math.random()*6),
        isHeld: false,
        id:nanoid()
    })
    }
    return p1
  }

  function reRoll(){
    if(!gameWon){
      setGeneratedDice(oldDie=> oldDie.map(die=>{
        return die.isHeld?  die : {...die,value:Math.ceil(Math.random()*6)}
      }))
      if(Object.values(generatedDice).some(item => item.isHeld === true)){
        setRollCount(oldCount=>oldCount+=1)
      }
      
    }else{
      setGeneratedDice(generateAllNewDice())
      setRollCount(oldCount=>oldCount=0)
    }
  }



  function hold(id){
    setGeneratedDice(oldDie=> oldDie.map(die=>{
      return die.id===id?{...die,isHeld: !die.isHeld} : die
    }))

  }

  function changeLang(){
    setCatala((oldLang)=>!oldLang)
  }

  let genDic = generatedDice.map((x,i)=>
      <Die
      isHeld={x.isHeld}
      key={x.id}
      value={x.value}
      hold={()=>hold(x.id)}
      />
  )



  return (
    <>
    {gameWon? <Confetti
      width={width}
      height={height}
    /> : null}
    <div aria-live="polite" className="sr-only">
                {catala? gameWon && <p>Enhorabona! Has guanyat! Prem 'Nova Partida' per començar de nou.</p> : gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p> }
            </div>
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">{catala?'Tira fins que tots els daus siguin iguals. Fes clic a cada dau per congelar-lo al seu valor actual entre les tirades.':'Roll until all dice are the same. Click each die to freeze it at its current value between rolls.'}</p>
        <button className="langChange" onClick={changeLang}>{catala?'Play in English':'Juga en català'}</button>
        <div className="diceContainer">
          {genDic}       
        </div>
        <span>{catala?'Comptador de tirades':'Roll Counter'} : {rollCount}</span>
        <button ref={buttonFocus} className="rollDice" onClick={reRoll}>{catala?gameWon? 'Nova Partida':'Tira' :gameWon? 'NEW GAME' : 'ROLL'}</button>
      </main>
    </>
  )
}

export default App
