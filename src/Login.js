import React from "react";
import "./Login.css";
import {loginUrl} from "./spotify";
function Login(){
    return(
        <div className="login">
            <img alt="" src="https://i.pinimg.com/280x280_RS/a5/60/1a/a5601a5a539f33eb05fabbe22bd02d17.jpg"></img>
            <a href={loginUrl}>Login With Spotify</a>
        </div>
    )
}

export default Login;