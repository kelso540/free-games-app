import React, {useState, useContext, useEffect} from 'react';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../context/UserContext';
import './CSS/nav.css';

export default function Nav({baseUrl, time, updatedData, handleInput, getAllGames, inputValue, spinnerDiv, genres, filterSports, filterShooter, filterStrategy, filterMMORPG, filterFighting}) {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('default');
  const [backgroundColor, setBackgroundColor] = useState('default');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [message, setMessage] = useState('');
  const {user, setUser, loggedIn, setLoggedIn, hasAvatar, setHasAvatar, holdUsername, setHoldUsername, holdAvatar, setHoldAvatar, holdColor, setHoldColor, changeBackgroundColor, colorSelected, setColorSelected, selected, setSelected} = useContext(UserContext);

  user.username = holdUsername;
  user.imageUrl = holdAvatar; 
  user.backgroundColor = colorSelected; 

  const handleAvatar = () => {
    if(holdAvatar !== 'default'){
      setHasAvatar(true); 
    }
  }

  const handleSignup=(e)=>{
      e.preventDefault()
      axios.post(`${baseUrl}/users/register`, {
      username, password, imageUrl, backgroundColor //match to same names on table
    })

    .then(res=>{
      setSignupSuccess(true)
      setMessage('Thanks for signing up! Now you can LOG IN!')
      console.log(res.data)
    })
    .catch(err=> console.log(err))
    }

    const handleLogin=(e)=>{ 
      e.preventDefault()
      axios.post(`${baseUrl}/users/login`, {
        username, password
      })
      .then(res=>{
        console.log(res)
        setUser(res.data)
        setHoldUsername(res.data.username)
        setHoldAvatar(res.data.imageUrl)
        setColorSelected(res.data.backgroundColor)
        setLoggedIn(true)
        setModal(false)
        setMessage('') 
      })
      .catch(err=> console.log(err))
    }

    useEffect(()=>{
      changeBackgroundColor();
      handleAvatar();
    }, [handleLogin])

    const handleLogout = () => {
      setUser({})
      setLoggedIn(false)
      setColorSelected('white')
      changeBackgroundColor()
      navigate('/'); 
    }

    const handleCategory = (e) => {
      setSelected(e.target.value); 
    }

  return (
    <div className='navDiv'>
      <Link to='/' className='Link'><strong className='header'>Free For All Games</strong><FontAwesomeIcon icon={faGamepad} size='3x'/></Link>
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
        {
         loggedIn ?
         <div className='profile-container-loggedIn'>
            <Link to='/saved' className='navLinkB'>Saved Games</Link>
            <Link to='/userProfile' className='navLinkB'>Profile</Link>  
            <button className='login-btn' onClick={handleLogout}>Logout</button>
          </div>
         
         :<div className='profile-container-loggedOut'>
            <strong className='time'>{time}</strong>
            <Link to='/about' className='navLink'>About</Link>
            <Link to='/contact' className='navLink'>Contact</Link>
            <button className='login-btn' onClick={()=>setModal(!modal)}>Login</button>
          </div>
        }
     

      
      {
        modal ? <div className='header-modal'>
                   <h3 onClick={()=>{setModal(false)}} className='clearX'>X</h3>
           {
              userExists ? <div> 
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <input type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)}/>
                  <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
                  <button className='login-btn' type="submit">Submit</button>
                </form>
                <p className='haveAccount'>Don't have an account? <span onClick={()=>{setUserExists(false)}} className='signUp'>Sign up</span></p>
                {message !== '' ? <p>{message}</p> : null}
              </div>
              : <div> 
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                  <input type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)}/>
                  <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
                  <button className='login-btn' type="submit">Submit</button>
                </form>
                {
                  signupSuccess ? <p className='greenSuccess'>Signed up successfully. <span onClick={()=>{setUserExists(true)}}>Login</span></p>
                  : <p className='haveAccount'>Already have an account? <span onClick={()=>{setUserExists(true)}} className='signUp'>Login</span></p>
                }
              </div>
           }
        </div> 
        : null
      }
    </div>
  )
}
