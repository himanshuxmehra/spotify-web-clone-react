import React,{ useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import Player from './Player'
import { getTokenFromResponse } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { useStateValue

} from './StateProvider'

const spotify = new SpotifyWebApi();

function App() {
  //const [token, setToken] = useState(null);
  const [{user, token}, dispatch] = useStateValue();


  useEffect(()=>{
    const hash= getTokenFromResponse();
    console.log("THIS IS IT: ", hash);
    window.location.hash=""
    const _token = hash.access_token;

    if(_token){
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      })
      spotify.setAccessToken(_token);
      spotify.getMe().then(user=>{

        dispatch({
          type: 'SET_USER',
          user: user,
        })

      } )
      spotify.getUserPlaylists().then(
        (playlists)=>{
          dispatch({
            type: "SET_PLAYLISTS",
            playlists: playlists,
          })
        }
      )
      spotify.getPlaylist('37i9dQZF1E35B7RI1Ont8B').then( response => {
        dispatch({
          type: 'SET_DAILYMIX',
          daily_mix: response
        })
      })
    }
  }, []);
  return ( 
    <div className="App">
      {
          token? (
            <Player spotify={spotify}></Player>
          ): (
            <Login></Login>
          )
      }
    </div>
   );
}

export default App;
