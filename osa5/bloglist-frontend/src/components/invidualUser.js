
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import users from "../services/users"

const InvidualUser = () =>{
    const [user , setUser] = useState(null)
    const id = useParams().id
        
    useEffect(() => {
        users.getbyID(id).then(response => setUser(response))
    })

    return (
    <div>
    {user !== null ? <h1>{user.name}</h1> : ''}
    {user !== null ? user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>): 'no User loaded'}
    </div>
    )
}

export default InvidualUser