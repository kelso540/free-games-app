import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { faFloppyDisk, faX, faArrowLeft, faComputerMouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, setDoc, deleteDoc, collection, getDocs, where, query } from "firebase/firestore"; 
import { db } from '../Firebase';
import './CSS/details.css'; 

export default function GameDetails() {

  const navigate = useNavigate(); 

  const { user, data, loggedIn } = useContext(UserContext);
  const [success, setSuccess] = useState(false);

  const { id } = useParams(); 
  const game = data.filter(item=>item.id === Number(id))[0];
  
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
      setSuccess(true)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(()=>{
    const setSaved = async ()=>{
      if(loggedIn){
        const q = query(collection(db, "games"), where("user", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const newData = [];
        querySnapshot.forEach((doc) => {  
          const newItem = doc.data();
          newData.push(newItem);
        });
        for(let i = 0; i < newData.length; i++){
          if(newData[i].name === game.title){
            setSuccess(true); 
          };
        };
      };
    }
    setSaved().catch(err=>console.log(err)); 
  }, [game.title, user.uid, loggedIn]);

  const deleteSavedGame = async (name) => {
    await deleteDoc(doc(db, "games", name)).catch(err=>console.log(err));
    setSuccess(false);
  };

  return (
    <div className='detailsDiv'>
        <h1 className='gameNameDetails'>{game.title}</h1>
        <h2 onClick={()=>navigate(-1)} className='backBtn'><FontAwesomeIcon icon={faArrowLeft} /></h2>
        <h2 className='gameDevDetails'>{game.developer}</h2>
        { 
          (loggedIn) &&
          <div>
              {(success)?<button onClick={()=>deleteSavedGame(game.title)} className='removeButtonDetails'><FontAwesomeIcon icon={faX} /> Remove from Saved Games</button>
                :<button onClick={()=>addNewSavedGame(game.id, game.title, game.thumbnail, game.short_description, game.game_url)} className='addButtonDetails'><FontAwesomeIcon icon={faFloppyDisk} /> Add to Saved Games</button>
              }
          </div>
        }
        <div className='detailsSubDiv'>
          <div className='imgDetail'>
            <img src={game.thumbnail} alt='GamePicture' className='gameImgDetails' />
            <div className='gameDescDivDetails'>
              <h3 className='gameDescDetails'>{game.short_description}</h3>
            </div>
          </div>
          <div className='strategyDivDetails'>
            <div>
              <h4>Genre:</h4>
              <h3 className='gameTextDetails'>{game.genre}</h3>
            </div>
            <div>
              <h4>Release Date:</h4>
              <h3 className='gameTextDetails'>{game.release_date}</h3> 
            </div>
            <div>
              <h4>Platform:</h4>
              <h3 className='gameTextDetails'>{game.platform}</h3>
            </div>
          </div>
        </div>
        <a href={game.game_url} target="_blank" rel="noopener noreferrer" className='clickHere'><FontAwesomeIcon icon={faComputerMouse} /> Play!</a>
    </div>
  )
}
