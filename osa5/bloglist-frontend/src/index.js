import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notiReducer from './Reducers/notiReducer'
import blogReducer, {appendBlog} from './Reducers/blogReducer'
import App from './App'
import blogService from './services/blogs'
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"

import About from './components/About'
import UserComp from './components/UserComp'
import NavigationBar from './components/NavBar'
import InvidualUser from './components/invidualUser'

const store = configureStore({
    reducer: {
      error: notiReducer,
      blogs: blogReducer
    }
  })

blogService.getAll().then(blogs => blogs.forEach(blog => {store.dispatch((appendBlog(blog)))}))

ReactDOM.createRoot(document.getElementById('root')).render(

<Router>
<Provider store={store}>
<div><NavigationBar /></div>
    <Routes >
        <Route exact path="/" element={<App />} />
        <Route exact path="/users" element={<UserComp />} />
            <Route path="/users/:id" element={<InvidualUser />} />
        <Route exact path="/blogs" element={<About />} />
        
    </Routes>

</Provider>
</Router>

)