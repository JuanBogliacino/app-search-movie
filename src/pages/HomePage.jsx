import { useEffect, useState, useRef, useCallback } from "react"
import { useMovies } from "../hooks/useMovies"
import debounce from "just-debounce-it"
import { Movies } from "../components/Movies"

function useSearch () {
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)
  
    useEffect(() => {
      if (isFirstInput.current) {
        isFirstInput.current = search == ''
        return
      }
  
      if (search == '') {
        setError('No se puede buscar una pelicula vacia')
        return
      }
      
      if (search.length < 3) {
        setError('La busqueda debe tener al menos 3 caracteres')
        return
      }
      setError(null)
    }, [search])
  
    return { search, setSearch, error }
  }

const HomePage = () => {
  const [sort, setSort] = useState(false)

  const { search,  setSearch, error} = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleChange = (e) => {
    const newSearch = e.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <>
     <form className='form'  onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={search} placeholder="search movie..." required/>
        <div className="div-checkbox">
         <label>order</label>
         <input type="checkbox" onChange={handleSort} checked={sort} />
        </div>
    </form>
    {error && <p className="error">{error}*</p>}

    {loading ? <p className="loading">Cargando...</p> : <Movies movies={movies}/>}
    </>
  )
}

export default HomePage