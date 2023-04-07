import React, { useContext, useEffect, useState } from 'react'
import GameDiv from './GameDiv';
import { faCircleUp, faSpinner, faHatWizard, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {UserContext} from '../context/UserContext';
import './CSS/fetch.css'; 

export default function Fetch({updatedData, handleInput, getAllGames, inputValue, baseUrl, spinnerDiv, genres, filterSports, filterShooter, filterStrategy, filterMMORPG, filterFighting}) {

  const resultsPerPage = 16;

  const [display, setDisplay] = useState(false);
  const [pages, setPages] = useState([updatedData.length / resultsPerPage - 1]); 
  const [pageNumberA, setPageNumberA] = useState(resultsPerPage);
  const [pageNumberB, setPageNumberB] = useState(0); 

  const {setUpdatedData, selected, setSelected, user, setUser, hasAvatar, loggedIn, displayHead, setDisplayHead, category, setCategory} = useContext(UserContext);

  // useEffect(()=>{
  //   getAllGames();
  // }, []);

  const games = updatedData.filter((item, index)=>index > pageNumberB && index < pageNumberA).map((item)=>{
      return <GameDiv 
      key={item.id} 
      id={item.id} 
      dev={item.developer} 
      url={item.game_url} 
      genre={item.genre} 
      platform={item.platform} 
      release={item.release_date} 
      description={item.short_description} 
      imgUrl={item.thumbnail} 
      name={item.title} />
  });

  const addPage = (number)=>{
    const currentPageStart = number * resultsPerPage;  
    setPageNumberB(currentPageStart); 
    setPageNumberA(currentPageStart + resultsPerPage);
    console.log(pageNumberA);
    console.log(pageNumberB);
    const allNumbersOnPage = document.querySelectorAll('.number'); 
    const selectNumber = document.getElementById(number);
    for(let i = 0; i < allNumbersOnPage.length; i++){
      allNumbersOnPage[i].style.textDecoration = 'none'; 
    } 
    selectNumber.style.textDecoration = 'underline'; 
  };

  useEffect(()=>{
    const setNumberOfPages = ()=>{
      console.log(updatedData.length);
      let counter = 0; 
      const numberOfPages = (updatedData.length / resultsPerPage) - 1;
      const newArray = [];  
      for(let i = 0; i < numberOfPages; i++){
        counter++;
        newArray.push(counter); 
      }; 
      setPages(newArray);
      setTimeout(()=>{
        const allNumbersOnPage = document.querySelectorAll('.number');
        if(allNumbersOnPage.length > 0){
          allNumbersOnPage[0].style.textDecoration = 'underline'; 
        }
      }, 500); 
    };
    setNumberOfPages();
  }, [updatedData.length]); 

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
      setPageNumberA(resultsPerPage);
      setPageNumberB(0);
    }, [selected])

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
        <strong>Welcome {user.email}</strong>
          {
            (hasAvatar) ?
            <img className='avatar' src={user.photoURL} alt="avatar"/>
            :null 
          }
        </div>
        :null
      }
      {
        (displayHead)?null
          :(loggedIn)?
          <div className='logoDivB'>
            <div className='logoInnerB'>
              <FontAwesomeIcon icon={faHatWizard} size='7x' className='wizardHatB' />
              <strong className='enjoy'>Search for games above! <span className='provided'>provided by</span> <a href='https://www.freetogame.com/' className='FREETOGAME'>FREETOGAME</a></strong>
              <FontAwesomeIcon icon={faHeadset} size='7x' className='headsetB' />
            </div>
          </div>
            :<div className='logoDiv'>
            <div>
              <h1 className='welcome'>Welcome to All Games For Free</h1>
              <h2 className='enjoy'>Enjoy a database of free games provided by <a href='https://www.freetogame.com/' className='FREETOGAME'>FREETOGAME</a></h2>
              <h3 className='log'>Log in or Sign up to save games and customize your profile</h3>
              <h3 className='below'>Search for games above!</h3>
              <FontAwesomeIcon icon={faHatWizard} size='7x' className='wizardHat' />
              <FontAwesomeIcon icon={faHeadset} size='7x' className='headset' />
            </div>
          </div>    
      }
      {
          (spinnerDiv) ?
            <div className='gamesResults'>
              <h2 className='category'>{category}</h2>
              <div className='gameResultsDiv'>
                {games}
              </div>
              <div className='pageNumbersDiv'>
                {displayHead &&
                  pages.map(item=><p key={item} id={item} className='number' onClick={()=>addPage(item)}>{item}</p>)
                }
              </div>
            </div>
            :<div className='gamesResults'>
              <FontAwesomeIcon icon={faSpinner} size='3x' className='fa-spin-pulse' />
            </div>
        }
        <div className={ (display) ?'toTopArrowDiv' :'slideOffScreen' }>
          <FontAwesomeIcon icon={faCircleUp} size='3x' onClick={scrollToTop} />
        </div>
    </div>
  )
}

