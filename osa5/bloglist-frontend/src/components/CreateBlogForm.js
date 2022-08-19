import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import {createBlog} from "../Reducers/blogReducer";
import { useDispatch } from "react-redux";

const CreateBlogForm = (props) =>{
    const dispatch = useDispatch()
    const [blogTitle, setblogTitle] = useState('')
    const [blogUrl, setblogUrl] = useState('')
    const [blogAuthor, setblogAuthor] = useState('')

    const handleBlogEntry = async (event) =>{
        event.preventDefault()
        const blogObject = 
        {
          title: blogTitle,
          author: blogAuthor,
          url: blogUrl
        }
        try{
        setblogTitle('')
        setblogUrl('')
        setblogAuthor('')
        props.blogFormRef.current.toggleVisibility()
        dispatch(createBlog(blogObject))  // <-- TOIMII NIMELLISESTI?  jatka tästä.  reducer ja blogservicessä mättää joku
        props.setErrorMessage('Blog Created')
        //window.location.reload(false)
        setTimeout(() => {
          props.setErrorMessage('')
          }, 3000)
    
      } catch (exception) {
        props.setErrorMessage('Could not create a Blog')
        setTimeout(() => {
          props.setErrorMessage('')
          }, 3000)
      }
    
      }

    return (
      <Form onSubmit={handleBlogEntry}>
      <h2>Create a Blog entry</h2>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control id="title" type="text" placeholder="Enter Title" onChange={({target})=> setblogTitle(target.value)} value={props.blogTitle}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Url</Form.Label>
          <Form.Control id="Url" type="text" placeholder="www.example.com" onChange={({target})=> setblogUrl(target.value)} value={props.blogUrl}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control id="Author" type="text" placeholder="Alison Kent" onChange={({target})=> setblogAuthor(target.value)} value={props.blogAuthor}/>
        </Form.Group>
        <Button id="Submit" variant="primary" type="submit">
          Submit
        </Button>
        <p></p>
        {props.error === '' ? <p></p>: props.error === 'Blog Created' ? <Alert key='error2' variant='success'>{props.error}</Alert> : <Alert key='error2' variant='danger'>{props.error}</Alert>}
      </Form>
    )};

export default CreateBlogForm