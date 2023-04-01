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
        <h1 className='gameName'>{game.title}</h1>
        <h2 className='gameDev'>{game.developer}</h2>
        <img src={game.thumbnail} alt='GamePicture' className='gameImg' />
        <div className='gameDescDiv'>
          <h3 className='gameDesc'>{game.short_description}</h3>
        </div>
        <h3 className='gameGenre'>{game.genre}</h3>
        <h3 className='gameRelease'>Release date: {game.release_date}</h3> 
        <h3 className='gamePlatform'>Platform: {game.platform}</h3>
        <a href={game.game_url} target="_blank" rel="noopener noreferrer" className='clickHere'> Click Here to Play!</a>
        { (loggedIn) &&
            <div>
              <button onClick={()=>addNewSavedGame(game.title, game.thumbnail, game.short_description, game.game_url)} className='addButton'><FontAwesomeIcon icon={faDownload} /> Add to Saved Games</button>
            </div>
        }
        {
          (success) &&
          <p>Success!</p>
        }
    </div>
  )
}
