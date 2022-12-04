import React, {useContext} from 'react';
import {UserContext} from '../context/UserContext';
import axios from 'axios';
import './CSS/games.css';

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
    <div className='singleGameDivB'>
        <h1 className='gameName'>{name}</h1>
        <img src={imgUrl} alt='GamePicture' className='gameImg' />
        <div className='gameDescDiv'>
          <h4>{description}</h4>
        </div>
        <a href={url}><h3 className='clickToPlay clickHere'>Click Here to Play!</h3></a>
        <button onClick={deleteSavedGame} className='removeFromSaved'>Remove</button>
    </div>
  )
}
