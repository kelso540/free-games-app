import React, {useEffect, useContext} from 'react';
import SavedDiv from './SavedDiv';
import {UserContext} from '../context/UserContext';
import './CSS/saved.css';
import './CSS/games.css';
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from '../Firebase';

export default function Saved({baseUrl}) {
  
  const {user, userSavedGames, setUserSavedGames} = useContext(UserContext);

  useEffect(()=>{
    const getData = async ()=>{
      const q = query(collection(db, "games"),  where("user", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const newData = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id); 
        const newItem = doc.data();
        newData.push(newItem);
      });
      setUserSavedGames(newData);
    }; 
    getData().catch(err=>console.log(err));
  }, [user, setUserSavedGames]);

    const saved = userSavedGames.map((item)=>{
      console.log(item); 
        return <SavedDiv key={item.id} id={item.id} baseUrl={baseUrl} url={item.url} description={item.description} imgUrl={item.imgUrl} name={item.name} />
    })

  return (
    <div className='gamesResultsB'>
      <div className='gamesResultsDivB'>
        {saved}
      </div>
    </div>
  )
}
