import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline"
import axios from "axios";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface SessionType {
    user: User
    expires: string
}
  
export interface User {
    name: string
    email: string
    image: string
    accessToken: string;
    refreshToken: string;
}

export interface ResponseCurrentSong {
    device: Device
    repeat_state: string
    shuffle_state: boolean
    context: Context
    timestamp: number
    progress_ms: number
    is_playing: boolean
    item: Item
    currently_playing_type: string
    actions: Actions
  }
  
  export interface Device {
    id: string
    is_active: boolean
    is_private_session: boolean
    is_restricted: boolean
    name: string
    type: string
    volume_percent: number
  }
  
  export interface Context {
    type: string
    href: string
    external_urls: ExternalUrls
    uri: string
  }
  
  export interface ExternalUrls {
    spotify: string
  }
  
  export interface Item {
    album: Album
    artists: Artist2[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: ExternalIds2
    external_urls: ExternalUrls5
    href: string
    id: string
    is_playable: boolean
    linked_from: LinkedFrom
    restrictions: Restrictions2
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
    is_local: boolean
  }
  
  export interface Album {
    album_type: string
    total_tracks: number
    available_markets: string[]
    external_urls: ExternalUrls2
    href: string
    id: string
    images: Image[]
    name: string
    release_date: string
    release_date_precision: string
    restrictions: Restrictions
    type: string
    uri: string
    copyrights: Copyright[]
    external_ids: ExternalIds
    genres: string[]
    label: string
    popularity: number
    album_group: string
    artists: Artist[]
  }
  
  export interface ExternalUrls2 {
    spotify: string
  }
  
  export interface Image {
    url: string
    height: number
    width: number
  }
  
  export interface Restrictions {
    reason: string
  }
  
  export interface Copyright {
    text: string
    type: string
  }
  
  export interface ExternalIds {
    isrc: string
    ean: string
    upc: string
  }
  
  export interface Artist {
    external_urls: ExternalUrls3
    href: string
    id: string
    name: string
    type: string
    uri: string
  }
  
  export interface ExternalUrls3 {
    spotify: string
  }
  
  export interface Artist2 {
    external_urls: ExternalUrls4
    followers: Followers
    genres: string[]
    href: string
    id: string
    images: Image2[]
    name: string
    popularity: number
    type: string
    uri: string
  }
  
  export interface ExternalUrls4 {
    spotify: string
  }
  
  export interface Followers {
    href: string
    total: number
  }
  
  export interface Image2 {
    url: string
    height: number
    width: number
  }
  
  export interface ExternalIds2 {
    isrc: string
    ean: string
    upc: string
  }
  
  export interface ExternalUrls5 {
    spotify: string
  }
  
  export interface LinkedFrom {}
  
  export interface Restrictions2 {
    reason: string
  }
  
  export interface Actions {
    interrupting_playback: boolean
    pausing: boolean
    resuming: boolean
    seeking: boolean
    skipping_next: boolean
    skipping_prev: boolean
    toggling_repeat_context: boolean
    toggling_shuffle: boolean
    toggling_repeat_track: boolean
    transferring_playback: boolean
  }

  export interface ResponseTrack {
    album: Album
    artists: Artist2[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: ExternalIds2
    external_urls: ExternalUrls4
    href: string
    id: string
    is_playable: boolean
    linked_from: LinkedFrom
    restrictions: Restrictions2
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
    is_local: boolean
  }
  
  export interface Album {
    album_type: string
    total_tracks: number
    available_markets: string[]
    external_urls: ExternalUrls
    href: string
    id: string
    images: Image[]
    name: string
    release_date: string
    release_date_precision: string
    restrictions: Restrictions
    type: string
    uri: string
    copyrights: Copyright[]
    external_ids: ExternalIds
    genres: string[]
    label: string
    popularity: number
    album_group: string
    artists: Artist[]
  }
  
  export interface ExternalUrls {
    spotify: string
  }
  
  export interface Image {
    url: string
    height: number
    width: number
  }
  
  export interface Restrictions {
    reason: string
  }
  
  export interface Copyright {
    text: string
    type: string
  }
  
  export interface ExternalIds {
    isrc: string
    ean: string
    upc: string
  }
  
  export interface Artist {
    external_urls: ExternalUrls2
    href: string
    id: string
    name: string
    type: string
    uri: string
  }
  
  export interface ExternalUrls2 {
    spotify: string
  }
  
  export interface Artist2 {
    external_urls: ExternalUrls3
    followers: Followers
    genres: string[]
    href: string
    id: string
    images: Image2[]
    name: string
    popularity: number
    type: string
    uri: string
  }
  
  export interface ExternalUrls3 {
    spotify: string
  }
  
  export interface Followers {
    href: string
    total: number
  }
  
  export interface Image2 {
    url: string
    height: number
    width: number
  }
  
  export interface ExternalIds2 {
    isrc: string
    ean: string
    upc: string
  }
  
  export interface ExternalUrls4 {
    spotify: string
  }
  
  export interface LinkedFrom {}
  
  export interface Restrictions2 {
    reason: string
  }
  
  

type playerProps = {
    globalCurrentSongId: string | undefined;
    setGlobalCurrentSongId: Dispatch<SetStateAction<string | undefined>>;
    setGlobalIsTrackPlaying: Dispatch<SetStateAction<boolean | undefined>>;
    globalIsTrackPlaying: boolean | undefined;
}

const Player = ({ globalCurrentSongId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, globalIsTrackPlaying }: playerProps) => {
    const { data: session } = useSession()
    const [songInfo, setSongInfo] = useState<ResponseTrack>()

    const API_URL:string = "https://localhost:7291";

    const _session = session as SessionType;  // Usa el casting para decirle a TypeScript que token es de tipo JwtToken

    const getSongInfo = async(trackId: string) => {
        if(trackId){
            const { data } = await axios.get(API_URL + "/v1/tracks/" + trackId, 
            {
                headers: {
                    Authorization: "Bearer " + _session.user.accessToken
                }
            }); 
            setSongInfo(data);
        }
    }

    const getCurrentlyPlaying = async() => {
        const { data } = await axios.get(API_URL + "/v1/me/player/currently-playing", 
            {
                headers: {
                    Authorization: "Bearer " + _session.user.accessToken
                }
            }); 
        if(data.status == 204){
            console.log("204 response from current playing")
            return;
        }
        return data;
    }

    const getData = async () => {        
        if(_session && _session.user.accessToken){
            if(!globalCurrentSongId){
                const data = await getCurrentlyPlaying();                
                if(data?.item?.id){
                    setGlobalCurrentSongId(data?.item?.id)
                    if(data.is_playing){
                        setGlobalIsTrackPlaying(true)
                    }
                    await getSongInfo(data?.item?.id);
                }
            }else{
                await getSongInfo(globalCurrentSongId);
            }
            
        }
    };
    
    useEffect(() => {
        getData()
    }, [globalCurrentSongId])

    return(
        <div className="h-24 bg-neutral-800 border-t border-neutral-700 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            <div className="flex items-center space-x-4">
                {
                    songInfo?.album.images[0].url && <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images[0].url} alt="pic song" />
                }
                <div>
                    <p className="text-white text-sm">{songInfo?.name}</p>
                    <p className="text-neutral-400 text-xs">{songInfo?.artists[0]?.name}</p>
                </div>
            </div>
            <div className="flex items-center ju">
                { globalIsTrackPlaying ? <PauseCircleIcon className="h-10 w-10" /> : <PlayCircleIcon className="h-10 w-10" />}
            </div>
        </div>
    )
}

export default Player