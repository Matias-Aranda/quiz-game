import React from "react"

export default function Start(props){
    
    return(
        <div className="start-container">
            <img src="/yellow-blob.svg" className="menu-yellow-blob"/>
            <h1 className="title">Quizzical</h1>
            <button onClick={props.play} className="start-btn">Start quiz</button>
            <img src="blue-blob.svg" className="menu-blue-blob"/>
        </div>
    )
}