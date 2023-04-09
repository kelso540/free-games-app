import React, { useContext, useEffect, useState, useCallback } from 'react'
import GameDiv from './GameDiv';
import { faCircleUp, faSpinner, faHatWizard, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {UserContext} from '../context/UserContext';
import './CSS/fetch.css'; 

export default function Fetch({ updatedData, spinnerDiv }) { 

  const {
    resultsPerPage, 
    pageNumberA, 
    setPageNumberA, 
    pageNumberB, 
    setPageNumberB, 
    user, 
    hasAvatar, 
    loggedIn, 
    displayHead, 
    category, 
    overallPage, 
    setOverallPage
  } = useContext(UserContext);

  const [display, setDisplay] = useState(false);
  const [pages, setPages] = useState([Math.floor(updatedData.length / resultsPerPage)]);

  const games = updatedData.filter((item, index)=>index >= pageNumberB && index < pageNumberA).map((item)=>{
      return <GameDiv 
      key={item.id} 
      id={item.id} 
      url={item.game_url} 
      description={item.short_description} 
      imgUrl={item.thumbnail} 
      name={item.title}  
      />
  });

  const addPage = useCallback((number)=>{
    console.log(updatedData.length)
    if(updatedData.length > resultsPerPage){
      setTimeout(()=>{
        if(number === 1){
          setPageNumberA(resultsPerPage);
          setPageNumberB(0);
          const allNumbersOnPage = document.querySelectorAll('.number'); 
          const selectNumber = document.getElementById(number);
          for(let i = 0; i < allNumbersOnPage.length; i++){
            allNumbersOnPage[i].style.textDecoration = 'none'; 
          } 
          selectNumber.style.textDecoration = 'underline'; 
          return
        };
        const currentPageStart = number * resultsPerPage;  
        setPageNumberB(currentPageStart); 
        setPageNumberA(currentPageStart + resultsPerPage);
        console.log(pageNumberB);
        console.log(pageNumberA);
        const allNumbersOnPage = document.querySelectorAll('.number'); 
        const selectNumber = document.getElementById(number);
        for(let i = 0; i < allNumbersOnPage.length; i++){
          allNumbersOnPage[i].style.textDecoration = 'none'; 
        }
        selectNumber.style.textDecoration = 'underline';
      }, 100);
    } 
    }, [pageNumberA, pageNumberB, updatedData.length, setPageNumberA, setPageNumberB, resultsPerPage]);

  useEffect(()=>{
    const setNumberOfPages = ()=>{
      let counter = 0; 
      const numberOfPages = Math.floor(updatedData.length / resultsPerPage);
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
      }, 100); 
    };
    setNumberOfPages();
  }, [updatedData.length, resultsPerPage]); 

    useEffect(()=>{ //resets to current page number when back arrow on page is clicked. 
      setTimeout(()=>{
        addPage(overallPage);
      }, 200);
    }, [addPage, overallPage]); 

    useEffect(() => {
      document.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          setDisplay(true); 
        } else {
          setDisplay(false);
        }
      })
      return document.removeEventListener("scroll", ()=>{})
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
          (spinnerDiv)?
            <div className='gamesResults'>
              <h2 className='category'>{category}</h2>
              <div className='gameResultsDiv'>
                {games}
              </div>
              <div className='pageNumbersDiv'>
                {updatedData.length > resultsPerPage &&
                  pages.map(item=>
                    <p key={item} id={item} className='number' onClick={()=>{addPage(item); scrollToTop(); setOverallPage(item)}}> {item} </p> 
                  )
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

