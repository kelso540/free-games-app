import './App.css';
import Fetch from './pages/Fetch';
import {useEffect, useState} from 'react'; 
import Nav from './pages/Nav';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Saved from './pages/Saved';
import {UserContext} from './context/UserContext';
import UserProfile from './pages/UserProfile';

function App() {

  const genres = [
    {id: 1, name: '', text: 'Select category'},
    {id: 2, name: 'Sports', text: 'Sports'},
    {id: 3, name: 'Shooter', text: 'Shooter'},
    {id: 4, name: 'Strategy', text: 'Strategy'},
    {id: 5, name: 'MMORPG', text: 'MMORPG'},
    {id: 6, name: 'Fighting', text: 'Fighting'}
  ]

const baseUrl = 'http://localhost:9000';
const [user, setUser] = useState([]);
const [savedGames, setSavedGames] = useState([]);
const [userSavedGames, setUserSavedGames] = useState([])
const [data, setData] = useState([]);
const [updatedData, setUpdatedData] = useState([]);
const [inputValue, setInputValue] = useState('');
const [spinnerDiv, setSpinnerDiv] = useState(true); 
const [loggedIn, setLoggedIn] = useState(false);
const [selected, setSelected] = useState(genres[0]);
const [hasAvatar, setHasAvatar] = useState(false);
const [holdUsername, setHoldUsername] = useState('');
const [holdAvatar, setHoldAvatar] = useState('');
const [holdColor, setHoldColor] = useState('');
const [colorSelected, setColorSelected] = useState('');

  // mmorpg, shooter, strategy, moba, racing, sports, social, sandbox, open-world, survival, pvp, pve, pixel, voxel, zombie, turn-based, first-person, third-Person, top-down, tank, space, sailing, side-scroller, superhero, permadeath, card, battle-royale, mmo, mmofps, mmotps, 3d, 2d, anime, fantasy, sci-fi, fighting, action-rpg, action, military, martial-arts, flight, low-spec, tower-defense, horror, mmorts

  const changeBackgroundColor = () => {
    let body = document.querySelector('body'); 
    body.style.backgroundColor = colorSelected; 
    if(colorSelected === 'black' || colorSelected === '#558564' || colorSelected === '#361134' || colorSelected === '#772014'){
      body.style.color = 'white'; 
    } else {
      body.style.color = 'black';
    }
  }

  const changeData = (data) => {
      setData(data); 
  }
  
  useEffect(()=>{
      const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': '3b06dacf6fmshe11e830ce7c4671p118b98jsn8436ff84c2db',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
      };
      fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
      .then(response => response.json())
      .then(data => changeData(data))
      .catch(err => console.error(err)); 
  }, []);

  useEffect(()=>{
    if(inputValue.length < 1){
      setUpdatedData([]); 
    }
  }, [inputValue]); 

  useEffect(()=>{ //for console.logging
    console.log(savedGames)
    console.log(updatedData)
  }, [savedGames, updatedData])

  const handleInput = (e) => {
    let filtered = data.filter(item=>item.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setUpdatedData(filtered); 
    setInputValue(e.target.value);
  }

  const getAllGames = () => {
    setSpinnerDiv(false);
    setSelected("Select category");
    setInputValue('');
    setTimeout(showAllGames, 700)
  }

  const showAllGames = () => {
    setSpinnerDiv(true);
    setUpdatedData(data);
  }

  const filterSports = () => {
    let filterGames = data.filter(item=>item.genre === 'Sports' || item.genre === 'Racing')
    setUpdatedData(filterGames);
  }

  const filterShooter = () => {
    let filterGames = data.filter(item=>item.genre === 'Shooter')
    setUpdatedData(filterGames);
  }

  const filterStrategy = () => {
    let filterGames = data.filter(item=>item.genre === 'Strategy')
    setUpdatedData(filterGames);
  }

  const filterMMORPG = () => {
    let filterGames = data.filter(item=>item.genre === 'MMORPG')
    setUpdatedData(filterGames);
  }

  const filterFighting = () => {
    let filterGames = data.filter(item=>item.genre === 'Fighting')
    setUpdatedData(filterGames);
  }

  return (
    <UserContext.Provider value={{user, setUser, savedGames, setSavedGames, userSavedGames, setUserSavedGames, data, updatedData, setUpdatedData, loggedIn, setLoggedIn, selected, setSelected, hasAvatar, setHasAvatar, holdUsername, setHoldUsername, holdAvatar, setHoldAvatar, holdColor, setHoldColor, colorSelected, setColorSelected, changeBackgroundColor}}>
      <div className="App">
        <BrowserRouter>
        <Nav baseUrl={baseUrl}/>
        <Routes>
          <Route path='/' element={<Fetch updatedData={updatedData} handleInput={handleInput} getAllGames={getAllGames} inputValue={inputValue} baseUrl={baseUrl} filterSports={filterSports} filterShooter={filterShooter} filterStrategy={filterStrategy} filterMMORPG={filterMMORPG} filterFighting={filterFighting} spinnerDiv={spinnerDiv} genres={genres} />} />
          <Route path='/saved' element={<Saved baseUrl={baseUrl} />} />
          <Route path='/userProfile' element={<UserProfile baseUrl={baseUrl} />} />
        </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
