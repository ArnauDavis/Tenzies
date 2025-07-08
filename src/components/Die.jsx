


function Die(props){
   
    return(
        <button className={props.isHeld? 'held' : ''} onClick={props.hold} 
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}>
          {props.value}
        </button>
    )
}

export default Die