import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import ArmorImg from '../assets/armorplaceholder.png'
import WeaponImg from '../assets/weaponplaceholder.png'
import MagicImg from '../assets/magicitemplaceholder.webp'
import Loading from '../Componets/Loading.jsx'
import '../Styles/SelectedItem.css'

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
    const [pilferedGood, setPilferedGood] = useState(null);
    const [loading, setLoading] = useState(true);

    const cleanedType = itemType.replace(/\s+/g, '').toLowerCase();
    const endpoint = endpointMap[cleanedType] || cleanedType;

    useEffect(() => {
        let cancelled = false;
        setLoading(true)
        fetch(`https://api.open5e.com/v2/${endpoint}/${itemID}/`)
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

    if (loading) return <Loading />

    const cost = parseFloat(pilferedGood.cost)

    return (
        <>
            <div className='SelectedItemHeader'>
                <img
                    className='ItemImage'
                    src={categoryImages[endpoint]}
                    alt={pilferedGood.name}
                />
                <div className='SelectedItemHeaderText'>
                    <p className='ItemName'>{pilferedGood.name}</p>
                    <p className='ItemRarity'>{pilferedGood.rarity.name}</p>
                </div>
            </div>

            <div className='SelectedItemInfo'>
                <span className='ItemTag'>
                    {pilferedGood.requires_attunement ? '✦ Requires Attunement' : 'No Attunement'}
                </span>
                <span className='ItemTag'>
                    {pilferedGood.weight} {pilferedGood.weight_unit}
                </span>
                {cost > 0 && (
                    <span className='ItemTag'>{cost} gp</span>
                )}
                {pilferedGood.armor && (
                    <span className='ItemTag'>AC: {pilferedGood.armor.ac_display}</span>
                )}
            </div>

            <div className='SelectedItemDesc'>
                <h3>{pilferedGood.name} Description:</h3>
                <div>
                    <ReactMarkdown>{pilferedGood.desc}</ReactMarkdown>
                </div>
            </div>
        </>
    )
}

export default SelectedItem;