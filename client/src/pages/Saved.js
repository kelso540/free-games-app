import React, {useEffect, useContext} from 'react';
import SavedDiv from './SavedDiv';
import axios from 'axios';
import {UserContext} from '../context/UserContext';

export default function Saved({baseUrl}) {

  const {user, setUser, userSavedGames, setUserSavedGames} = useContext(UserContext);

  useEffect(()=>{
    axios.get(`${baseUrl}/savedGames`)
    .then(res=>{
      const saved = res.data; 
      const filterSaved = saved.filter(item=>item.user_id === user.id)
      setUserSavedGames(filterSaved)
    })
    .catch(err=>console.log(err))
  }, [baseUrl, setUserSavedGames, user, setUser]) 

    const saved = userSavedGames.map((item)=>{
        return <SavedDiv key={item.id} id={item.id} baseUrl={baseUrl} url={item.url} description={item.description} imgUrl={item.imgUrl} name={item.name} />
    })

  return (
    <div>
        {saved}
    </div>
  )
}
