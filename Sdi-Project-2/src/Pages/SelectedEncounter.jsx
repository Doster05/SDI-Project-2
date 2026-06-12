import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Loading from '../Componets/Loading.jsx'
import RedBuff from '../assets/RedBuff.png'
import BlueBuff from '../assets/BlueBuff.png'
import '../Styles/SelectedEncounter.css'

const fallbacks = [RedBuff, BlueBuff]

const ACTION_TYPE_LABELS = {
  ACTION: 'Action',
  BONUS_ACTION: 'Bonus Action',
  REACTION: 'Reaction',
  LEGENDARY_ACTION: 'Legendary Action',
}

function SelectedEncounter() {
  let { encounterID } = useParams();
  const [selectedEncounter, setSelectedEncounter] = useState(null)
  const [golemImage, setGolemImage] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Loading />;

  return (
    <>
      <div className='EncounterHeaderContainer'>
        <img
        src={golemImage}
        onError={e => {
        const idx = Math.floor(Math.random() * fallbacks.length);
        e.target.src = fallbacks[idx];
        e.target.onerror = null; // prevent infinite loop if fallback also fails
      }} />
      <div className='EncounterHeaderText'>
        <p className='Encounter Name'>{selectedEncounter.name}</p>
        <p className='EncounterCR'>CR: {selectedEncounter.challenge_rating}</p>
      </div>
      </div>

      <div className='EncounterInfoContainer'>
        <div className='EncounterHpAc'>
          <p>HP: {selectedEncounter.hit_points}</p>
          <p>AC: {selectedEncounter.armor_class}</p>
        </div>
        {selectedEncounter.darkvision_range ? (
          <p className='EncounterDarkvision'>
            Darkvision: {selectedEncounter.darkvision_range} ft.
          </p>
        ) : (
          <p className='EncounterDarkvision'>No Darkvision</p>
        )}

        <ul className='EncounterSpeedUl'>
          {Object.entries(selectedEncounter.speed)
            .filter(([key]) => key !== 'unit')
            .map(([key, value]) => (
              <li className='EncounterSpeed' key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value} {selectedEncounter.speed.unit}
              </li>
            ))}
        </ul>

        <ul className='EncounterStatsUl'>
          {Object.entries(selectedEncounter.ability_scores)
            .filter(([key]) => key !== 'unit')
            .map(([key, value]) => (
              <li className='EncounterStats' key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value} ({selectedEncounter.modifiers[key] >= 0 ? '+' : ''}{selectedEncounter.modifiers[key]})
              </li>
            ))}
        </ul>
      </div>

      <div className='EncounterActionsContainer'>
        <h2>Actions</h2>
        <div className='EncounterActionsGrid'>
          {selectedEncounter.actions.map((action, index) => (
            <div className='ActionCard' key={index}>
              <div className='ActionCardHeader'>
                <h3>{action.name}</h3>
                <span className='ActionTypeBadge'>
                  {ACTION_TYPE_LABELS[action.action_type] ?? action.action_type}
                </span>
              </div>

              {action.usage_limits && (
                <span className='ActionRecharge'>
                  Recharge {action.usage_limits.param}–6
                </span>
              )}

              <p className='ActionDesc'>{action.desc}</p>

              {action.attacks.length > 0 && (
                <div className='ActionAttackInfo'>
                  <span>+{action.attacks[0].to_hit_mod} to hit</span>
                  <span>Reach: {action.attacks[0].reach} ft.</span>
                  <span>
                    {action.attacks[0].damage_die_count}d{action.attacks[0].damage_die_type.replace('D', '')}
                    +{action.attacks[0].damage_bonus}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SelectedEncounter;