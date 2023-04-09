const dbEngine = process.env.DB_ENVIRONMENT || 'development';
const config = require('./knexfile')[dbEngine]

module.exports = require('knex')(config); 

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

    //   const addNewSavedGame=(name, imgUrl, description, url)=>{ 
//     axios.post(`${baseUrl}/users/${user.id}/savedGames`, {
//     name, imgUrl, description, url
//    })
//    .then(res=>{
//      console.log(res)
//      setSuccess(true)
//    })
//    .catch(err=> console.log(err))
// }

  // const deleteSavedGame = () => {
  //   axios.delete(`${baseUrl}/savedGames/${id}`)
  //   .then(res=>{
  //     console.log(res)
  //   })
  //   const deleteSaved = userSavedGames.filter(item=>item.id !== id);
  //   setUserSavedGames(deleteSaved); 
  // }