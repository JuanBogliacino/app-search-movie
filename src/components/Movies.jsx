import { Link } from "react-router-dom"

function ListMovies ({ movies }) {
    return (
        <ul className="movies">
            {
              movies.map(movie => (
                 <li className="movie" key={movie.id}>
                  <div>
                  <h3>{movie.title}</h3>
                  <p>{movie.year}</p>
                  </div>
                  <Link to={`/movies/${movie.id}`}>
                  <img src={movie.image} alt={movie.title} />
                  </Link>
                </li>
              ))
            }
        </ul>
      )
}

function NoMoviesResult () {
    return (
        <p className="no-results">No se encontraron peliculas</p>
    )
}

export function Movies ({ movies }) {
    const hasMovies = movies?.length > 0

    return hasMovies
    ? <ListMovies movies={movies}/>
    : <NoMoviesResult />
}