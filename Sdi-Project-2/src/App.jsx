import {Routes, Route} from 'react-router-dom'
import NavBar from './Componets/NavBar.jsx'
import HomePage from './Pages/HomePage.jsx'
import ErrorPage from './Pages/ErrorPage.jsx'
import EncounterPage from './Pages/EncounterPage.jsx'
import EncounterResult from './Pages/EncounterResult.jsx'
import ItemPage from './Pages/ItemPage.jsx'
import ItemResult from './Pages/ItemResult.jsx'
import SelectedEncounter from './Pages/SelectedEncounter.jsx'
import SelectedItem from './Pages/SelectedItem.jsx'


function App() {
  
  return (
    <>

      <div className='NavBarContainer'>
        <NavBar />
        
        <Routes>
          
          <Route path='/' element={<HomePage />}/>
          <Route path='/EncounterSearch' element={<EncounterPage />} />
          <Route path='/ItemSearch' element={<ItemPage />} />
          
          <Route path='/ItemResult/:itemType/:itemAmount' element={<ItemResult />} />
          <Route path='/EncounterResult/:encounterCR/:encounterAmount' element={<EncounterResult />} />
    
          <Route path='/SelectedEncounter/:encounterID' element={<SelectedEncounter />}/>
          <Route path='/SelectedItem/:itemID/:itemType' element={<SelectedItem />}/>
    
          <Route path='*' element={<ErrorPage />}/>
        
        </Routes>
      
      </div>
    </>
  )
}

export default App
