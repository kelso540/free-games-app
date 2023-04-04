import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../Firebase';
import './CSS/details.css'; 

export default function GameDetails() {

  const { user, data, loggedIn } = useContext(UserContext);
  const [success, setSuccess] = useState(false);

  const { id } = useParams(); 
  const game = data.filter(item=>item.id == id)[0];
  
  const addNewSavedGame = async(name, imgUrl, description, url)=>{
    console.log(user);
    try {
      const docRef = await setDoc(doc(db, "games", name), {
        user: user.uid,
        name: name,
        imgUrl: imgUrl,
        description: description, 
        url: url,
      });
      // console.log("Document written with ID: ", docRef.id);
      setSuccess(true)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

    console.log(game);

  return (
    <div className='detailsDiv'>
        <h1 className='gameNameDetails'>{game.title}</h1>
        <h2 className='gameDevDetails'>{game.developer}</h2>
        { 
          (loggedIn) &&
              <button onClick={()=>addNewSavedGame(game.title, game.thumbnail, game.short_description, game.game_url)} className='addButton'><FontAwesomeIcon icon={faDownload} /> Add to Saved Games</button>
        }
          <img src={game.thumbnail} alt='GamePicture' className='gameImgDetails' />
        <div className='gameDescDivDetails'>
          <h3 className='gameDescDetails'>{game.short_description}</h3>
        </div>
        <div className='strategyDivDetails'>
          <div>
            <h4>Genre:</h4>
            <h3 className='gameTextDetails'>{game.genre}</h3>
          </div>
          <div>
            <h4>Release Date:</h4>
            <h3 className='gameTextDetails'>Release date: {game.release_date}</h3> 
          </div>
          <div>
            <h4>Platform:</h4>
            <h3 className='gameTextDetails'>{game.platform}</h3>
          </div>
        </div>
        <a href={game.game_url} target="_blank" rel="noopener noreferrer" className='clickHere'> Click Here to Play!</a>
        {
          (success) &&
          <p>Success!</p>
        }
    </div>
  )
}
