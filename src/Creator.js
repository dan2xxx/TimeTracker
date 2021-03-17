import React, {useEffect} from 'react'
import { useForm } from "react-hook-form";
import moment from 'moment';



const Creator = (props) => {
 
    const { register, handleSubmit, reset } = useForm();

    const generateID = () => {
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return firstPart + secondPart;
    }
  

    const onSubmit = (data, e) => {
        const newTracker = {
            id: generateID(),
            name: data['tracker-name'] || moment().format(),
            savedTime: moment(),
            running: true,
            simpleTimer: 1
        }
        
        props.addTimer(newTracker)     
        e.target.reset()   
    }

    
    useEffect(() => {
        props.restoreState()
    },[])
   
   
   
    return (
        <div>
            <h1>tracker</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input name="tracker-name"  ref={register} placeholder='Enter tracker name' />
                <input type="submit" />

            </form>
            

        </div>
    )
}


export default Creator