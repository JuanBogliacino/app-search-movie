import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MovieDetail from './pages/MovieDetail'

const AppRouter = () => {
  return (
    <>
     <Link to='/' className="link-home"><h1>Search Movie App</h1></Link>

     <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/movies/:id' element={<MovieDetail />} />
     </Routes>
    </>
  )
}

export default AppRouter