import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import notiReducer from '../reducers/notiReducer'


const Notification = (props) => {
  console.log('Seconds',props.seconds)
  console.log('note',props.notification)
  //const notification = useSelector(state => state.notiReducer)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 4
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notiReducer.Notification,
    seconds: state.notiReducer.seconds,
  }
}


const ConnectedAnecdotes = connect(mapStateToProps)(Notification)
export default ConnectedAnecdotes
