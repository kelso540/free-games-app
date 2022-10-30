import React, {useContext} from 'react';
import axios from 'axios';
import {UserContext} from '../context/UserContext';

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
    <div>
        <h1>{name}</h1>
        <h3>{dev}</h3>
        <img src={imgUrl} alt='GamePicture' />
        <h4>{description}</h4>
        <h5>{genre}</h5>
        <strong>{release}</strong> <strong>{platform}</strong>
        <a href={url}>Play Here!</a>
        { (loggedIn) ?
            <div>
              <button onClick={()=>addNewSavedGame(name, imgUrl, description, url)}>Save</button>
            </div>
            :<div></div>
        }
    </div>
  )
}
