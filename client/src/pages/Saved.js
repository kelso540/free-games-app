import React, {useEffect, useContext, useState} from 'react';
import SavedDiv from './SavedDiv';
import axios from 'axios';
import {UserContext} from '../context/UserContext';
import { faDownload, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CSS/saved.css';
import './CSS/games.css';
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from '../Firebase';

export default function Saved({baseUrl}) {

  const [newArray, setNewArray] = useState([]); 
  const [uniqueName, setUniqueName] = useState('');  

  const {user, setUser, userSavedGames, setUserSavedGames} = useContext(UserContext);

  useEffect(()=>{

    const getData = async ()=>{
      const q = query(collection(db, "games"),  where("user", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    }; 


    // axios.get(`${baseUrl}/savedGames`)
    // .then(res=>{
    //   console.log(res.data)
    //   const saved = res.data 
    //   const filterSaved = saved.filter(item=>item.user_id === user.id)
    //   const uniqueGames = filterSaved.filter((item, index, array)=>{
    //     if(uniqueName === item.name){
    //       setNewArray(current=>[...current, item])
    //       setUniqueName(item.name);
    //     }
    //     setUniqueName(item.name); 
    //     console.log('unique ' + uniqueName);
    //     console.log('current ' + item.name)
    //     return true
    //   })
    //   console.log(uniqueGames);
    //   setUserSavedGames(filterSaved);
    // })
    // .catch(err=>console.log(err))

    getData().catch(err=>console.log(err)); 
  }, [user]) 

    const saved = userSavedGames.map((item)=>{
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
