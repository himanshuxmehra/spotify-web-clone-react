import React from "react";
import "./Body.css";
import Header from "./Header";
import SongRow from "./SongRow";
import {useStateValue} from "./StateProvider"
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled"
import FavoriteIcon from "@material-ui/icons/Favorite"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"


function Body({spotify}){
    const [{daily_mix}, dispatch] = useStateValue();
    const playPlaylist = (id) => {
        spotify
        .play({
            context_uri: `spotify:playlist:37i9dQZEVXcOdAoZuY906w`,
        })
        .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
            });
        });
    };

    const playSong = (id) => {
        spotify
        .play({
            uris: [`spotify:track:${id}`],
        })
        .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
            });
        });
    };
    console.log(daily_mix)
    return(
        <div className="body">
            <Header spotify={spotify}/>

            <div className="body__info">
                <img src={daily_mix?.images[0].url}
                 alt=""/>
                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>Daily Mix 1</h2>
                    <p>{daily_mix?.description}</p>
                </div>
            </div>

            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilledIcon onClick={playPlaylist} className="body__shuffle"/>
                    <FavoriteIcon fontSize="large"/>
                    <MoreHorizIcon/>
                </div>

                {daily_mix?.tracks.items.map((item) => (
                <SongRow playSong={playSong} track={item.track} />
                ))}

            </div>
        </div>

    )
}

export default Body;