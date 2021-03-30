import './App.css'
import React from 'react'
import Creator from './Creator'
import Trackers from './Trackers'
import { connect } from 'react-redux'
import { addTimer, stepTimer, saveStateToStorageThunkCreator, getStateFromStorageThunkCreator, deleteTimer, setRunning } from './redux/tracker-reducer'

function App (props) {
  return (
    <div className="App">

      <Creator {...props} />
      <Trackers {...props} />

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    timers: state.timers,
    numberOfTimers: state.numberOfTimers
  }
}

const AppWrapper = connect(mapStateToProps, {
  addTimer,
  stepTimer,
  saveState: saveStateToStorageThunkCreator,
  restoreState: getStateFromStorageThunkCreator,
  deleteTimer,
  setRun: setRunning
})(App)

export default AppWrapper
