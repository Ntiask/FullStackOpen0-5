import { useState, useImperativeHandle, forwardRef } from 'react'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button id="Createablogentry" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button id="cancel" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

export default Togglable