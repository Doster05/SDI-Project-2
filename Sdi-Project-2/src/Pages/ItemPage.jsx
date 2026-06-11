import DropDownAmount from "../Componets/DropDownAmount";
import DropDownSelectionItem from "../Componets/DropDownSelectionItem";
import '../Styles/ItemPage.css'
import { useNavigate } from "react-router-dom";

function ItemPage() {
    let navigate = useNavigate();

    return(
        <>
        <title>Item Builder</title>
            <div className='ShopNameContainer'>
                <h1>Plants Pilfer's</h1>
            </div>
            <div className='ShopDescriptionContainer'>
                <p className='ShopDescription'>Welcome, weary traveler, to Goran's Golems where we have golems of every type! Simply enter your desired CR and how many you wish to browse, and we'll show you the finest golems that match your search.</p>
            </div>
            <div className='ItemMainContainer'>
                <ul>
                    <li>Pilfer Type: <DropDownSelectionItem className='DropDownItem' /> </li>
                    <li>Pilfer Amount: <DropDownAmount className='DropDownAmount' /></li>
                </ul>
                </div>
            <div className='SubmitButtonContainer'>
                <button className='SelectionButton' onClick={() => navigate(`/ItemResult/${'Magic Item'}/${2}`)}>Browse Pilfered Goods</button>
            </div>
        </>
    )
}
export default ItemPage;