export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    playlists: null,
    currentsong: null,
    playbackstate: "",
    //token: "BQBzbOQgzFIyzISwhgLECdWUTypwfvG6Zl2JOJ3D5tj4R4qGefVgMx4zomHJvpOqEU42xnuzZv-FyN6pVzkTtv7UX_Kgtk0cu-4PMAVaCnFpB7mdSiFwhVdfGFQg8zjG709pvAOLgq7QCbBZ9fV5Rgl6geNNFxU4PtLgIm8-d6LqzallEiyi",
};

const reducer = (state, action) => {
    console.log(action);

    switch(action.type){
        case 'SET_USER':
            return {
                ...state, user: action.user, 
            }
        case 'SET_TOKEN':
            return {
                ...state, token: action.token, 
            }
        case 'SET_PLAYLISTS':
            return {
                ...state, playlists: action.playlists, 
            }
        case 'SET_DAILYMIX':
            return {
                ...state, daily_mix: action.daily_mix, 
            }
        case 'SET_CURRENTSONG':
            return {
                ...state, currentsong: action.currentsong, 
            }
        case 'SET_PLAYING':
            return {
                ...state, playing: action.playing, 
            }
        case 'SET_PLAYSTATE':
            return {
                ...state, playbackstate: action.playbackstate
            }
        default:
            return state;
    }
}

export default reducer;