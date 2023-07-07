import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MovieContext } from "../context/MovieContext";

const MovieDetail = () => {
  const { id } = useParams()
  const { getMovieById } = useContext(MovieContext)

  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState({})

  const getMovieDetail = async (id) => {
    const data = await getMovieById(id)
    setMovie(data)
    setLoading(false)
  }

  useEffect(() => {
    getMovieDetail(id)
  }, [])

  return (
    <>
    {
      loading
      ? <h1 className="loading">Loading...</h1>
      : (
       movie
       ?
       <div className="movie-detail" key={movie.id}>
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        <img src={movie.image} alt={movie.title} />
       </div>
       : 
       <div className="not-found-detail">
        <h1>No movie detail found. </h1>
        <Link to="/" className='link'>
        <h1>come back home</h1>
        </Link>
       </div>
      )
    }
    </>
  )
}

export default MovieDetail