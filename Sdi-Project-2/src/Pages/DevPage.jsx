import { useNavigate } from 'react-router-dom';

function DevPage() {
    let navigate = useNavigate(); 

    return(
        <>
            <div>
                <h1 onClick={() => navigate('/ErrorPage')}>ErrorPage</h1>
                <h1 onClick={() => navigate('/')}>HomePage</h1>
            </div>
        </>
    )
}

export default DevPage;