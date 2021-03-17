import moment from 'moment';

const initalState = {
    
    timers: []

    
}

const trackerReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'ADD-TIMER':
            return ({
                ...state,
                timers: [...state.timers, action.timer]
            })

        case 'STEP':
            
            {
            let newObj = state.timers.filter((el) => {
                if (el.id === action.id) {
                    return el
                }
            })  
            
            let currentTimerObj = newObj[0]
            

            if (currentTimerObj) {
                const savedTime = moment()
                const simpleTimer = currentTimerObj.simpleTimer + 1
                const nextCurrentTimerObj = {
                    ...currentTimerObj,
                    savedTime,
                    simpleTimer
                }
    
                const newTimers = state.timers.map((el) => {
                    if (el.id == action.id) {
                        return nextCurrentTimerObj
                    } else {
                        return el
                    }
                })

                return ({
                    ...state,
                    timers: newTimers
                })

                
            }

            return ({
                ...state
            })
            
        
        }


        case 'RESTORE':
            {
                const newTimers = action.newState.timers.map((el) => {
                    const difference =  moment().diff(el.savedTime, 'seconds')
                    el.simpleTimer += difference
                    return el
                })

                //debugger    


                return ({
                    ...state,
                    timers: newTimers
                })
            }
    



            


        case 'DELETE': 
            {
                
            const newTimers = state.timers.filter((el) => {
                if (el.id !== action.id) {
                    return el
                }
            })

                       
            return ({
                ...state,
                timers: newTimers
                
            })
        }


        case 'SET-RUN':
            {
                const newTimers = state.timers.map((el) => {
                    if (el.id === action.id) {
                        el.running = action.bool
                        return el
                    } else {
                        return el
                    }
                })

                return ({
                    ...state,
                    timers: newTimers
                })


            }



      

        default:
            return state
    }

}


export const addTimer = (timer) => ({type: 'ADD-TIMER', timer})
export const stepTimer = (id) => ({type: 'STEP', id})
export const restoreState = (newState) => ({type: 'RESTORE', newState})
export const deleteTimer = (id) => ({type: 'DELETE', id})
export const setRunning = (bool, id) => ({type: 'SET-RUN', bool, id})




export const saveStateToStorageThunkCreator = () => {
    console.log('State saved')
    return (dispatch, getState) => {
        
       (window.localStorage.setItem('state', JSON.stringify(getState())))
      
    }
}

export const getStateFromStorageThunkCreator = () => {

    console.log('State restored')    
    return ((dispatch) => {
        
        const restoredState = JSON.parse(window.localStorage.getItem('state'))

        

        
        if (!restoredState) {
            dispatch(restoreState(initalState))
        } else {
            dispatch(restoreState(restoredState))
        }
        
        
     
    })
}






export default trackerReducer





