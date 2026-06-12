import { useNavigate } from "react-router-dom";
import '../Styles/HomePage.css'

function HomePage() {
  let navigate = useNavigate();
  
  return (
    <>
      <title>DnD Builder</title>
      <div className='HomePageHero'>
        <h1 className='HomePageTitle'>DnD Builder</h1>
        <p className='HomePageSubtitle'>A toolkit for Dungeon Masters. Generate encounters and discover loot for your next session.</p>
      </div>
      <div className='HomePageMainContainer'>
        <div className='HomePageCard'>
          <h2 className='HomePageCardTitle'>Encounter Builder</h2>
          <div className='HomePageDivider'></div>
          <p className='HomePageCardDesc'>Select a challenge rating and how many monsters you want to face. Get a randomized selection of creatures pulled straight from the SRD, complete with stats and images.</p>
          <p className='HomePageCardHint'>Pick a CR, browse monsters, view full stat block</p>
          <button className='HomePageCardButton' onClick={() => navigate('/EncounterSearch')}>Build an Encounter</button>
        </div>
        <div className='HomePageCard'>
          <h2 className='HomePageCardTitle'>Loot Generator</h2>
          <div className='HomePageDivider'></div>
          <p className='HomePageCardDesc'>Choose from weapons, armor, or magic items and how many you want to see. Get a randomized haul of gear to reward your players or stock a merchant's inventory.</p>
          <p className='HomePageCardHint'>Pick a category, set amount, view item details</p>
          <button className='HomePageCardButton' onClick={() => navigate('/ItemSearch')}>Generate Loot</button>
        </div>
      </div>
    </>
  )
}

export default HomePage;