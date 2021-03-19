import React, {useEffect} from 'react'
import playIcon from './../svg/play_arrow-24px.svg'
import pauseIcon from './../svg/pause-24px.svg'
import removeIcon from './../svg/remove_circle_outline-24px.svg'
import './TrackerItem.css'

const TrackerItem = (props) => {
 
    const remove = () => {
        props.deleteTimer(props.id)
       
    }

    const stop = () => {
        props.setRun(false, props.id)
    }

    const start = () => {
        props.setRun(true, props.id)
        
    }



    const timerEngine = () => {
        //debugger
        props.stepTimer(props.id)
        props.saveState()
    }

    
    useEffect(() => {
        
        if (props.running) {
            const interval = setTimeout(() => timerEngine(), 1000)
        }
                
                 
    }, [props.running, props.simpleTimer])


    const display = () => {

        const seconds = props.simpleTimer

        let display = {
            hh : 0,
            mm : 0,
            ss : 0
        }

        if (seconds > 0) {
            if (seconds < 60) {
                display.ss = seconds
            } else if (seconds % 60 === 0) {
                 display.mm = seconds / 60 
            } else {
                display.mm = parseInt(seconds/60)
                display.ss = seconds % 60
            }
        }

        if (display.mm > 59) {
            if (display.mm % 60 === 0) {
                display.hh = display.mm /60
                display.mm = 0
            } else {
                display.hh = parseInt(display.mm/60)
                display.mm = display.mm % 60
            }
        }

        const output = 
        <>
        {display.hh < 1 ? '00' : display.hh < 10 ? '0' + display.hh : display.hh}
        :{display.mm < 1 ? '00' : display.mm < 10 ? '0' + display.mm : display.mm}
        :{display.ss < 10 ? '0' + display.ss : display.ss}
        </>





        return output
    }

    const displayStyleSwitcher = () => {
        if (props.running) {
            return 'timer active'
        } else {
            return 'timer paused'
        }
    } 


    return (
        <div className='item-contaner'>
            
            <div className='tracker-name'>{props.name}</div>
            
            <div className={displayStyleSwitcher()}>{display()}</div>
            
            <div className='buttons'>
            {props.running ? <button onClick={() => {stop()}}><img src={pauseIcon}></img></button> : <button onClick={() => {start()}}><img src={playIcon}></img></button>}
            <button onClick={() => {remove()}}><img src={removeIcon}></img></button>
            </div>
            
            
        </div>
    )
}


export default TrackerItem