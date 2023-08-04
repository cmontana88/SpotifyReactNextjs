import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { shuffle } from 'lodash';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Song from './Song';

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
      

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500',
]

type ProsPlaylistView = {    
    setView: Dispatch<SetStateAction<string>>;    
    setGlobalArtistId: Dispatch<SetStateAction<null>>;    
    globalPlaylistId: string;
    setGlobalCurrentSongId: Dispatch<SetStateAction<string | undefined>>;    
    setGlobalIsTrackPlaying: Dispatch<SetStateAction<boolean | undefined>>;    
}

const PlaylistView = ({setView, setGlobalArtistId, globalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying}: ProsPlaylistView) => {
    const { data: session } = useSession()
    const [playlistData, setPlaylistData] = useState<ResponsePlaylist>()
    const [color, setColor] = useState(colors[0])
    const [opacity, setOpacity] = useState(0)
    const [textOpacity, setTextOpacity] = useState(0)

    const API_URL:string = "https://localhost:7291";

    const _session = session as SessionType;  // Usa el casting para decirle a TypeScript que token es de tipo JwtToken

    const changeOpacity = (scrollPos: number) => {
        const offset = 300
        const textOffset = 10
        if(scrollPos < offset){
            const newOpacity = 1 -((offset / scrollPos) / offset)
            setOpacity(newOpacity)
            setTextOpacity(0)
        }else{
            const delta = scrollPos - offset
            const newTextOpacity = 1 -((textOffset - delta) / textOffset)
            setTextOpacity(newTextOpacity)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getData = async () => {        
        if(_session && _session.user.accessToken){
            //const { data } = await axios.get(API_URL + "/v1/playlists/" + globalPlaylistId, 
            const { data } = await axios.get(API_URL + "/api/Spotify/playlist/" + globalPlaylistId, 
            {
                headers: {
                    Authorization: "Bearer " + _session.user.accessToken
                }
            }); 
            
            setPlaylistData(data);
        }
    };

    useEffect(() => {
        getData();
    }, [globalPlaylistId])

    useEffect(() => {
        setColor(shuffle(colors).pop()!)
    }, [globalPlaylistId])

    return (
        <div className='flex-grow-0 h-screen '>
            <header style={{opacity: opacity}} className='text-white sticky top-0 h-20 z-10 text-4xl bg-neutral-800 p-8 flex items-center font-bold'>
                <div style={{opacity: textOpacity}} className='flex items-center'> 
                    {playlistData && <img className='h-8 w-8 mr-6' src={playlistData?.images[0].url}  />}
                    {playlistData?.name}
                </div>
            </header>    
            <div onClick={() => signOut()} className='absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                <img className='rounded-full w-7 h-7' src={_session.user.image} alt="profile pic" />
                <p className='text-sm'>Logout</p>
                <ChevronDownIcon className='h5- w-5' />
            </div>
            <div onScroll={(e) => changeOpacity(e.currentTarget.scrollTop)} className='relative -top-20 h-screen overflow-y-scroll bg-neutral-900'>
                <section className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-900 ${color} h-80 text-white p-8`} >
                    {playlistData && <img className='h-44 w-44' src={playlistData?.images[0].url}  />}
                    <div>
                        <p className='tex-sm font-bold'>Playlist</p>
                        <h1 className='text-2xl md:text-3xl font-extrabold lg:text-5xl text-white'>{playlistData?.name}</h1>
                    </div>
                </section>
                <div className='text-white px-8 flex flex-col space-y-1 pb-28'>
                    {
                        playlistData?.tracks.items.map((track: Item, i) => {
                            return <Song 
                                        setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
                                        setGlobalCurrentSongId={setGlobalCurrentSongId}
                                        key={track.track.id}
                                        sno={i} 
                                        track={track.track} 
                                    />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default PlaylistView
