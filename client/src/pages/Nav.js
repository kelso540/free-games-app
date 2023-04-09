import React, {useState, useContext, useEffect, useCallback} from 'react';
import { faGamepad, faBars, faX, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../context/UserContext';
import './CSS/nav.css';
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';

export default function Nav({baseUrl, time, handleInput, getAllGames, inputValue, genres, filterCategory}) {

  const {user, setUser, loggedIn, setLoggedIn, hasAvatar, setHasAvatar, holdUsername, setHoldUsername, holdAvatar, setHoldAvatar, holdColor, setHoldColor, changeBackgroundColor, colorSelected, setColorSelected, selected, setSelected, displayHead, setDisplayHead, updatedData, setUpdatedData, category, setCategory, navPage, setNavPage, showNavInput, setShowNavInput, menu, setMenu, spinnerDiv, setSpinnerDiv, setOverallPage, resultsPerPage, setPageNumberA, setPageNumberB} = useContext(UserContext);

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('default');
  const [backgroundColor, setBackgroundColor] = useState('default');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const [message, setMessage] = useState('');
  const [loginSpin, setLoginSpin] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false); 

  // user.email = holdUsername;
  // user.photoURL = holdAvatar; 
  // user.displayName = colorSelected; 

  useEffect(()=>{
    const handleAvatar = () => {
      if(holdAvatar !== 'default'){
        setHasAvatar(true); 
      } else {
        setHasAvatar(false);
      }
    }
    handleAvatar(); 
  }, [holdAvatar, setHasAvatar]);

  const handleSignup = (e)=>{
    e.preventDefault(); 
    createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      setSignupSuccess(true)
      setLoginSpin(false)
      setDisplayMessage(true)
      setMessage('Thanks for signing up! You can now LOG IN!') 
    })
    .catch(function(){
      messageDisplay();
    });
}; 

  // const handleSignup=(e)=>{
  //     e.preventDefault()
  //     axios.post(`${baseUrl}/users/register`, {
  //     username, password, imageUrl, backgroundColor //match to same names on table
  //   })
  //   .then(res=>{
  //     setSignupSuccess(true)
  //     setLoginSpin(false)
  //     setDisplayMessage(true)
  //     setMessage('Thanks for signing up! You can now LOG IN!')
  //   })
  //   .catch(function(){
  //     messageDisplay();
  //   })
  //   }


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
        setUsername('');
        setPassword('');
        reSetHome(); 
    })
    .catch((error)=>{
      console.log(error.code)
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

    // const handleLogin=(e)=>{ 
    //   e.preventDefault()
    //   axios.post(`${baseUrl}/users/login`, {
    //     username, password
    //   })
    //   .then(res=>{
    //     setUser(res.data)
    //     setHoldUsername(res.data.username)
    //     setHoldAvatar(res.data.imageUrl)
    //     setColorSelected(res.data.backgroundColor)
    //     setLoginSpin(false)
    //     setLoggedIn(true)
    //     setModal(false)
    //     setMessage('')
    //     setMenu(false)
    //     setUsername('');
    //     setPassword('');
    //     reSetHome(); 
    //   })
    //   .catch(function(){
    //     setMessage('No user with that username exists sign up!')
    //     setDisplayMessage(true)
    //     setLoginSpin(false)
    //   })
    // }

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

    // const handleLogout = () => {
    //   setUser({});
    //   setUserExists(false);
    //   setLoggedIn(false);
    //   setSignupSuccess(false);
    //   setDisplayHead(false);
    //   setColorSelected('#f2e9e4');
    //   setMenu(false);
    //   changeBackgroundColor();
    //   setLoginSpin(false);
    //   reSetHome();
    //   navigate('/'); 
    // }

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
      setDisplayHead(true);
      setPageNumberA(resultsPerPage); 
      setPageNumberB(0); 
      setOverallPage(1);
    }, [selected, filterCategory, setDisplayHead, setOverallPage, setPageNumberA, setPageNumberB, resultsPerPage]);

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
          <select value={selected} onChange={handleCategory}>
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
          <div>
            <strong style={{color: 'white'}}>Filter a genre here </strong>
            <select className='mobileSelect' value={selected} onChange={handleCategory}>
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
