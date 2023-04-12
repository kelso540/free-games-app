import React, {useContext, useState, useEffect} from 'react';
import {UserContext} from '../context/UserContext';
import './CSS/games.css';
import { faFloppyDisk, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, setDoc, deleteDoc, collection, getDocs, where, query } from "firebase/firestore"; 
import { db } from '../Firebase';
import {useNavigate} from 'react-router-dom';

export default function GameDiv({id, url, description, imgUrl, name}) {

  const navigate = useNavigate();

  const [success, setSuccess] = useState(undefined);

  const { user, loggedIn, successGameDiv } = useContext(UserContext);

  const addNewSavedGame = async(id, name, imgUrl, description, url)=>{
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
    await deleteDoc(doc(db, "games", name)).catch(err=>console.log(err));
    setSuccess(false);
  }; 

  useEffect(()=>{
    const setSaved = async ()=>{
      const q = query(collection(db, "games"), where("user", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const newData = [];
      querySnapshot.forEach((doc) => {  
        const newItem = doc.data();
        newData.push(newItem);
      });
      for(let i = 0; i < newData.length; i++){
        if(newData[i].name === name){
          setSuccess(true); 
        }
      }
    };
    setSaved(); 
  }, [name, user.uid]);

  return (
    <div className='singleGameDiv'>
        <img src={imgUrl} alt='GamePicture' className='gameImg' onClick={()=>navigate(`/gameDetails/${id}`)} />
        { (loggedIn) &&
            <div>
              { (successGameDiv || success)?
                <button onClick={()=>deleteSavedGame(name)} className='removeButtonGame'><FontAwesomeIcon icon={faX} /></button>
                :<button onClick={()=>addNewSavedGame(id, name, imgUrl, description, url)} className='addButtonGame'><FontAwesomeIcon icon={faFloppyDisk} /></button>
              }
            </div>
        }
    </div>
  )
}
