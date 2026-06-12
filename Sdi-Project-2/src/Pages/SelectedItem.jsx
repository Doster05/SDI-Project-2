import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ArmorImg from '../assets/armorplaceholder.png'
import WeaponImg from '../assets/weaponplaceholder.png'
import MagicImg from '../assets/magicitemplaceholder.webp'
import Loading from '../Componets/Loading.jsx'

const endpointMap = {
    magicitem: 'magicitems',
    magicitems: 'magicitems',
    weapon: 'weapons',
    weapons: 'weapons',
    armor: 'armor',
}

const categoryImages = {
    magicitems: MagicImg,
    armor: ArmorImg,
    weapons: WeaponImg
}

function SelectedItem() {
    const { itemID, itemType } = useParams();
    const [pilferedGood, setPilferedGood] = useState([]);
    const [loading, setLoading] = useState(true);

    const cleanedType = itemType.replace(/\s+/g, '').toLowerCase();
    const endpoint = endpointMap[cleanedType] || cleanedType;
    
    useEffect(() => {
        let cancelled = false;
        setLoading(true)
        fetch(`https://api.open5e.com/v2/?key=${itemID}`)
            .then(res => res.json())
            .then(data => {
                if (cancelled) throw new Error('cancelled');
                setPilferedGood(data);
                setLoading(false)
            })
            .catch(err => {
            if (err.message !== 'cancelled') console.log('fetch error:', err)
            })
        return () => { cancelled = true }
    }, [endpoint])

    if(loading){
        return(
            <Loading />
        )
    }

    return(
        <>
            <p>{itemID}</p>
            <p>{itemType}</p>
            <p>{pilferedGood.name}</p>
        </>
    )
}

export default SelectedItem;