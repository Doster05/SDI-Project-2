import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Loading from '../Componets/Loading.jsx'
import RedBuff from '../assets/RedBuff.png'
import BlueBuff from '../assets/BlueBuff.png'

const fallbacks = [RedBuff, BlueBuff]

function SelectedEncounter() {
    let { encounterID } = useParams();
    const [ selectedEncounter, setSelectedEncounter ] = useState(null)
    const [ golemImage, setGolemImage ] = useState(null);
    const [ loading, setLoading] = useState(true);

    useEffect(() => {
  let canceled = false;
  setLoading(true);

    fetch(`https://api.open5e.com/v2/creatures/?key=${encounterID}`)
      .then(res => res.json())
      .then(data => {
        if (canceled) throw new Error('cancelled');
        const creature = data.results[0];
        setSelectedEncounter(creature);
        const formattedName = creature.name.toLowerCase().replace(/\s+/g, '-');
        setGolemImage(`https://www.dnd5eapi.co/api/images/monsters/${formattedName}.png`);
        setLoading(false);
      })
      .catch(err => {
        if (err.message !== 'cancelled') {
          console.log('fetch error:', err);
          setLoading(false);
        }
      }); 

    return () => { canceled = true; };
  }, [encounterID]);

      if (loading) {
    return (
      <Loading />
    )
  }

    return(
        <>
          <p>{selectedEncounter.name}</p>
        </>
    )
}

export default SelectedEncounter;