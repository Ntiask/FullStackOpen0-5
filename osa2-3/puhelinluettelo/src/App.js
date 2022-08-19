import { useState, useEffect } from 'react'
import noteService from './services/update'
import './App.css'

const Delete = ({person,personstoShow, setPersons, setErrorMessage, setPersonstoShow}) => {return <button onClick={() =>{
  if (window.confirm('Are you Sure?')) {
  noteService.adelete(person.id).then(results => noteService.getAll().then(initialNotes => {
    setPersons(initialNotes);
    setPersonstoShow(initialNotes)
    }))
    .catch(error => {
    console.log(error)
    setErrorMessage(
      `${person.name} allready deleted from the server`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  })
  setErrorMessage(
    `${person.name} deleted!`)
  setTimeout(() => {
    setErrorMessage(null)
  }, 5000)
}
}}>Delete</button>
}

const ShowNumbers = ({personstoShow, setPersons, setErrorMessage, setPersonstoShow}) => {
  const personlist = personstoShow.map(person => <p key={person.name.length+Math.random(4525)}>{person.name} {person.number} <Delete 
  person ={person}
  setPersons={setPersons}
  setErrorMessage = {setErrorMessage}
  setPersonstoShow={setPersonstoShow} /></p>)
  return personlist
}
const Inputs = ({name, newName, onChange, onClick}) => <p>{name}: <input value = {newName} onChange={onChange} onClick={onClick}/></p>
const Filters = ({filter ,onChange, onClick}) => <p>filter shown with<input value ={filter} onChange={onChange} onClick={onClick}/></p>

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [personstoShow, setPersonstoShow] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  
  useEffect(() => {noteService.getAll().then(initialNotes => {setPersonstoShow(initialNotes)
  setPersons(initialNotes)})}, [])

  const addName = (event) => {
  event.preventDefault()
  let found = persons.find(person => person.name === newName)
  if (found === undefined) {
    const noteObject = {
        name: newName,
        number: newNumber,
    }
    setPersons(persons.concat(noteObject))
    setErrorMessage(
      `added ${newName}, ${newNumber}`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setNewName('')
    setNewNumber('')
    noteService.create(noteObject).catch(error =>{setErrorMessage(
      `error occurred ${error}: Validation failed: min characters required on name 2 and Number needs to be format 050-5995008 or 12-34567890`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  })
    noteService.getAll().then(initialNotes => {setPersons(initialNotes)
    setPersonstoShow(initialNotes)})
  } else {

    if (window.confirm(`${newName} is allready added to phonebook, replace the old number with new one?`)){
      const newObject = {
        name: found.name,
        number: newNumber,
      }
      noteService.update(found.id, newObject).catch(error => {
        console.log(error)
        setErrorMessage(
          `${found.id} allready deleted from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        noteService.getAll().then(initialNotes => {setPersons(initialNotes)})
      })

      setErrorMessage(
        `changed ${found.id} number to ${newNumber}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      noteService.getAll().then(initialNotes => {setPersons(initialNotes)})
      setNewName('')
      setNewNumber('')
      setPersonstoShow(persons)
    }
  }
}

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNoteClick = (event) => {
    setNewName('')
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNumberClick = (event) => {
    setNewNumber('')
  }

  const handleFilter = (event) => {
    if (event.type === 'change'){
      if (event.target.value === ''){
        console.log(noteService.getAll)
        setPersonstoShow(persons)
      } else {
        setPersonstoShow(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
      }
    }
    else if (event.type === 'click'){
      setFilter('')
      setPersonstoShow(persons)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <h2>Filter by name</h2>
      <Filters value ={filter} onChange={handleFilter} onClick={handleFilter}/>
      <h2>Add New</h2>
      <form onSubmit={addName}>
        <div>
          <Inputs name={'Name'} onChange={handleNoteChange} onClick={handleNoteClick} />
          <Inputs name={'Number'} onChange={handleNumberChange} onClick={handleNumberClick} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowNumbers personstoShow = {personstoShow} setPerson={setPersons} setPersonstoShow={setPersonstoShow} setErrorMessage={setErrorMessage}/>
    </div>
  )

}

export default App