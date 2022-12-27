import {  useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
    swapPlayer: () => void;
}

function Timer({currentPlayer , restart, swapPlayer}:TimerProps)  {

    const [blackTime, setBlacktime] = useState(120)
    const [whiteTime, setWhitetime] = useState(120)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        // eslint-disable-next-line
        startTimer() // eslint-disable-next-line
        // eslint-disable-next-line
    },[currentPlayer]) // eslint-disable-next-line

    function startTimer(){
        if(timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.BLACK ? restartDecrementTimerBlack : restartDecrementTimerWhite
        timer.current = setInterval(callback, 1000)
    }

    function restartDecrementTimerBlack(){
        decrimentWhiteTimer()
        setBlacktime(120)
    }

    function restartDecrementTimerWhite(){
        decrimentBlackTimer()
        setWhitetime(120)
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
        setBlacktime(120)
        setWhitetime(120)
        restart()
    }

    return (
        <div className="flex">
            <div className="flex-button">
            <button onClick = {handleRestart}>Restart game</button>
            </div>
            <h2 className="time-flex-wh">Белые - {blackTime}</h2>
            <h2 className="time-flex-wh">Черные - {whiteTime}</h2>
        </div>
    )
}

export default Timer