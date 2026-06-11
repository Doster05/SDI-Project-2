import { useParams } from 'react-router-dom'

function ItemResult() {
    const { itemID } = useParams();
    
    return(
        <>
            <p>{itemID}</p>
        </>
    )
}

export default ItemResult;