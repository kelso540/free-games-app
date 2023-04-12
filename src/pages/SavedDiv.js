import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './CSS/games.css';
import { doc, deleteDoc, collection, getDocs, where, query } from "firebase/firestore";
import { db } from '../Firebase';
import {useNavigate} from 'react-router-dom';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SavedDiv({id, imgUrl, name}) {

  const navigate = useNavigate();

  const {user, setUserSavedGames} = useContext(UserContext);

  const deleteSavedGame = async (name) => {
    await deleteDoc(doc(db, "games", name)).catch(err=>console.log(err));
    getData();
  };

    const getData = async ()=>{
      const q = query(collection(db, "games"),  where("user", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const newData = [];
      querySnapshot.forEach((doc) => {
        const newItem = doc.data();
        newData.push(newItem);
      });
      setUserSavedGames(newData); 
    };

  return (
    <div className='singleGameDivB'>
        <img src={imgUrl} alt='GamePicture' className='gameImg' onClick={()=>navigate(`/gameDetails/${id}`)} />
        <button onClick={()=>deleteSavedGame(name)} className='removeFromSaved'><FontAwesomeIcon icon={faX} /></button>
    </div>
  )
}
