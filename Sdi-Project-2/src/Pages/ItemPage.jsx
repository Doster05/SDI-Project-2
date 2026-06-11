import DropDownAmount from "../Componets/DropDownAmount";
import DropDownSelectionItem from "../Componets/DropDownSelectionItem";
import '../Styles/ItemPage.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function ItemPage() {
    let navigate = useNavigate();
    const [type, setType] = useState('Magic Items')
    const [amount, setAmount] = useState(2)

    return(
        <>
        <title>Item Builder</title>
            <div className='ShopNameContainer'>
                <h1>Plants Pilfer's</h1>
            </div>
            <div className='ShopDescriptionContainer'>
                <p className='ShopDescription'>Welcome, wandering adventurer, to Plant Pilfers where enchanted arms and armor grow on trees! Simply enter the item type you desire and how many you wish to browse, and we'll unearth the finest weapons, armor, and magic items that match your search.</p>            </div>
            <div className='ItemMainContainer'>
                <ul>
                    <li>Pilfer Type: <DropDownSelectionItem value={type} onChange={setType} /> </li>
                    <li>Pilfer Amount: <DropDownAmount type={amount} onChange={setAmount} /></li>
                </ul>
                </div>
            <div className='SubmitButtonContainer'>
                <button className='SelectionButton' onClick={() => navigate(`/ItemResult/${type}/${amount}`)}>Browse Pilfered Goods</button>
            </div>
        </>
    )
}
export default ItemPage;