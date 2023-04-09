import './App.css';
import Fetch from './pages/Fetch';
import {useEffect, useState} from 'react'; 
import Nav from './pages/Nav';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Saved from './pages/Saved';
import {UserContext} from './context/UserContext';
import UserProfile from './pages/UserProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import KEYS from './config'; 
import GameDetails from './pages/GameDetails';
//hello
function App() {

  const genres = [
    {id: 1, name: '', text: 'Select genre'},
    {id: 2, name: 'Sports', text: 'Sports'},
    {id: 3, name: 'Shooter', text: 'Shooter'},
    {id: 4, name: 'Strategy', text: 'Strategy'},
    {id: 5, name: 'MMORPG', text: 'MMORPG'},
    {id: 6, name: 'Fighting', text: 'Fighting'}
  ]

const baseUrl = KEYS.PORT;
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
const [holdAvatar, setHoldAvatar] = useState('default');
const [holdColor, setHoldColor] = useState('');
const [colorSelected, setColorSelected] = useState('');
const [time, setTime] = useState(''); 
const [displayHead, setDisplayHead] = useState(false); 
const [category, setCategory] = useState(''); 
const [userBtn, setUserBtn] = useState(true);
const [menu, setMenu] = useState(false); 
const [showNavInput, setShowNavInput] = useState(true);
const [navPage, setNavPage] = useState('');
const [overallPage, setOverallPage] = useState(null); 

  // mmorpg, shooter, strategy, moba, racing, sports, social, sandbox, open-world, survival, pvp, pve, pixel, voxel, zombie, turn-based, first-person, third-Person, top-down, tank, space, sailing, side-scroller, superhero, permadeath, card, battle-royale, mmo, mmofps, mmotps, 3d, 2d, anime, fantasy, sci-fi, fighting, action-rpg, action, military, martial-arts, flight, low-spec, tower-defense, horror, mmorts

  const changeBackgroundColor = () => {
    let body = document.querySelector('body');  
    body.style.backgroundColor = colorSelected; 
    if(colorSelected === 'black' || colorSelected === '#558564' || colorSelected === '#361134' || colorSelected === '#772014'){
      body.style.color = 'white';
      setUserBtn(false); 
    } else {
      body.style.color = 'black';
      setUserBtn(true); 
    }
  }

  const changeData = (data) => {
      setData(data); 
  }
  
  useEffect(()=>{
      const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': KEYS.GAME_API,
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
      setDisplayHead(false);
      setCategory('')
    }
  }, [inputValue]); 

  useEffect(()=>{ 
    const time = new Date();
    const newTime = time.toString().split(' '); 
    console.log(newTime); 
    setTime(newTime[0] + ' ' + newTime[1] + ' ' + newTime[2] + ' ' + newTime[3])
  }, []);

  const handleInput = (e) => {
    let filtered = data.filter(item=>item.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setUpdatedData(filtered); 
    setInputValue(e.target.value);
    setCategory(e.target.value);
    setOverallPage(1);
    setDisplayHead(true); 
  }

  const getAllGames = () => {
    setDisplayHead(true);
    setSpinnerDiv(false);
    setSelected("Select category");
    setInputValue('');
    setTimeout(showAllGames, 300);
  }

  const showAllGames = () => {
    setSpinnerDiv(true);
    setUpdatedData(data);
    console.log('hitter')
    setCategory('All Games')
  }

  const filterSports = () => {
    let filterGames = data.filter(item=>item.genre === 'Sports' || item.genre === 'Racing')
    setDisplayHead(true);
    setUpdatedData(filterGames);
    setCategory('Sports')
    setInputValue('');
  }

  const filterShooter = () => {
    let filterGames = data.filter(item=>item.genre === 'Shooter')
    setDisplayHead(true);
    setUpdatedData(filterGames);
    setCategory('Shooter')
    setInputValue('');
  }

  const filterStrategy = () => {
    let filterGames = data.filter(item=>item.genre === 'Strategy')
    setDisplayHead(true);
    setUpdatedData(filterGames);
    setCategory('Strategy')
    setInputValue('');
  }

  const filterMMORPG = () => {
    let filterGames = data.filter(item=>item.genre === 'MMORPG')
    setDisplayHead(true);
    setUpdatedData(filterGames);
    setCategory('MMORPG')
    setInputValue('');
  }

  const filterFighting = () => {
    let filterGames = data.filter(item=>item.genre === 'Fighting')
    setDisplayHead(true);
    setUpdatedData(filterGames);
    setCategory('Fighting')
    setInputValue('');
  }

  return (
    <UserContext.Provider value={{
      user, setUser, 
      savedGames, setSavedGames, 
      userSavedGames, setUserSavedGames, 
      data, 
      updatedData, setUpdatedData, 
      loggedIn, setLoggedIn, 
      selected, setSelected, 
      hasAvatar, setHasAvatar, 
      holdUsername, setHoldUsername, 
      holdAvatar, setHoldAvatar, 
      holdColor, setHoldColor, 
      colorSelected, setColorSelected, 
      changeBackgroundColor, 
      displayHead, setDisplayHead, 
      category, setCategory, 
      navPage, setNavPage, 
      showNavInput, setShowNavInput, 
      menu, setMenu, 
      spinnerDiv, setSpinnerDiv, 
      overallPage, setOverallPage
    }}>
      <div className="App">
        <BrowserRouter>
        <Nav baseUrl={baseUrl} time={time} updatedData={updatedData} handleInput={handleInput} getAllGames={()=>getAllGames()} inputValue={inputValue} filterSports={filterSports} filterShooter={filterShooter} filterStrategy={filterStrategy} filterMMORPG={filterMMORPG} filterFighting={filterFighting} spinnerDiv={spinnerDiv} genres={genres} />
        <Routes>
          <Route path='/' element={<Fetch updatedData={updatedData} handleInput={handleInput} getAllGames={getAllGames} inputValue={inputValue} baseUrl={baseUrl} filterSports={filterSports} filterShooter={filterShooter} filterStrategy={filterStrategy} filterMMORPG={filterMMORPG} filterFighting={filterFighting} spinnerDiv={spinnerDiv} genres={genres} />} />
          <Route path='/gameDetails/:id' element={<GameDetails />} />
          <Route path='/saved' element={<Saved user={user} baseUrl={baseUrl} />} />
          <Route path='/userProfile' element={<UserProfile baseUrl={baseUrl} userBtn={userBtn} />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
