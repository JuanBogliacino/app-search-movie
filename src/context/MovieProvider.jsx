import { useState } from "react";
import { MovieContext } from "./MovieContext";

const API_KEY = 'ec40cd1d'

export const MovieProvider = ({children}) => {
    const [movies, setMovies] = useState([])

    const searchMovies = async ({ search }) => {
        if (search == '') return null
    
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()
        const movies = json.Search
      
        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            image: movie.Poster
        }))
    }

    const getMovieById = (id) => {
        const movieFilter = movies.find(movie => id == movie.id)
          return movieFilter
      }  

    return (
        <MovieContext.Provider value={{
            searchMovies,
            movies,
            setMovies,
            getMovieById
        }}>
            {children}
        </MovieContext.Provider>
    )
}