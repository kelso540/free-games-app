import React, {useEffect, useContext} from 'react';
import SavedDiv from './SavedDiv';
import axios from 'axios';
import {UserContext} from '../context/UserContext';
import { faDownload, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CSS/saved.css';
import './CSS/games.css';

export default function Saved({baseUrl}) {

  const {user, setUser, userSavedGames, setUserSavedGames} = useContext(UserContext);

  useEffect(()=>{
    axios.get(`${baseUrl}/savedGames`)
    .then(res=>{
      console.log(res.data)
      const saved = res.data; 
      const filterSaved = saved.filter(item=>item.user_id === user.id)
      const filterDuplicates = filterSaved.map(item=>item.name)
      setUserSavedGames(filterSaved)
    })
    .catch(err=>console.log(err))
  }, [baseUrl, setUserSavedGames, user, setUser]) 

    const saved = userSavedGames.map((item)=>{
        return <SavedDiv key={item.id} id={item.id} baseUrl={baseUrl} url={item.url} description={item.description} imgUrl={item.imgUrl} name={item.name} />
    })

  return (
    <div className='gamesResultsB'>
      <h1 className='savedGamesHeader'>Saved Games <FontAwesomeIcon icon={faFloppyDisk} /></h1>
      <div className='gamesResultsDivB'>{saved}</div>
    </div>
  )
}
