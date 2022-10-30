import React, { useContext, useEffect, useState } from 'react'
import GameDiv from './GameDiv';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {UserContext} from '../context/UserContext';

export default function Fetch({updatedData, handleInput, getAllGames, inputValue, baseUrl, spinnerDiv, genres, filterSports, filterShooter, filterStrategy, filterMMORPG, filterFighting}) {

  const {setUpdatedData, selected, setSelected, user, setUser} = useContext(UserContext);

    const games = updatedData.map((item)=>{
        return <GameDiv key={item.id} id={item.id} dev={item.developer} url={item.game_url} genre={item.genre} platform={item.platform} release={item.release_date} description={item.short_description} imgUrl={item.thumbnail} name={item.title} baseUrl={baseUrl}/>
      })

    useEffect(()=>{ //when selected state changes this code runs
      if (selected === 'Sports'){
        filterSports(); 
      }
      if (selected === 'Shooter'){
        filterShooter(); 
      }
      if (selected === 'Strategy'){
        filterStrategy(); 
      }
      if (selected === 'MMORPG'){
        filterMMORPG(); 
      }
      if (selected === 'Fighting'){
        filterFighting(); 
      }
      if(selected === "Select category"){
        setUpdatedData([]);
      }
    }, [selected, user, setUser])

    const handleCategory = (e) => {
      setSelected(e.target.value); 
    }
      

  return (

    <div>
        <input type='text' onChange={handleInput} value={inputValue}/>
        <button onClick={getAllGames}>Show All Games</button>
        <select value={selected} onChange={handleCategory}>
          {
            genres.map((item)=>{
              return <option key={item.id} value={item.value}>{item.text}</option>
            })
          }
        </select>
        {
          (spinnerDiv) ?
            <div className='gamesResults'>
              {games}
            </div>
            : <div>
              <FontAwesomeIcon icon={faSpinner} size='3x' className='fa-spin-pulse' />
            </div>
        }
    </div>
  )
}

