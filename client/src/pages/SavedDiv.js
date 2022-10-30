import React, {useContext} from 'react';
import {UserContext} from '../context/UserContext';
import axios from 'axios';

export default function SavedDiv({id, baseUrl, url, description, imgUrl, name}) {

  const {userSavedGames, setUserSavedGames} = useContext(UserContext);

  const deleteSavedGame = () => {
    axios.delete(`${baseUrl}/savedGames/${id}`)
    .then(res=>{
      console.log(res)
    })
    const deleteSaved = userSavedGames.filter(item=>item.id !== id);
    setUserSavedGames(deleteSaved); 
  }

  return (
    <div>
        <h1>{name}</h1>
        <img src={imgUrl} alt='GamePicture' />
        <h4>{description}</h4>
        <a href={url}>Play Here!</a>
        <button onClick={deleteSavedGame}>Remove</button>
    </div>
  )
}
