import React, {useState, useEffect} from 'react'
import TrackerItem from './TrackerItem/TrackerItem'



const Trackers = (props) => {
 
    React.useEffect(() => {
        //debugger
    }, [props.timers])

    const listGenerator = () => {

        const list = props.timers.map((el, index) => <TrackerItem 
        key = {el.id}
        index = {index}
        id = {el.id}
        name = {el.name}
        running = {el.running}
        savedTime = {el.savedTime}
        simpleTimer = {el.simpleTimer}
        stepTimer = {props.stepTimer}
        saveState = {props.saveState}
        deleteTimer = {props.deleteTimer}
        setRun = {props.setRun}
        
     />)


        const reversedList = list.slice(0).reverse()
        
        return reversedList
    }


    return (
        <div>
           {listGenerator()}
        </div>
    )
}


export  default Trackers