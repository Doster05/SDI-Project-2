import { useState } from 'react'
import DropDownCRSelection from "../Componets/DropDownCRSelection";
import DropDownAmount from "../Componets/DropDownAmount";
import '../Styles/EncouterPage.css';
import { useNavigate } from "react-router-dom";

function EncounterPage() {
    let navigate = useNavigate();
    const [cr, setCR] = useState(1)
    const [amount, setAmount] = useState(2)

    return (
        <>
            <title>Encounter Builder</title>
            <div className="ShopNameContainer">
                <h1>Gorans Golem's</h1>
            </div>
            <div className='ShopDescriptionContainer'>
                <p className='ShopDescription'>Welcome, weary traveler, to Goran's Golems where we have golems of every type! Simply enter your desired CR and how many you wish to browse, and we'll show you the finest golems that match your search.</p>
            </div>
            <div className='EncounterMainContainer'>
                <ul className='UserSelection'>
                    <li>Golem Amount: <DropDownAmount value={amount} onChange={setAmount} /></li>
                    <li>Golem CR: <DropDownCRSelection value={cr} onChange={setCR} /></li>
                </ul>
                </div>
            <div className='SubmitButtonContainer'>
                <button className='SelectionButton' onClick={() => navigate(`/EncounterResult/${cr}/${amount}`)}>Browse Golems</button>
            </div>
        </>
    )
}

export default EncounterPage;