import LoadingIcon from '../assets/LoadingIconDice.png';
import '../Styles/Loading.css';

function Loading() {
    return(
        <>
            <div className="loading-container">
                <img src={LoadingIcon} alt="Loading" className="loading-dice" />
                <p className="loading-text">Loading...</p>
            </div>
        </>
    )
}

export default Loading;