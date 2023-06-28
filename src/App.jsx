import React from "react"
import Start from "./Start"
import Quiz from "./Quiz"

export default function App(){
    const [questions, setQuestions] = React.useState([])
    const [revealed, setRevealed] = React.useState(false)
    const [playcount, setPlaycount] = React.useState(0)
    const [playing, setPlaying] = React.useState(false)
    
    React.useEffect(() => {  
        setRevealed(false)
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {       
                setQuestions(data.results.map(result => result))
            })
    },[playcount])
    
    function play(){
        setPlaying(true)
    }
    
    function reveal(){
        setRevealed(prevState => !prevState)
    }
    
    function playAgain(){
        setQuestions([])
        setPlaycount(prevCount => prevCount += 1)
    }
    
    let hasArrived = questions[0]? true: false
    
    return(
        <main>
            {!playing && <Start play={play}/>}
            {playing && <Quiz questions={questions} revealed={revealed} playAgain={playAgain}/>}
            {playing && hasArrived && !revealed && <button className="check-btn" onClick={reveal}>Check answers</button>}
            
        </main>
    )
}