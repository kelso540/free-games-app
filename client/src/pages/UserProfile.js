import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSS/user.css';
import { auth } from '../Firebase';
import { updateProfile, deleteUser, updateEmail } from "firebase/auth";

export default function UserProfile({baseUrl, userBtn}) {

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

    const {hasAvatar, setHasAvatar, user, setUser, loggedIn, setLoggedIn, holdUsername, setHoldUsername, holdAvatar, setHoldAvatar, holdColor, setHoldColor, colorSelected, setColorSelected, changeBackgroundColor,  navPage, setNavPage, showNavInput, setShowNavInput, menu, setMenu} = useContext(UserContext);

    const [displayUserSuccess, setDisplayUserSuccess] = useState(false);
    const [displayImgSuccess, setDisplayImgSuccess] = useState(false);
    const [displayBkgSuccess, setDisplayBkgSuccess] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newAvatar, setNewAvatar] = useState('');
    const [check, setCheck] = useState(false);  

    const changeUserId=(e)=>{
      e.preventDefault();
      updateEmail(auth.currentUser, newUsername).then(() => {
        setNewUsername('');
        setDisplayUserSuccess(true);
        setHoldUsername(newUsername);
      }).catch((error) => {
        console.log(error)
      });
    };

    // const changeUserId=(e)=>{ 
    //   e.preventDefault();
    //     axios.patch(`${baseUrl}/users/${user.id}`,  {
    //         username: newUsername
    //     })
    //     .then(res=>{
    //      console.log(res)
    //     })
    //     .catch(err=> console.log(err))
    //     setNewUsername('');
    //     setDisplayUserSuccess(true);
    //     setHoldUsername(newUsername);
    // }

    const deleteAccount=(e)=>{
      e.preventDefault();
      const user = auth.currentUser;
      deleteUser(user).then(() => {
        setLoggedIn(false);
        setShowNavInput(true);
        setNavPage(''); 
        setMenu(false);
        navigate('/'); 
      }).catch((error) => {
        console.log(error)
      });
    };

    // const deleteAccount=(e)=>{ 
    //   e.preventDefault();
    //     axios.delete(`${baseUrl}/users/${user.id}`)
    //     .then(res=>{
    //      console.log(res)
    //     })
    //     .catch(err=> console.log(err))
    //     setLoggedIn(false);
    //     setShowNavInput(true);
    //     setNavPage(''); 
    //     setMenu(false);
    //     navigate('/');  
    // }

    const changeUserAvatar=(e)=>{
      e.preventDefault();
      updateProfile(auth.currentUser, {
        photoURL: newAvatar,
      }).then(() => {
        setHasAvatar(true); 
        setNewAvatar('');
        setHoldAvatar(newAvatar);
        setDisplayImgSuccess(true);
      }).catch((error) => {
        console.log(error)
      });
    };

    const removeUserAvatar=(e)=>{
      e.preventDefault();
      updateProfile(auth.currentUser, {
        photoURL: 'default',
      }).then(() => {
        setHasAvatar(false); 
        setNewAvatar('');
        setHoldAvatar('default');
        setDisplayImgSuccess(true);
      }).catch((error) => {
        console.log(error)
      });
    };

  
    // const changeUserAvatar=(e)=>{ 
    //   e.preventDefault();
    //     axios.patch(`${baseUrl}/users/${user.id}`,  {
    //       imageUrl: newAvatar
    //     })
    //     .then(res=>{
    //     console.log(res)
    //     })
    //     .catch(err=> console.log(err))
    //     setHasAvatar(true); 
    //     setNewAvatar('');
    //     setHoldAvatar(newAvatar);
    //     setDisplayImgSuccess(true);
    // }

    // const removeUserAvatar=(e)=>{ 
    //   e.preventDefault();
    //     axios.patch(`${baseUrl}/users/${user.id}`,  {
    //       imageUrl: 'default'
    //     })
    //     .then(res=>{
    //     console.log(res)
    //     })
    //     .catch(err=> console.log(err))
    //     setHasAvatar(false); 
    //     setNewAvatar('');
    //     setHoldAvatar('default');
    //     setDisplayImgSuccess(true);
    // }

    const changeUserBackgroundColor=(e)=>{
      e.preventDefault();
      updateProfile(auth.currentUser, {
        displayName: colorSelected,
      }).then(() => {
        changeBackgroundColor();
        setDisplayBkgSuccess(true);
      }).catch((error) => {
        console.log(error)
      });
    };

    // const changeUserBackgroundColor=(e)=>{ 
    //   e.preventDefault();
    //     axios.patch(`${baseUrl}/users/${user.id}`,  {
    //       backgroundColor: colorSelected
    //     })
    //     .then(res=>{
    //       console.log(res)
    //     })
    //     .catch(err=> console.log(err))
    //     changeBackgroundColor();
    //     setDisplayBkgSuccess(true);
    // }

    const handleChangeColor = (e) => {
      setColorSelected(e.target.value);
    }

    const scrollDown = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
      });
    }

    const areYouSure = () => {
      setCheck(true);
      setTimeout(scrollDown, 100);
    }

  return (
    <div className='profileDiv'>
        <h1>Your Profile</h1>
        <h2>Current email <strong className='userName'>{user.email}</strong></h2>

        <h2>Change your email</h2>
        <form onSubmit={changeUserId}>
            <input type="email" value={newUsername} placeholder="Enter new email address" onChange={(e)=>setNewUsername(e.target.value)} required/>
            <button className={(userBtn)?'userBtn':'userBtnDark'} type='submit'>Change</button>
            {
              (displayUserSuccess)?
              <p>Success!</p>
              :null
            }
        </form>

        <h2>{(hasAvatar)? 'Change' :'Add'} your profile image</h2>
        {
          (hasAvatar) ?
          <img className='avatar' src={user.photoURL} alt="avatar"/>
          :null 
        }
        <form onSubmit={changeUserAvatar}>
            <input type="text" value={newAvatar} placeholder="Enter image url" onChange={(e)=>setNewAvatar(e.target.value)} required/>
            <div className='buttons'>
              <button className={(userBtn)?'userBtn':'userBtnDark'} type='submit'>{(hasAvatar)? 'Change' :'Add'}</button>
              <button className={(userBtn)?'userBtn':'userBtnDark'} onClick={removeUserAvatar}>Remove Image</button>
            </div>
            {
              (displayImgSuccess)?
              <p>Success!</p>
              :null
            }
        </form>

        <h2>Change your background color</h2>
        <select className='genreSelect' value={colorSelected} onChange={handleChangeColor}>
          {
            colors.map((item)=>{
              return <option key={item.id} value={item.color}> {item.text} </option>
            })
          }
        </select>
        <button className={(userBtn)?'userBtn':'userBtnDark'} onClick={changeUserBackgroundColor}>Save</button> 
            {
              (displayBkgSuccess)?
              <p>Success!</p>
              :null
            }
        <h2>Delete Account</h2>
        <button className={(userBtn)?'userBtn':'userBtnDark'} onClick={areYouSure}>Delete Account</button>
            {
              (check)?
              <div>
                <p>Are you sure?</p>
                <button className={(userBtn)?'userBtn':'userBtnDark'} onClick={deleteAccount}>Yes</button>
                <button className={(userBtn)?'userBtn':'userBtnDark'} onClick={()=>setCheck(false)}>No</button>
              </div>
              :null
            }
    </div>
  )
}


