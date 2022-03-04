import axios from "axios";
import {useEffect, useState} from "react";

export default function useAuth( code ){
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(()=>{
        axios.post("http://localhost:4000/login",{
            code,
        })
        .then(res=>{
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }, [code])
    
};