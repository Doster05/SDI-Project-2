import { useParams } from 'react-router-dom'

function SelectedItem() {
    let { itemID } = useParams();

    return(
        <>
            <p>{itemID}</p>
        </>
    )
}

export default SelectedItem;