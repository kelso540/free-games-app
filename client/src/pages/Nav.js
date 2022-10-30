import React, {useState, useContext, useEffect} from 'react';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../context/UserContext';
import './CSS/nav.css';

export default function Nav({baseUrl}) {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('default');
  const [backgroundColor, setBackgroundColor] = useState('default');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const [message, setMessage] = useState('');
  const {user, setUser, loggedIn, setLoggedIn, hasAvatar, setHasAvatar, holdUsername, setHoldUsername, holdAvatar, setHoldAvatar, holdColor, setHoldColor, changeBackgroundColor, colorSelected, setColorSelected} = useContext(UserContext);

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

  return (
    <div>
      <h1><Link to='/'>Free For All Games <FontAwesomeIcon icon={faGamepad} size='3x'/></Link></h1>
        {
         loggedIn ?
         <div className='profile-container-loggedin'>
           <div className='img-container'>
            <p>Welcome {user.username}</p>
            {
              (hasAvatar) ?
              <img src={user.imageUrl} alt="avatar"/>
              :null 
            }
            <Link to='/userProfile'>Profile</Link>
           </div>  
           <button className='logout-btn' onClick={handleLogout}>Logout</button>
           <Link to='/saved'>Saved Games</Link>
         </div>
         
         : <div className='profile-container-loggedout'>
             <p>Login to save games!</p>
             <button className='login-btn' onClick={()=>setModal(!modal)}>Login</button>
           </div>
        }
     

      
      {
        modal ? <div className='header-modal'>
                   <h3 onClick={()=>{setModal(false)}}>X</h3>
           {
              userExists ? <div> 
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <input type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)}/>
                  <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
                  <button className='login-btn' type="submit">Submit</button>
                </form>
                <p>Don't have an account? <span onClick={()=>{setUserExists(false)}}>Sign up</span></p>
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
                  signupSuccess ? <p style={{"color":"green"}}>Signed up successfully. <span onClick={()=>{setUserExists(true)}}>Login</span></p>
                  : <p>Already have an account? <span onClick={()=>{setUserExists(true)}}>Login</span></p>
                }
              </div>
           }
        </div> 
        : null
      }
    </div>
  )
}
