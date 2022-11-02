import React, { useContext, useEffect, useState } from 'react'
import GameDiv from './GameDiv';
import { faCircleUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {UserContext} from '../context/UserContext';
import './CSS/fetch.css'; 

export default function Fetch({updatedData, handleInput, getAllGames, inputValue, baseUrl, spinnerDiv, genres, filterSports, filterShooter, filterStrategy, filterMMORPG, filterFighting}) {

  const [display, setDisplay] = useState(false);

  const {setUpdatedData, selected, setSelected, user, setUser, hasAvatar, loggedIn} = useContext(UserContext);

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

    useEffect(() => {
      document.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          setDisplay(true); 
        } else {
          setDisplay(false);
        }
      })
    }, [display]);

    const scrollToTop = () =>{
      window.scrollTo(0, 0); 
  }

  return (

    <div className='fetchDiv'>
      {
        (loggedIn)?
        <div className='img-container'>
        <strong>Welcome {user.username}</strong>
          {
            (hasAvatar) ?
            <img className='avatar' src={user.imageUrl} alt="avatar"/>
            :null 
          }
        </div>
        :null
      }
      {
        (loggedIn)?null
          :<div className='logoDiv'>
          <div>
            <h1 className='welcome'>Welcome to Free to Play Games</h1>
            <h2 className='enjoy'>Enjoy a database of free games provided by <a href='https://www.freetogame.com/api-doc' className='FREETOGAME'>FREETOGAME</a></h2>
            <h3 className='log'>Log in or Sign up to save games and customize your profile</h3>
            <h3 className='below'>Search for games above!</h3>
          </div>
        </div>
      }
        {
          (spinnerDiv) ?
            <div className='gamesResults'>
              {games}
            </div>
            : <div>
              <FontAwesomeIcon icon={faSpinner} size='3x' className='fa-spin-pulse' />
            </div>
        }
        <div className={ (display) ?'toTopArrowDiv' :'slideOffScreen' }>
          <FontAwesomeIcon icon={faCircleUp} size='3x' onClick={scrollToTop} />
        </div>
    </div>
  )
}

