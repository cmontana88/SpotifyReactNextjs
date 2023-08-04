import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { signOut, useSession } from "next-auth/react"
import { Dispatch, LegacyRef, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react"
import { type } from 'os';
import FeaturedPlaylists from "./FeaturedPlaylist";
import SearchResult from "./SearchResult";
import { Playlist } from './FeaturedPlaylist';

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

export interface ResponseSearch {
    tracks: Tracks
    artists: Artists
    albums: Albums
    playlists: Playlists
    shows: Shows
    episodes: Episodes
    audiobooks: Audiobooks
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
  
  export interface Artists {
    href: string
    limit: number
    next: string
    offset: number
    previous: string
    total: number
    items: Item2[]
  }
  
  export interface Item2 {
    external_urls: ExternalUrls5
    followers: Followers2
    genres: string[]
    href: string
    id: string
    images: Image3[]
    name: string
    popularity: number
    type: string
    uri: string
  }
  
  export interface ExternalUrls5 {
    spotify: string
  }
  
  export interface Followers2 {
    href: string
    total: number
  }
  
  export interface Image3 {
    url: string
    height: number
    width: number
  }
  
  export interface Albums {
    href: string
    limit: number
    next: string
    offset: number
    previous: string
    total: number
    items: Item3[]
  }
  
  export interface Item3 {
    album_type: string
    total_tracks: number
    available_markets: string[]
    external_urls: ExternalUrls6
    href: string
    id: string
    images: Image4[]
    name: string
    release_date: string
    release_date_precision: string
    restrictions: Restrictions3
    type: string
    uri: string
    copyrights: Copyright2[]
    external_ids: ExternalIds3
    genres: string[]
    label: string
    popularity: number
    album_group: string
    artists: Artist3[]
  }
  
  export interface ExternalUrls6 {
    spotify: string
  }
  
  export interface Image4 {
    url: string
    height: number
    width: number
  }
  
  export interface Restrictions3 {
    reason: string
  }
  
  export interface Copyright2 {
    text: string
    type: string
  }
  
  export interface ExternalIds3 {
    isrc: string
    ean: string
    upc: string
  }
  
  export interface Artist3 {
    external_urls: ExternalUrls7
    href: string
    id: string
    name: string
    type: string
    uri: string
  }
  
  export interface ExternalUrls7 {
    spotify: string
  }
  
  export interface Playlists {
    href: string
    limit: number
    next: string
    offset: number
    previous: string
    total: number
    items: Item4[]
  }
  
  export interface Item4 {
    collaborative: boolean
    description: string
    external_urls: ExternalUrls8
    href: string
    id: string
    images: Image5[]
    name: string
    owner: Owner
    public: boolean
    snapshot_id: string
    tracks: Tracks2
    type: string
    uri: string
  }
  
  export interface ExternalUrls8 {
    spotify: string
  }
  
  export interface Image5 {
    url: string
    height: number
    width: number
  }
  
  export interface Owner {
    external_urls: ExternalUrls9
    followers: Followers3
    href: string
    id: string
    type: string
    uri: string
    display_name: string
  }
  
  export interface ExternalUrls9 {
    spotify: string
  }
  
  export interface Followers3 {
    href: string
    total: number
  }
  
  export interface Tracks2 {
    href: string
    total: number
  }
  
  export interface Shows {
    href: string
    limit: number
    next: string
    offset: number
    previous: string
    total: number
    items: Item5[]
  }
  
  export interface Item5 {
    available_markets: string[]
    copyrights: Copyright3[]
    description: string
    html_description: string
    explicit: boolean
    external_urls: ExternalUrls10
    href: string
    id: string
    images: Image6[]
    is_externally_hosted: boolean
    languages: string[]
    media_type: string
    name: string
    publisher: string
    type: string
    uri: string
    total_episodes: number
  }
  
  export interface Copyright3 {
    text: string
    type: string
  }
  
  export interface ExternalUrls10 {
    spotify: string
  }
  
  export interface Image6 {
    url: string
    height: number
    width: number
  }
  
  export interface Episodes {
    href: string
    limit: number
    next: string
    offset: number
    previous: string
    total: number
    items: Item6[]
  }
  
  export interface Item6 {
    audio_preview_url: string
    description: string
    html_description: string
    duration_ms: number
    explicit: boolean
    external_urls: ExternalUrls11
    href: string
    id: string
    images: Image7[]
    is_externally_hosted: boolean
    is_playable: boolean
    language: string
    languages: string[]
    name: string
    release_date: string
    release_date_precision: string
    resume_point: ResumePoint
    type: string
    uri: string
    restrictions: Restrictions4
  }
  
  export interface ExternalUrls11 {
    spotify: string
  }
  
  export interface Image7 {
    url: string
    height: number
    width: number
  }
  
  export interface ResumePoint {
    fully_played: boolean
    resume_position_ms: number
  }
  
  export interface Restrictions4 {
    reason: string
  }
  
  export interface Audiobooks {
    href: string
    limit: number
    next: string
    offset: number
    previous: string
    total: number
    items: Item7[]
  }
  
  export interface Item7 {
    authors: Author[]
    available_markets: string[]
    copyrights: Copyright4[]
    description: string
    html_description: string
    edition: string
    explicit: boolean
    external_urls: ExternalUrls12
    href: string
    id: string
    images: Image8[]
    languages: string[]
    media_type: string
    name: string
    narrators: Narrator[]
    publisher: string
    type: string
    uri: string
    total_chapters: number
  }
  
  export interface Author {
    name: string
  }
  
  export interface Copyright4 {
    text: string
    type: string
  }
  
  export interface ExternalUrls12 {
    spotify: string
  }
  
  export interface Image8 {
    url: string
    height: number
    width: number
  }
  
  export interface Narrator {
    name: string
  }
  
type searchProps = {    
    setView: Dispatch<SetStateAction<string>>,
    setGlobalPlaylistId: Dispatch<SetStateAction<string>>
}

const Search = ({setView, setGlobalPlaylistId}: searchProps) => {
    const { data: session } = useSession()    
    const [searchData, setSearchData] = useState<ResponseSearch>()
    const [inputValue, setInputValue] = useState("")
    const inputRef = useRef<HTMLInputElement | null>(null);
    
    const _session = session as SessionType;  // Usa el casting para decirle a TypeScript que token es de tipo JwtToken

    const API_URL:string = "https://localhost:7291";

    const updateSearchResults = async(query:string) => {
        if(_session && _session.user.accessToken){
            const queryParams = new URLSearchParams({
                q: query,
                type: "album,artist,playlist,track"
              });

            //const { data } = await axios.get(API_URL + "/v1/search?" + queryParams.toString(), 
            const { data } = await axios.get(API_URL + "/api/Spotify/search?" + queryParams.toString(), 
            {
                headers: {
                    Authorization: "Bearer " + _session.user.accessToken
                }
            }); 
            setSearchData(data);
            
        }
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [inputRef])

    {console.log('searchData', searchData)}

    return (
        <div className="flex-grow h-screen">
            <header className="text-white sticky top-0 h-20 z-10 text-4xl flex items-center px-8">
                <MagnifyingGlassIcon className="absolute top-7 left-10 h-6 w-6 text-neutral-800" />
                <input className="rounded-full bg-white w-96 pl-12 text-neutral-900 text-base py-2 font-normal outline-0" type="text" value={inputValue} onChange={async(e) => {
                    setInputValue(e.target.value)
                    await updateSearchResults(e.target.value)
                }} ref={inputRef} />
            </header>
            <div onClick={() => signOut()} className='absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                <img className='rounded-full w-7 h-7' src={_session.user.image} alt="profile pic" />
                <p className='text-sm'>Logout</p>
                <ChevronDownIcon className='h5- w-5' />                
            </div>
            <div>
                {searchData === null || searchData === undefined ? 
                    <FeaturedPlaylists setView={setView} setGlobalPlaylistId={setGlobalPlaylistId} /> : 
                    <SearchResult 
                        playlists={searchData.playlists}
                        tracks={searchData.tracks}
                        artists={searchData.artists}                        
                        albums={searchData.albums}
                        setView={setView}
                        setGlobalPlaylistId={setGlobalPlaylistId}
                    />}
            </div>
        </div>
    )
}

export default Search