import React, {useContext} from 'react';
import axios from 'axios';
import {UserContext} from '../context/UserContext';
import './CSS/games.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function GameDiv({id, dev, url, genre, platform, release, description, imgUrl, name, saved, baseUrl}) {

  const {user, loggedIn} = useContext(UserContext);

  const addNewSavedGame=(name, imgUrl, description, url)=>{ 
    axios.post(`${baseUrl}/users/${user.id}/savedGames`, {
    name, imgUrl, description, url
   })
   .then(res=>{
     console.log(res)
   })
   .catch(err=> console.log(err))
}

  return (
    <div className='singleGameDiv'>
        <h1>{name}</h1>
        <h2>{dev}</h2>
        <img src={imgUrl} alt='GamePicture' className='gameImg' />
        <h3>{description}</h3>
        <h3>{genre}</h3>
        <h3>Release date: {release}</h3> <h3>Platform: {platform}</h3>
        <a href={url} className='clickHere'> Click Here to Play!</a>
        { (loggedIn) ?
            <div>
              <button onClick={()=>addNewSavedGame(name, imgUrl, description, url)} className='addButton'><FontAwesomeIcon icon={faPlus} /> Add to Saved Games</button>
            </div>
            :<div></div>
        }
    </div>
  )
}
