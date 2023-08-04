import { PlayIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { error } from "console"
import { useSession } from "next-auth/react"
import React from "react"
import { Dispatch, SetStateAction, useState } from "react"

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

export interface ResponsePlaylist {    
    collaborative: boolean
    description: string
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    images: Image[]
    name: string
    owner: Owner
    public: boolean
    snapshot_id: string
    tracks: Tracks
    type: string
    uri: string
}

export interface ExternalUrls {
    spotify: string
}

export interface Followers {
    href: string
    total: number
}

export interface Image {
    url: string
    height: number
    width: number
}

export interface Owner {
    external_urls: ExternalUrls2
    followers: Followers2
    href: string
    id: string
    type: string
    uri: string
    display_name: string
}

export interface ExternalUrls2 {
    spotify: string
}

export interface Followers2 {
    href: string
    total: number
}

export interface Tracks {
    href: string
    limit: number
    next: string
    offset: number
    previous: string
    total: number
    items: Item[]
}

export interface Item {
    added_at: string
    added_by: AddedBy
    is_local: boolean
    track: Track
}

export interface AddedBy {
    external_urls: ExternalUrls3
    followers: Followers3
    href: string
    id: string
    type: string
    uri: string
}

export interface ExternalUrls3 {
    spotify: string
}

export interface Followers3 {
    href: string
    total: number
}

export interface Track {
    album: Album
    artists: Artist2[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: ExternalIds2
    external_urls: ExternalUrls7
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
    external_urls: ExternalUrls4
    href: string
    id: string
    images: Image2[]
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

export interface ExternalUrls4 {
    spotify: string
}

export interface Image2 {
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
    external_urls: ExternalUrls5
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface ExternalUrls5 {
    spotify: string
}

export interface Artist2 {
    external_urls: ExternalUrls6
    followers: Followers4
    genres: string[]
    href: string
    id: string
    images: Image3[]
    name: string
    popularity: number
    type: string
    uri: string
}

export interface ExternalUrls6 {
    spotify: string
}

export interface Followers4 {
    href: string
    total: number
}

export interface Image3 {
    url: string
    height: number
    width: number
}

export interface ExternalIds2 {
    isrc: string
    ean: string
    upc: string
}

export interface ExternalUrls7 {
    spotify: string
}

export interface LinkedFrom {}

export interface Restrictions2 {
reason: string
}

type songProps = {
    sno: number,
    track: Track,
    setGlobalCurrentSongId: Dispatch<SetStateAction<string | undefined>>,
    setGlobalIsTrackPlaying: Dispatch<SetStateAction<boolean | undefined>>,
}

const Song = ({sno, track, setGlobalIsTrackPlaying, setGlobalCurrentSongId}: songProps) => {
    const { data: session } = useSession()
    const [hover, setHover] = useState(false)

    const API_URL:string = "https://localhost:7291";

    const _session = session as SessionType;  // Usa el casting para decirle a TypeScript que token es de tipo JwtToken

    const millisToMinutesAndSeconds = (millis: number) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = Number(((millis % 60000) / 1000).toFixed(0));
        return(
            seconds == 60 ? (minutes + 1) + ":00" : minutes.toString() + ":" + (seconds < 10 ? "0" : "") + seconds.toString()
        )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getData = async () => {        
        if(_session && _session.user.accessToken){
            const { data } = await axios.put(API_URL + "/v1/me/player/play",
            {
                body: JSON.stringify({
                    uris: [track.uri]
                })
            },
            {
                headers: {
                    Authorization: "Bearer " + _session.user.accessToken
                }
            }).catch((error) => {
                setGlobalIsTrackPlaying(false)        
                return error;
            });        
            console.log("on play", data)
        }
    };

    const playSong = async(track: Track) => {
        setGlobalCurrentSongId(track.id)
        setGlobalIsTrackPlaying(true)

        //await getData()
    }

    return(
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="grid grid-cols-2 text-neutral-400 text-sm py-4 px-5 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-default">
            <div className="flex items-center space-x-4">
                {hover ? <PlayIcon onClick={async() => await playSong(track)} className="h-5 w-5 text-white" /> :  <p className="w-5">{sno + 1}</p>}
                {track.album.images[0].url && <img className="h-10 w-10" src={track.album.images[0].url} alt="pic song" />}
                <div>
                    <p className="w-36 truncate text-white text-base">{track.name}</p>
                    <p className="w-36 truncate">
                        {
                            track.artists.map((artist: Artist, i:number) => {
                                return(
                                    <React.Fragment key={artist.id || i}>
                                        <span className="hover:underline">{artist.name}</span>
                                        <span>{i !== track.artists.length - 1 ? ", " : null}</span>
                                    </React.Fragment>
                                )
                            })
                        }
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="w-40 truncate hidden md:inline">{track.album.name}</p>
                <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song