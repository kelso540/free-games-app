import React, {useContext, useState, useEffect} from 'react';
import {UserContext} from '../context/UserContext';
import './CSS/games.css';
import { faFloppyDisk, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, setDoc, deleteDoc, collection, getDocs, where, query } from "firebase/firestore"; 
import { db } from '../Firebase';
import {useNavigate} from 'react-router-dom';

export default function GameDiv({id, dev, url, genre, platform, release, description, imgUrl, name, saved, baseUrl, data, overallPage}) {

  const navigate = useNavigate();

  const [success, setSuccess] = useState(null);

  const {user, loggedIn} = useContext(UserContext);

  const addNewSavedGame = async(id, name, imgUrl, description, url)=>{
    console.log(user);
    try {
      setDoc(doc(db, "games", name), {
        user: user.uid,
        id: id, 
        name: name,
        imgUrl: imgUrl,
        description: description, 
        url: url,
      });
      setSuccess(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteSavedGame = async (name) => {
    console.log(name);
    await deleteDoc(doc(db, "games", name)).catch(err=>console.log(err));
    setSuccess(false);
  };

  useEffect(()=>{
    const setSaved = async ()=>{
      const q = query(collection(db, "games"),  where("name", "==", name));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(() => {
        setSuccess(true); 
      }); 
    };
    setSaved(); 
  }, [name]);

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
    <div className='singleGameDiv'>
        <img src={imgUrl} alt='GamePicture' className='gameImg' onClick={()=>navigate(`/gameDetails/${id}`)} />
        { (loggedIn) &&
            <div>
              { (success)?
                <button onClick={()=>deleteSavedGame(name)} className='removeButtonGame'><FontAwesomeIcon icon={faX} /></button>
                :<button onClick={()=>addNewSavedGame(id, name, imgUrl, description, url)} className='addButtonGame'><FontAwesomeIcon icon={faFloppyDisk} /></button>
              }
            </div>
        }
    </div>
  )
}
