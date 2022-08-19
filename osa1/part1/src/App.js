import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [value, setValue] = useState(10)


  return (
    <div>
      {value}
      <button onClick={() => setValue(0)}>Reset</button>
    </div>
  )
}

export default App