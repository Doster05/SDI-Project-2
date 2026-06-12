import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../Componets/Loading.jsx'
import ArmorImg from '../assets/armorplaceholder.png'
import WeaponImg from '../assets/weaponplaceholder.png'
import MagicImg from '../assets/magicitemplaceholder.webp'
import '../Styles/ItemResult.css'

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

function ItemResult() {
  const { itemType, itemAmount } = useParams();
  const [pilferedGoods, setPilferedGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  const cleanedType = itemType.replace(/\s+/g, '').toLowerCase();
  const endpoint = endpointMap[cleanedType] || cleanedType;
  const amount = parseInt(itemAmount)

  useEffect(() => {
  let cancelled = false;
  setLoading(true)
  fetch(`https://api.open5e.com/v2/${endpoint}/?limit=1`)
    .then(res => res.json())
    .then(data => {
      if (cancelled) throw new Error('cancelled');
      const total = data.count;
      const randomOffset = Math.floor(Math.random() * (total - 100));
      return fetch(`https://api.open5e.com/v2/${endpoint}/?limit=100&offset=${randomOffset}`);
    })
    .then(res => res.json())
    .then(data => {
      if (cancelled) throw new Error('cancelled');
      const shuffled = data.results.sort(() => Math.random() - 0.5).slice(0, amount);
      setPilferedGoods(shuffled);
      setLoading(false)
    })
    .catch(err => {
      if (err.message !== 'cancelled') console.log('fetch error:', err)
    })
  return () => { cancelled = true }
}, [endpoint, amount])

  if (loading) return <Loading />

  return (
    <div className='ItemContainer'>
      {pilferedGoods.map((item, i) => (
        <div className='ItemCard' key={i} onClick={() => navigate(`/SelectedItem/${item.key}/${itemType}`)}>
          <img
            className='ItemImage'
            src={categoryImages[endpoint]}
            alt={item.name}
          />
          <ul className='ItemBasicInfo'>
            <li className='ItemName'>{item.name}</li>
            <li>{item.rarity?.name}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}

export default ItemResult;