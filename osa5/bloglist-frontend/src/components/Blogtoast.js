import { useState } from 'react'
import {Toast, Button} from 'react-bootstrap';
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux';
import { setError } from '../Reducers/notiReducer';
import { deleteBlog, likeBlog } from '../Reducers/blogReducer';

const BlogToast = (props) => {
    const dispatch = useDispatch()
    const [showBody, toggleShowBody] = useState(false);
    const [likes, addLikes] = useState(props.blog.likes)

    const like = async () => {
        addLikes(likes+1)
        const newObject = 
        {
            likes: likes
        }
        dispatch(likeBlog(props.blog._id, newObject))
    }

    const deleteBlogbutton = async () => {
      if (window.confirm(`Are you sure you want to delete ${props.blog.title}`)) {
      dispatch(deleteBlog(props.blog._id))
      dispatch(setError(`${props.blog._id} 'Deleted!'`))
      setTimeout(() => {
        dispatch(setError(''))
      }, 5000)
      }
    }

    return (
      <Toast onClose={() => {deleteBlogbutton()}}>
        <Toast.Header style={{ display: "flex" }}>
          <h4>{props.blog.title+'\n'+props.blog.author}</h4>
            <Button id ="viewBlog" style={{ marginLeft: "auto" }} onClick={() => toggleShowBody(!showBody)}>View</Button>

        </Toast.Header>
        <Toast.Body>
        <Toast show={showBody}>
        <p style={{textAlign: "center"}}>Author: {props.blog.author}</p> 
        <p style={{textAlign: "center"}}>{props.blog.url}</p>
        <p id = "likePara" style={{textAlign: "center"}}>Likes: {likes} <button id ='Like' onClick={()=>like()}>like</button></p> 
        </Toast>
        </Toast.Body>
      </Toast>
    );
  };

export default BlogToast