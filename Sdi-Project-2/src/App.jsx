import {Routes, Route} from 'react-router-dom'
import NavBar from './Componets/NavBar.jsx'
import HomePage from './Pages/HomePage.jsx'
import ErrorPage from './Pages/ErrorPage.jsx'
import DevPage from './Pages/DevPage.jsx'

function App() {
  
  return (
    <>

      <div className='NavBarContainer'>
        <NavBar />
      </div>

      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/Dev' element={<DevPage />}/>
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    </>
  )
}

export default App
