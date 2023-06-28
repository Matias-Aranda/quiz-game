import React from "react"
import {nanoid} from "nanoid"
import { v4 as uuidv4 } from 'uuid'
import {decode} from 'html-entities';

export default function Quiz(props){
    
    const [questionsArr, setQuestionsArr] = React.useState([])
    
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    React.useEffect(() => {
        let data = props.questions.map((question, index) => {
            let answers = [...question.incorrect_answers, question.correct_answer]
            answers = shuffleArray(answers)
            return (
                {
                    questionId: `question${index + 1}`,
                    question: question.question,
                    answers: answers,
                    correctAnswer: question.correct_answer,
                    selectedAnswer: ""
                }
            )
        })
        setQuestionsArr(data)
    },[props.questions])
    
    let questions = []
    let correctCount = 0
    if(!props.revealed){
        questions = questionsArr.map((question, index) => {
            let answerElements = question.answers.map((answer,index) =>{
                const id = `${question.questionId}answer${index + 1}` 
                return(
                    <div key={nanoid()} className="answer radio-button">
                        <input onChange={handleChange} value={answer} type="radio" name={question.questionId} id={id}/> 
                        <label className={answer === question.selectedAnswer ? "selected" : ""} htmlFor={id}>{decode(answer,"all")}</label>
                    </div>
                )
            })
            return(
                <div key={nanoid()} className="question">
                    <h4>{decode(question.question,"all")}</h4>
                    <div className="answers-container">
                        {answerElements}
                    </div>
                </div>
            )
        })  
    } else {
       questions = questionsArr.map(question => {
            let answerElements = question.answers.map(answer =>{
                if(answer == question.correctAnswer){
                    if(answer == question.selectedAnswer){
                        correctCount++
                    }
                    return <div className="correct"><p>{decode(answer,"all")}</p></div>
                } else {
                    if(answer == question.selectedAnswer){
                        return <div className="incorrect"><p>{decode(answer,"all")}</p></div>
                    } else {
                        return <div className="revealed-answer"><p>{decode(answer,"all")}</p></div>
                    }
                }
            })
            return(
                <div className="question">
                    <h4>{decode(question.question,"all")}</h4>
                    <div className="answers-container">
                        {answerElements}
                    </div>
                </div>
            )
        })   
    }
    
    function handleChange(event){
        setQuestionsArr(prevArr => prevArr.map(item => {
            if(item.answers.indexOf(event.target.value) != -1 && item.questionId === event.target.name){ //comprobar que se modifica unicamente la respuesta actual
                return(
                    {
                        ...item,
                        selectedAnswer: event.target.value
                    }
                )
            } else {
                return item
            }
        }))
    }
    
    return(
        <div className="quiz">
            <img src="./src/assets/yellow-blob.svg" className="game-yellow-blob"/>
            {questions}
            <div>
                {props.revealed && <h4 className="score">You scored {correctCount}/{questionsArr.length} correct answers</h4>}
                {props.revealed && <button className="play-again-btn" onClick={props.playAgain}>Play again</button>}
            </div>
            <img src="./src/assets/blue-blob.svg" className="game-blue-blob"/>
        </div>
    )
}