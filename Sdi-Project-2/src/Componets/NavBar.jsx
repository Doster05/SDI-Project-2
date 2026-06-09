import { useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css'

function NavBar() {
    let navigate = useNavigate()

    return(
        <nav>
            <div className='NavContainer'>
                <h2 className='HomeRoute' onClick={() => navigate('/')}>HomePage</h2>
            </div>
        </nav>
    )
}

export default NavBar;