import users from "../services/users"
import { useState, useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"

const UserComp = () => {
    const [allusers,setUsers] = useState([])
    
    useEffect(() => {
    users.getAll().then(response => setUsers(response))
    }, [])

    return (
        <div> 
        <h1>Users</h1> 
        {allusers.map(user => {
            let count = 0
            user.blogs.forEach(blog => count +=1)
            return (<LinkContainer to={`/users/${user._id}`}><li key={user._id}>Name: {user.name} <br /> Blogs Created: {count}</li></LinkContainer>)
            })}
        </div>
    )
}

export default UserComp