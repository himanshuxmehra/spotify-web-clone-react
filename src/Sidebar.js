import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { useStateValue } from "./StateProvider";

function Sidebar(){
    const [{playlists}, dispatch] = useStateValue()
    console.log("playlists",playlists)
    return(
        <div className="sidebar">
            <img className="sidebar__logo" alt="" src="https://i.pinimg.com/280x280_RS/a5/60/1a/a5601a5a539f33eb05fabbe22bd02d17.jpg"></img>

            <SidebarOption Icon={HomeIcon} title="HOME"></SidebarOption>
            <SidebarOption Icon={SearchIcon} title="SEARCH"></SidebarOption>
            <SidebarOption Icon={LibraryMusicIcon} title="YOUR LIBRARY"></SidebarOption>

            <strong className="sidebar__title">PLAYLISTS</strong>
            <hr></hr>

            {playlists?.items?.map((playlist)=>(
            <SidebarOption title={playlist.name}></SidebarOption>
            ))
        }
        </div>
    )
}

export default Sidebar;