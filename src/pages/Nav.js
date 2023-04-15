import React, { useState, useContext, useEffect, useCallback } from 'react';
import { faGamepad, faBars, faX, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../context/UserContext';
import './CSS/nav.css';
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../Firebase';
import googleIcon from '../icons/icons8-google-48.png'; 

export default function Nav({ time, handleInput, getAllGames, inputValue, genres, filterCategory }) {

  const {
    setUser, 
    loggedIn, 
    setLoggedIn, 
    setHasAvatar, 
    setHoldUsername, 
    holdAvatar, 
    setHoldAvatar, 
    changeBackgroundColor, 
    setColorSelected, 
    selected, 
    setSelected, 
    setDisplayHead, 
    setUpdatedData, 
    setCategory, 
    navPage, 
    setNavPage, 
    showNavInput, 
    setShowNavInput, 
    menu, 
    setMenu, 
    setCurrentPageNum, 
    resultsPerPage, 
    setPageNumberA, 
    setPageNumberB
  } = useContext(UserContext);

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const [message, setMessage] = useState('');
  const [loginSpin, setLoginSpin] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false); 

    const handleAvatar = () => {
      setTimeout(()=>{
        if(holdAvatar){
          setHasAvatar(true); 
        } else {
          setHasAvatar(false);
        }
      }, 0);
    };

  const handleSignup = (e)=>{
    e.preventDefault(); 
    createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in 
      setSignupSuccess(true)
      setLoginSpin(false)
      setDisplayMessage(true)
      setMessage('Thanks for signing up! You can now LOG IN!') 
    })
    .catch(function(){
      messageDisplay();
    });
  };

  const googleLogIn = ()=>{
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user)
        setHoldUsername(result.user.email)
        setHoldAvatar(result.user.photoURL)
        setColorSelected(result.user.displayName)
        setLoginSpin(false)
        setLoggedIn(true)
        setModal(false)
        setMessage('')
        setMenu(false)
        setUsername('')
        setPassword('')
        reSetHome()
        handleAvatar()
      })
        .catch((error) => {
        const errorMessage = error.message;
        setMessage(errorMessage); 
    });
  }; 

  const handleLogin = (e)=>{
    e.preventDefault(); 
    signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      setUser(userCredential.user)
      setHoldUsername(userCredential.user.email)
      setHoldAvatar(userCredential.user.photoURL)
      setColorSelected(userCredential.user.displayName)
      setLoginSpin(false)
      setLoggedIn(true)
      setModal(false)
      setMessage('')
      setMenu(false)
      setUsername('')
      setPassword('')
      reSetHome()
      handleAvatar()
    })
    .catch((error)=>{
      if(error.code === 'auth/wrong-password'){
        setMessage('Incorrect password.')
        setDisplayMessage(true)
        setLoginSpin(false)
      }
      else if(error.code === 'auth/too-many-requests') {
        setMessage('Too many requests try again later.')
        setDisplayMessage(true)
        setLoginSpin(false)
      } else {
      setMessage('No user with that username exists sign up!')
      setDisplayMessage(true)
      setLoginSpin(false)
      }
    });
  }


    const handleLogout = ()=>{
      signOut(auth).then(() => {
        setUser({});
        setUserExists(true);
        setLoggedIn(false);
        setSignupSuccess(false);
        setDisplayHead(false);
        setColorSelected('#f2e9e4');
        setMenu(false);
        changeBackgroundColor();
        setLoginSpin(false);
        reSetHome();
        navigate('/');
      }).catch((error) => {
        console.log(error)
      });
    };

    useEffect(()=>{
      changeBackgroundColor();
    }, [changeBackgroundColor]);

    const handleCategory = (e) => {
      setSelected(e.target.value); 
      setMenu(false); 
    }

    useEffect(()=>{
      if (selected === 'Sports'){
        filterCategory('Sports'); 
      };
      if (selected === 'Shooter'){
        filterCategory('Shooter');  
      };
      if (selected === 'Strategy'){
        filterCategory('Strategy');  
      };
      if (selected === 'MMORPG'){
        filterCategory('MMORPG');  
      };
      if (selected === 'Fighting'){
        filterCategory('Fighting');  
      }; 
      if (selected === 'Racing'){
        filterCategory('Racing');  
      };
      setPageNumberA(resultsPerPage); 
      setPageNumberB(0); 
      setCurrentPageNum(1);
    }, [selected, filterCategory, setDisplayHead, setCurrentPageNum, setPageNumberA, setPageNumberB, resultsPerPage]);

    const reSetHome = () => {
      setUpdatedData([]);
      setDisplayHead(false);
      setCategory('');
      setMenu(false);
      setShowNavInput(true);
    }

    const displayMenu = () => {
      setMenu(!menu); 
    }

    const hideMenu = () => {
      setLoginSpin(false);
      setUsername('');
      setPassword('');
      setMessage('');
      setMenu(false); 
      setModal(!modal);
    }

    const setLogo = (page) => {
      setShowNavInput(false);
      setNavPage(page);
      setMenu(false); 
    }

    const showSpinner = useCallback(() => {
      setLoginSpin(true);
      setDisplayMessage(true); 
    }, []);

    useEffect(()=>{
      if(username.length <= 0 || password.length <= 0){
        setLoginSpin(false);
      }
    },[username.length, password.length])

    const clearX = () => {
      setModal(false);
      setLoginSpin(false);
      setUsername('');
      setPassword('');
      setMessage('');
    }

    const signUpLink = () => {
      setLoginSpin(false);
      setUserExists(false);
      setMessage('');
      setDisplayMessage(false); 
    }

    const logInLink = () => {
      setLoginSpin(false);
      setUserExists(true);
      setDisplayMessage(true);
    }

    const messageDisplay = () => {
      setLoginSpin(false);
      setMessage('User already exists!');
      setDisplayMessage(true);
      logInLink();
    }

    const logInButton = () => {
      setModal(!modal);
      setLoginSpin(false);
      setUsername('');
      setPassword('');
      setMessage('');
    }


  return (
    <div>
      <div className='navDiv'>
        <Link to='/' className='Link' onClick={reSetHome}><strong className='header'>All Games For Free</strong><FontAwesomeIcon icon={faGamepad} size='3x'/><br></br><strong className='smallLogo'>AGFF</strong></Link>
        {
        (showNavInput) ?
        <div className='inputDiv'>
          <input type='text' onChange={handleInput} value={inputValue} placeholder='Type here to search for games'/>
          <button className='allBtn' onClick={getAllGames}>Show All Games</button>
          <select value={(selected !== null)?selected:genres[0].text} onChange={handleCategory}>
            {
              genres.map((item)=>{
                return <option key={item.id} value={item.value}>{item.text}</option>
              })
            }
          </select>
        </div>
        :<div className='navLogo'>
          {navPage}
        </div>
        }
        {
         loggedIn ?
         <div className='profile-container-loggedIn'>
            <Link to='/saved' className='navLink' onClick={()=>setLogo('Saved Games')}>Saved Games</Link>
            <Link to='/userProfile' className='navLink' onClick={()=>setLogo('Profile Page')}>Profile</Link>
            <Link to='/about' className='navLink' onClick={()=>setLogo('About')}>About</Link>
            <Link to='/contact' className='navLink' onClick={()=>setLogo('Contact')}>Contact</Link>  
            <button className='login-btn' onClick={handleLogout}>Logout</button>
          </div>
         
         :<div className='profile-container-loggedOut'>
            <strong className='time'>{time}</strong>
            <Link to='/about' className='navLink' onClick={()=>setLogo('About')}>About</Link>
            <Link to='/contact' className='navLink' onClick={()=>setLogo('Contact')}>Contact</Link>
            <button className='login-btn' onClick={logInButton}>Login</button>
          </div>
        }
     

      
        {
          modal ? <div className='header-modal'>
                     <h3 onClick={clearX} className='clearX'>X</h3>
             {
                userExists ? <div> 
                  <h2>Login</h2>
                  <form onSubmit={handleLogin}>
                    <input required type="email" placeholder="Enter email" onChange={(e)=>setUsername(e.target.value)}/>
                    <input required type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
                    <button className='login-btn' type="submit" onClick={showSpinner}>Submit</button>
                    <button onClick={googleLogIn} className='googleBtn'><img src={googleIcon} alt='google' /> Sign in with Google</button>
                  </form>
                  { 
                  (loginSpin) ? 
                  <div>
                    <FontAwesomeIcon icon={faSpinner} size='3x' className='fa-spin-pulse' />
                  </div>
                  :<div></div>
                  }
                  <p className='haveAccount'>Don't have an account? <span onClick={signUpLink} className='signUp'>Sign up</span></p>
                  {(displayMessage) ? <p>{message}</p> : null}
                </div>
                :<div> 
                  <h2>Sign Up</h2>
                  <form onSubmit={handleSignup}>
                    <input required type="text" placeholder="Enter email" onChange={(e)=>setUsername(e.target.value)}/>
                    <input required type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
                    <button className='login-btn' type="submit" onClick={showSpinner}>Submit</button>
                  </form>
                  { 
                  (loginSpin) ? 
                  <div>
                    <FontAwesomeIcon icon={faSpinner} size='3x' className='fa-spin-pulse' />
                  </div>
                  :<div></div>
                  }
                  {
                    signupSuccess ? <p className='greenSuccess'>Signed up successfully! <span onClick={handleLogin} className='loginLink'>Login</span></p>
                    : <p className='haveAccount'>Already have an account? <span onClick={logInLink} className='signUp'>Login</span></p>
                  }
                </div>
             }
          </div> 
          : null
        }
    </div>






  <div className='mobileNavDiv'>
    <Link to='/' className='mobileLink' onClick={reSetHome}><FontAwesomeIcon icon={faGamepad} size='2x'/><br></br><strong className='smallLogo'>AGFF</strong></Link>
    {
      (showNavInput) ?
      <div className='mobileInputDiv'>
        <input type='text' onChange={handleInput} value={inputValue} placeholder='Type to search'/>
        <button className='allBtn' onClick={getAllGames}>All</button>
      </div>
      :<div className='navLogo'>
          {navPage}
      </div>
    }
    <div>
      {
        (menu)?<FontAwesomeIcon icon={faX} size='2x' onClick={displayMenu} className='bars' />
        :<FontAwesomeIcon icon={faBars} size='2x' onClick={displayMenu} className='bars' />
      }
      {
       loggedIn ?
       <div className={(menu)?'mobile-container-loggedIn' :'displayNone'}>
          <strong className='time'>{time}</strong>
          <div>
            <strong style={{color: 'white'}}>Select a genre</strong>
            <select className='mobileSelect' value={selected} onChange={handleCategory}>
              {
                genres.map((item)=>{
                  return <option key={item.id} value={item.value}>{item.text}</option>
                })
              }
            </select>
          </div>
          <Link to='/saved' className='navLink' onClick={()=>setLogo('Saved Games')}>Saved Games</Link>
          <Link to='/userProfile' className='navLink' onClick={()=>setLogo('Profile Page')}>Profile</Link>
          <Link to='/about' className='navLink' onClick={()=>setLogo('About')}>About</Link>
          <Link to='/contact' className='navLink' onClick={()=>setLogo('Contact')}>Contact</Link> 
          <button className='login-btn' onClick={handleLogout}>Logout</button>
        </div>

       :<div className={(menu)?'mobile-container-loggedOut' :'displayNone'}>
          <strong className='time'>{time}</strong>
          <div className='mobileInputDiv'>
            <strong style={{color: 'white'}}>Filter a genre here </strong>
            <select className='mobileSelect' value={(selected !== null)?selected:genres[0].text} onChange={handleCategory}>
              {
                genres.map((item)=>{
                  return <option key={item.id} value={item.value}>{item.text}</option>
                })
              }
            </select>
          </div>
          <Link to='/about' className='navLink' onClick={()=>setLogo('About')}>About</Link>
          <Link to='/contact' className='navLink' onClick={()=>setLogo('Contact')}>Contact</Link>
          <button className='login-btn' onClick={hideMenu}>Login</button>
        </div>
      }
    </div>

    
    
      {
      modal ? <div className='header-modal'>
                 <h3 onClick={clearX} className='clearX'>X</h3>
         {
            userExists ? <div> 
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <input required type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)}/>
                <input required type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
                <button className='login-btn' type="submit" onClick={showSpinner}>Submit</button>
                <button onClick={googleLogIn} className='googleBtn'><img src={googleIcon} alt='google' /> Sign in with Google</button>
              </form>
              { 
                  (loginSpin) ? 
                  <div>
                    <FontAwesomeIcon icon={faSpinner} size='3x' className='fa-spin-pulse' />
                  </div>
                  :<div></div>
              }
              <p className='haveAccount'>Don't have an account? <span onClick={signUpLink} className='signUp'>Sign up</span></p>
              {(displayMessage) ? <p>{message}</p> : null}
            </div>
            : <div> 
              <h2>Sign Up</h2>
              <form onSubmit={handleSignup}>
                <input required type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)}/>
                <input required type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
                <button className='login-btn' type="submit" onClick={showSpinner}>Submit</button>
              </form>
              { 
                  (loginSpin) ? 
                  <div>
                    <FontAwesomeIcon icon={faSpinner} size='3x' className='fa-spin-pulse' />
                  </div>
                  :<div></div>
              }
              {
                signupSuccess ? <p className='greenSuccess'>Signed up successfully! <span onClick={handleLogin}>Login</span></p>
                : <p className='haveAccount'>Already have an account? <span onClick={logInLink} className='signUp'>Login</span></p>
              }
            </div>
         }
      </div> 
      : null
    }
    </div>
</div>
  )
}
