import { useCallback, useState, useRef, useMemo, useContext } from "react";
import { MovieContext } from "../context/MovieContext";

export function useMovies ({ search, sort }) {
    const { searchMovies, movies, setMovies } = useContext(MovieContext)
    const [loading, setLoading] = useState(false)
    const previusSearch = useRef(search)

    const getMovies = useCallback(async ({ search }) => {
        if (search == previusSearch.current) return

        setLoading(true)
        previusSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
        setLoading(false)
    }, [])

    const sortedMovies = useMemo(() => {
        if (sort && movies) {
          return [...movies].sort((a, b) => a.title.localeCompare(b.title))
        } 
        return movies
      }, [sort, movies])

    return { movies: sortedMovies, getMovies, loading }
}
