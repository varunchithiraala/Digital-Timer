// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onIncrementTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onDecrementTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  renderTimerLimitControlSection = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-control-section-container">
        <p className="timer-limit-label">Set Timer limit</p>
        <div className="timer-limit-control-section">
          <button
            className="timer-limit-button"
            onClick={this.onDecrementTimerLimitInMinutes}
            disabled={isButtonDisabled}
            type="button"
          >
            -
          </button>
          <div className="timer-limit-value-container">
            <p className="timer-limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="timer-limit-button"
            onClick={this.onIncrementTimerLimitInMinutes}
            disabled={isButtonDisabled}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onIncrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onClickStartOrPauseButton = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.onIncrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  onClickResetButton = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  renderTimerControlSection = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-control-section">
        <button
          className="timer-control-button"
          onClick={this.onClickStartOrPauseButton}
          type="button"
        >
          <img
            className="timer-control-icon"
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
          />
          <p className="timer-control-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-control-button"
          onClick={this.onClickResetButton}
          type="button"
        >
          <img
            className="timer-control-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
          <p className="timer-control-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="digital-timer-app-container">
        <h1 className="digital-timer-heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="digital-timer-display-section">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time-heading">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="elapsed-timer-state">{labelText}</p>
            </div>
          </div>
          <div className="digital-timer-controls-section">
            {this.renderTimerControlSection()}
            {this.renderTimerLimitControlSection()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
