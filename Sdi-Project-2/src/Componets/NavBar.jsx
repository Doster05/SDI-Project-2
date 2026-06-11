import { useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css'

function NavBar() {
    let navigate = useNavigate()

    return(
        <nav>
            <div className='NavContainer'>
                <h3 className='HomeRoute' onClick={() => navigate('/')}>DnD Builder</h3>
                <h3 className='EncounterRoute' onClick={() => navigate('/EncounterSearch')}>Encounter Builder</h3>
                <h3 className='EquipmentRoute' onClick={() => navigate('/ItemSearch')}>Equipment Finder</h3>
            </div>
        </nav>
    )
}

export default NavBar;