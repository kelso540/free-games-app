import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './CSS/games.css';
import { doc, deleteDoc, collection, getDocs, where, query } from "firebase/firestore";
import { db } from '../Firebase';

export default function SavedDiv({url, description, imgUrl, name}) {

  const {user, setUserSavedGames} = useContext(UserContext);

  const deleteSavedGame = async () => {
    console.log(name);
    await deleteDoc(doc(db, "games", name));
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


  // const deleteSavedGame = () => {
  //   axios.delete(`${baseUrl}/savedGames/${id}`)
  //   .then(res=>{
  //     console.log(res)
  //   })
  //   const deleteSaved = userSavedGames.filter(item=>item.id !== id);
  //   setUserSavedGames(deleteSaved); 
  // }

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
