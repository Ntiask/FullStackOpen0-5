import Note from './components/note';
import './App.css';
import {useState, useEffect} from 'react'
import noteService from './services/notes'

const App = () => {
      const[notes, setNotes] = useState([])
      const [newNote, setNewNote] = useState(
        'a new note...'
      )
      const[showAll, setShowAll] = useState(true)

      useEffect(() => {
        noteService
          .getAll()
          .then(initialNotes => {
            setNotes(initialNotes)
          })
      }, [])

      const notesToShow = showAll
      ? notes   //jos tilan arvo showAll on epätosi, muuttuja notesToShow saa arvokseen vain ne muistiinpanot, joiden important-kentän arvo on tosi. Filtteröinti tapahtuu taulukon metodilla filter:
      :notes.filter(note=>note.important)

      const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
          content: newNote,
          date: new Date().toISOString(),
          important: Math.random() > 0.5,
        }
        noteService.create(noteObject)
        noteService.getAll().then(returned => setNotes(returned))
  }

      const handleNoteChange = (event) => {
        setNewNote(event.target.value)
      }


      const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }
        console.log('ajettu')
        noteService
          .update(id, changedNote).then(returnedNote => {
            setNotes(notes.map(note => note.id !== id ? note : returnedNote))
          })
          .catch(error => {
            setNotes(notes.filter(n => n.id !== id))
          })
      }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        <ul>{notesToShow.map(note => <Note  key={note.id} note = {note} toggleImportance={()=>toggleImportanceOf(note.id)} />)}</ul>
      </ul>
      <form onSubmit={addNote}>
        <input value = {newNote} onChange={handleNoteChange} onClick={()=>setNewNote('')}/>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default App

