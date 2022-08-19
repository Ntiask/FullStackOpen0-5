import './App.css';
import { useState } from 'react'

const Statistics = ({good, bad, neutral}) => {
      let all = good+bad+neutral
      let positive = good/all*100
      let avg =  all/3

    if (all > 0) {
    return (
      <div>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>All {all}</p>
        <p>Average {avg}</p>
        <p>Positive {positive}%</p>
      </div>
    )
  } else {
    return 'No feedback given'
  }
}

const StatisticLine = ({text, value, text2}) => <p>{text} {value} {text2}</p>

const GoodButton= ({x,y}) => <button onClick={() => y(x+1) }>Good</button>
const NeutralButton= ({x,y}) => <button onClick={() => y(x+1) }>Neutral</button>
const BadButton= ({x,y}) => <button onClick={() => y(x+1) }>Bad</button>

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good+bad+neutral
  let positive = good/all*100
  let avg =  all/3

  let layoutActive = (
    <div>
      <table>
        <tbody>
        <tr><td><h1>Give Feedback</h1></td></tr>
        <tr>
        <td>
        <GoodButton x={good} y={setGood} />
        <NeutralButton x={neutral} y={setNeutral}/>
        <BadButton x={bad} y={setBad} />
        </td>
        </tr>
        <tr><td><h1>Statistics</h1></td></tr>
        <tr><td><StatisticLine text = 'Good' value={good}/></td></tr>
        <tr><td><StatisticLine text = 'Geutral' value={neutral}/></td></tr>
        <tr><td><StatisticLine text = 'Average' value={avg}/></td></tr>
        <tr><td><StatisticLine text = 'Bad' value={bad}/></td></tr>
        <tr><td><StatisticLine text = 'All' value={all}/></td></tr>
        <tr><td><StatisticLine text = 'Positive' value={positive} text2='%'/></td></tr>
      </tbody>
      </table>
    </div>
)

  let layoutPassive = (
    <div>
      <h1>Give Feedback</h1>
      <table>
        <tbody>
        <tr><td><GoodButton x={good} y={setGood} /><NeutralButton x={neutral} y={setNeutral}/><BadButton x={bad} y={setBad} /></td></tr>
        <tr><td><h1>Statistics</h1></td></tr>
        <tr><td>No feedback given</td></tr>
        </tbody>
      </table>
    </div>
  )

  if (all > 0) {
    return layoutActive
  } 
  else {
    return layoutPassive
  }

}

export default App;
