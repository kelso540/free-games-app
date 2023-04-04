import React, {useContext, useState, useEffect} from 'react';
import {UserContext} from '../context/UserContext';
import './CSS/games.css';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../Firebase';
import {Link, useNavigate} from 'react-router-dom';

export default function GameDiv({id, dev, url, genre, platform, release, description, imgUrl, name, saved, baseUrl}) {

  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const {user, loggedIn} = useContext(UserContext);

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

//   const addNewSavedGame=(name, imgUrl, description, url)=>{ 
//     axios.post(`${baseUrl}/users/${user.id}/savedGames`, {
//     name, imgUrl, description, url
//    })
//    .then(res=>{
//      console.log(res)
//      setSuccess(true)
//    })
//    .catch(err=> console.log(err))
// }

  return (
    <div className='singleGameDiv' onClick={()=>navigate(`/gameDetails/${id}`)}>
        <img src={imgUrl} alt='GamePicture' className='gameImg' />
        { (loggedIn) &&
            <div>
              <button onClick={()=>addNewSavedGame(name, imgUrl, description, url)} className='addButtonGame'><FontAwesomeIcon icon={faDownload} /></button>
            </div>
        }
        {
          (success) &&
          <p>Success!</p>
        }
    </div>
  )
}
