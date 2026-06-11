import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Loading from '../Componets/Loading.jsx'
import '../Styles/EncounterResult.css'
import RedBuff from '../assets/RedBuff.png'
import BlueBuff from '../assets/BlueBuff.png'

const fallbacks = [RedBuff, BlueBuff]

function EncounterResult() {
  const { encounterCR, encounterAmount } = useParams();
  const [golems, setGolems] = useState([])
  const [golemImages, setGolemImages] = useState({})
  const [loading, setLoading] = useState(true)
  let navigate = useNavigate();

  useEffect(() => {
  let cancelled = false;
  setLoading(true)
  const amount = parseInt(encounterAmount)
  fetch(`https://api.open5e.com/v2/creatures/?challenge_rating=${encounterCR}&limit=1`)
    .then(res => res.json())
    .then(data => {
      if (cancelled) throw new Error('cancelled');
      const total = data.count;
      const randomOffset = Math.floor(Math.random() * (total - 100));
      return fetch(`https://api.open5e.com/v2/creatures/?challenge_rating=${encounterCR}&limit=100&offset=${randomOffset}`);
    })
    .then(res => res.json())
    .then(data => {
      if (cancelled) throw new Error('cancelled');
      const shuffled = data.results.sort(() => Math.random() - 0.5).slice(0, amount);
      setGolems(shuffled);
      const newImages = {};
      shuffled.forEach((golem, i) => {
        const formattedName = golem.name.toLowerCase().replace(/\s+/g, '-');
        newImages[i] = `https://www.dnd5eapi.co/api/images/monsters/${formattedName}.png`;
      });
      setGolemImages(newImages);
      setLoading(false)
    })
    .catch(err => {
      if (err.message !== 'cancelled') console.log('fetch error:', err)
    })
  return () => { cancelled = true }
}, [encounterCR, encounterAmount])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <div className='GolemContainer'>
      {golems.map((golem, golemIndex) => (
        <div className='GolemCard' key={golemIndex} onClick={() => navigate(`/SelectedEncounter/${golem.key}`)}>
          <img className='GolemImage'
            src={golemImages[golemIndex]}
            alt={golem.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbacks[Math.floor(Math.random() * fallbacks.length)]
            }}
          />
          <ul className='GolemBasicInfo'>
            <li className='GolemName'>{golem.name}</li>
            <li className='GolemCR'>CR: {golem.challenge_rating}</li>
          </ul>
        </div>
      ))}
    </div>
    </>
  )
}

export default EncounterResult;