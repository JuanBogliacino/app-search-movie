import './App.css'
import AppRouter from './AppRouter'
import { MovieProvider } from './context/MovieProvider'

function App() {

  return (
    <MovieProvider>
      <AppRouter />
    </MovieProvider>
  )
}

export default App
