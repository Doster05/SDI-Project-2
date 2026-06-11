import { useParams } from 'react-router-dom'

function SelectedEncounter() {
    let { encounterID } = useParams();

    return(
        <>
            <p>{encounterID}</p>
        </>
    )
}

export default SelectedEncounter;