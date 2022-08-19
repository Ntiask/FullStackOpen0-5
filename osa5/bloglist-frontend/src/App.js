import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import loginService from './services/login'
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import BlogToast from './components/Blogtoast';
import Togglable from './components/Togglable';
import CreateBlogForm from './components/CreateBlogForm';
import { setError } from './Reducers/notiReducer';
import { useDispatch, useSelector } from 'react-redux';
import blogReducer, {initializeNotes} from './Reducers/blogReducer';
import NavigationBar from './components/NavBar';

const App = () => {
  const dispatch = useDispatch()
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setErrorMessage] = useState('')
  const blogFormRef = useRef()
  const error1 = useSelector(state => state.error)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeNotes()) 
  }, [dispatch])
  
  const Bloglist = () =>(
    <Container className="p-3">
    <p>You are logged in as {user.name}</p>
    {error1.error === '' ? <p></p>:<Alert key='error1' variant='danger'>{error1.error}</Alert>}
    <Button onClick={() => {window.localStorage.removeItem('loggedBlogUser'); window.location.reload(false) }}>Logout</Button>
    <p></p>
    <p></p>
    <div>
    <Togglable buttonLabel='Create a Blog entry' ref={blogFormRef}>
      <CreateBlogForm 
          error={error} 
          setErrorMessage={setErrorMessage}
          blogFormRef={blogFormRef}
          setblogTitle
      />
    </Togglable>
    </div>
    <p></p>
    <p></p>
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =><BlogToast key={blog._id} blog ={blog}/>)}
    </div>
  </Container>
  )

  const LoginForm = () => (
    <Container className="p-3">
      <h2>Login</h2>
      {error1.error === '' ? <p></p>:<Alert key='error1' variant='danger'>{error1.error}</Alert>}
      <form onSubmit={handleLogin}>
        <div>
        <p>Username</p>
        <input id='username' type='text' value={Username} name='Username' onChange={({target})=> setUsername(target.value)}/>
        </div>
        <div>
        <p>Password</p>
        <input id='password' type='text' value={Password} name='Password' onChange={({target})=> setPassword(target.value)}/>
        <p></p>
        </div>
      <Button id="login-button" type='submit'>Login</Button>
      <p></p>

      </form>
    </Container>
    )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
        const user = await loginService.login(
          {
          Username,Password,
          })
          window.localStorage.setItem(
            'loggedBlogUser', JSON.stringify(user)
          ) 
          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
    } catch (exception) {
      dispatch(setError('Wrong Credentials'))
      setTimeout(() => {
        dispatch(setError(''))
      }, 5000)

    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
  <Container className="p-3">
  {error1.error}
  {user == null ? LoginForm(): Bloglist()}
  </Container>
  )
}

export default App
