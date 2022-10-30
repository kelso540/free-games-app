import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserProfile({baseUrl}) {

    const navigate = useNavigate(); 

    const colors = [
      {id: 0, color: 'none', text: 'Choose a color'},
      {id: 1, color: '#772014', text: 'Red'},
      {id: 2, color: '#99B2DD', text: 'Blue'},
      {id: 3, color: '#558564', text: 'Green'},
      {id: 4, color: '#E9724C', text: 'Orange'},
      {id: 5, color: '#361134', text: 'Purple'},
      {id: 6, color: 'white', text: 'Light'},
      {id: 7, color: 'black', text: 'Dark'},
    ]

    const {hasAvatar, setHasAvatar, user, setUser, loggedIn, setLoggedIn, holdUsername, setHoldUsername, holdAvatar, setHoldAvatar, holdColor, setHoldColor, colorSelected, setColorSelected, changeBackgroundColor} = useContext(UserContext);

    const [displayUserSuccess, setDisplayUserSuccess] = useState(false);
    const [displayImgSuccess, setDisplayImgSuccess] = useState(false);
    const [displayBkgSuccess, setDisplayBkgSuccess] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newAvatar, setNewAvatar] = useState('');
    const [check, setCheck] = useState(false);  

    const changeUserId=(e)=>{ 
      e.preventDefault();
        axios.patch(`${baseUrl}/users/${user.id}`,  {
            username: newUsername
        })
        .then(res=>{
         console.log(res)
        })
        .catch(err=> console.log(err))
        setNewUsername('');
        setDisplayUserSuccess(true);
        setHoldUsername(newUsername);
    }

    const deleteAccount=(e)=>{ 
      e.preventDefault();
        axios.delete(`${baseUrl}/users/${user.id}`)
        .then(res=>{
         console.log(res)
        })
        .catch(err=> console.log(err))
        setLoggedIn(false);
        navigate('/');  
    }

    const changeUserAvatar=(e)=>{ 
      e.preventDefault();
        axios.patch(`${baseUrl}/users/${user.id}`,  {
          imageUrl: newAvatar
        })
        .then(res=>{
        console.log(res)
        })
        .catch(err=> console.log(err))
        setHasAvatar(true); 
        setNewAvatar('');
        setHoldAvatar(newAvatar);
        setDisplayImgSuccess(true);
    }

    const removeUserAvatar=(e)=>{ 
      e.preventDefault();
        axios.patch(`${baseUrl}/users/${user.id}`,  {
          imageUrl: 'default'
        })
        .then(res=>{
        console.log(res)
        })
        .catch(err=> console.log(err))
        setHasAvatar(false); 
        setNewAvatar('');
        setHoldAvatar('default');
        setDisplayImgSuccess(true);
    }

    const changeUserBackgroundColor=(e)=>{ 
      e.preventDefault();
        axios.patch(`${baseUrl}/users/${user.id}`,  {
          backgroundColor: colorSelected
        })
        .then(res=>{
          console.log(res)
        })
        .catch(err=> console.log(err))
        changeBackgroundColor();
        setDisplayBkgSuccess(true);
    }

    const handleChangeColor = (e) => {
      setColorSelected(e.target.value);
    }

    const areYouSure = () => {
      setCheck(true);
    }

  return (
    <div>
        <h1>Your Profile</h1>
        <h2>Current username {user.username}</h2>

        <h2>Change your username</h2>
        <form onSubmit={changeUserId}>
            <input type="text" value={newUsername} placeholder="Enter new user id" onChange={(e)=>setNewUsername(e.target.value)} required/>
            <button type='submit'>Change</button>
            {
              (displayUserSuccess)?
              <p>Success!</p>
              :null
            }
        </form>

        <h2>{(hasAvatar)? 'Change' :'Add'} your profile image</h2>
        <form onSubmit={changeUserAvatar}>
            <input type="text" value={newAvatar} placeholder="Enter image url" onChange={(e)=>setNewAvatar(e.target.value)} required/>
            <button type='submit'>{(hasAvatar)? 'Change' :'Add'}</button><button onClick={removeUserAvatar}>Remove</button>
            {
              (displayImgSuccess)?
              <p>Success!</p>
              :null
            }
        </form>

        <select value={colorSelected} onChange={handleChangeColor}>
          {
            colors.map((item)=>{
              return <option key={item.id} value={item.color}> {item.text} </option>
            })
          }
        </select>
        <button onClick={changeUserBackgroundColor}>Change</button> 
            {
              (displayBkgSuccess)?
              <p>Success!</p>
              :null
            }
        <button onClick={areYouSure}>Delete Account</button>
            {
              (check)?
              <div>
                <p>Are you sure?</p>
                <button onClick={deleteAccount}>Yes</button>
                <button onClick={()=>setCheck(false)}>No</button>
              </div>
              :null
            }
    </div>
  )
}


