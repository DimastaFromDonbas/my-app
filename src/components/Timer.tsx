import React, { FC, useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
    swapPlayer: () => void;
}

function Timer({currentPlayer , restart, swapPlayer}:TimerProps)  {

    const [blackTime, setBlacktime] = useState(60)
    const [whiteTime, setWhitetime] = useState(60)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    },[currentPlayer])

    function startTimer(){
        if(timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.BLACK ? restartDecrementTimerBlack : restartDecrementTimerWhite
        timer.current = setInterval(callback, 1000)
    }

    function restartDecrementTimerBlack(){
        decrimentWhiteTimer()
        setBlacktime(60)
    }

    function restartDecrementTimerWhite(){
        decrimentBlackTimer()
        setWhitetime(60)
    }

    function decrimentBlackTimer(){
        setBlacktime(prev => {
            if(prev - 1 < 1) {
                swapPlayer()
            }
            return prev - 1 
        } )

    }

    function decrimentWhiteTimer(){
        setWhitetime(prev => {
            if(prev - 1 < 1) {
                swapPlayer()
            }
            return prev - 1
        })
       
    }

    const handleRestart = () => {
        setBlacktime(60)
        setWhitetime(60)
        restart()
    }

    return (
        <div>
            <div>
            <button onClick = {handleRestart}>Restart game</button>
            </div>
            <h2>Белые - {blackTime}</h2>
            <h2>Черные - {whiteTime}</h2>
        </div>
    )
}

export default Timer