import React, {useContext, useState} from 'react';
import axios from 'axios';
import {UserContext} from '../context/UserContext';
import './CSS/games.css';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function GameDiv({id, dev, url, genre, platform, release, description, imgUrl, name, saved, baseUrl}) {

  const [success, setSuccess] = useState(false); 

  const {user, loggedIn} = useContext(UserContext);

  const addNewSavedGame=(name, imgUrl, description, url)=>{ 
    axios.post(`${baseUrl}/users/${user.id}/savedGames`, {
    name, imgUrl, description, url
   })
   .then(res=>{
     console.log(res)
     setSuccess(true)
   })
   .catch(err=> console.log(err))
}

  return (
    <div className='singleGameDiv'>
        <h1 className='gameName'>{name}</h1>
        <h2 className='gameDev'>{dev}</h2>
        <img src={imgUrl} alt='GamePicture' className='gameImg' />
        <div className='gameDescDiv'>
          <h3 className='gameDesc'>{description}</h3>
        </div>
        <h3 className='gameGenre'>{genre}</h3>
        <h3 className='gameRelease'>Release date: {release}</h3> 
        <h3 className='gamePlatform'>Platform: {platform}</h3>
        <a href={url} className='clickHere'> Click Here to Play!</a>
        { (loggedIn) ?
            <div>
              <button onClick={()=>addNewSavedGame(name, imgUrl, description, url)} className='addButton'><FontAwesomeIcon icon={faDownload} /> Add to Saved Games</button>
            </div>
            :<div></div>
        }
        {
          (success)?
          <p>Success!</p>
          :null
        }
    </div>
  )
}
