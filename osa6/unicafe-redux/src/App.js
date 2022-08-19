
import { useSelector, useDispatch } from 'react-redux'
import reducer from './reducer'

const App = () => {

    const dispatch = useDispatch()

    return (
      <div>
        <button onClick={(e) => dispatch({type: 'GOOD'})}>good</button>
        <button onClick={(e) => dispatch({type: 'OK'})}>ok</button>
        <button onClick={(e) => dispatch({type: 'BAD'})}>bad</button>
        <button onClick={(e) => dispatch({type: 'ZERO'})}>reset stats</button>
        <div>good {useSelector(state => state.good)}</div>
        <div>ok {useSelector(state => state.bad)}</div>
        <div>bad {useSelector(state => state.ok)}</div>
      </div>
    )
  }

export default App