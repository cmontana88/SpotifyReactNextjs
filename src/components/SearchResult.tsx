import { PlayIcon } from "@heroicons/react/24/outline"
import { useSession } from "next-auth/react"
import { Playlist } from './FeaturedPlaylist';
import { Dispatch, SetStateAction } from "react";

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

  type searchResultProps = {    
    playlists: Playlists,
    tracks: Tracks,
    artists: Artists,    
    albums: Albums,
    setView: Dispatch<SetStateAction<string>>,
    setGlobalPlaylistId: Dispatch<SetStateAction<string>>
}

const SearchResult = ({ playlists, tracks, artists, albums, setView, setGlobalPlaylistId }: searchResultProps) => {
    const { data: session } = useSession()    
    
    const _session = session as SessionType;  // Usa el casting para decirle a TypeScript que token es de tipo JwtToken

    const selectPlaylist = (playlist: Playlist) => {
        setView("playlist")
        setGlobalPlaylistId(playlist.id)
    }

    const millisToMinutesAndSeconds = (millis: number) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = Number(((millis % 60000) / 1000).toFixed(0));
        return(
            seconds == 60 ? (minutes + 1) + ":00" : minutes.toString() + ":" + (seconds < 10 ? "0" : "") + seconds.toString()
        )
    }

    return(
        <div className="flex flex-col gap-8 px-8 h-screen overflow-y-scroll">
            <div className="grid grid-cols-2">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Top Result</h2>
                    <div className="h-64 pr-8">
                        <div onClick={() => selectPlaylist(playlists.items[0])} className="cursor-pointer relative group h-64 w-full bg-neutral-800 hover:bg-neutral-700 p-4 flex flex-col gap-6 rounded-md transition duration-500">
                            <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 bottom-8 group-hover:bottom-8 right-8">
                                <PlayIcon className="h-6 w-6 text-white" />
                            </div>    
                            {
                                playlists && 
                                <>
                                    <img className="h-28 w-28 rounded" src={playlists.items[0].images[0].url} alt="pic top playlist" />
                                    <p className="text-2xl font-bold truncate">{playlists.items[0].name}</p>
                                    <p className="text-sm text-neutral-400">
                                        By {playlists.items[0].owner.display_name}
                                        <span className="rounded-full bg-neutral-900 text-white font-bold ml-4 py-1 px-4">Playlist</span>
                                    </p> 
                                    
                                </>
                            }                                                                       
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Top songs</h2>
                    <div className="flex flex-col">
                        {
                            tracks.items.slice(0, 4).map((track) => {
                                return  <div key={track.id} className="cursor-default w-full h-16 px-4 rounded-md flex items-center gap-4 hover:bg-neutral-700 hover:text-white">
                                            <img className="h-10 w-10" src={track.album.images[0].url} alt="pic song" />
                                            <div>
                                                <p className="">{track.name}</p>
                                                <p className="text-sm text-neutral-600">{track.artists[0].name}</p>
                                            </div>
                                            <div className="flex-grow flex items-center justify-end">
                                                <p className="text-sm text-neutral-600">{millisToMinutesAndSeconds(track.duration_ms)}</p>
                                            </div>
                                        </div>
                            })
                        }                            
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Artists</h2>
                <div className="flex flex-wrap gap-4">
                    {
                        artists.items.slice(0, 8).map((artist) => {
                            return  <div key={artist.id} className="cursor-pointer relative group w-48 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4">                                       
                                        <img className="h-10 w-10" src={artist.images[0].url} alt="pic artist" />
                                        <p className="text-base text-white mb-1 w-48 truncate">{artist.name}</p>
                                        <p className="text-sm text-neutral-400 mb-2 w-48 truncate">Artist</p>
                                    </div>
                        })
                    }                        
                </div>
            </div>           
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Playlist</h2>
                <div className="flex flex-wrap gap-4">
                    {
                        playlists.items.slice(0, 8).map((playlist) => {
                            return  <div onClick={() => selectPlaylist(playlist)} key={playlist.id} className="cursor-pointer relative group w-48 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4">   
                                        <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500 shadow-2xl shadow-neutral-900 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-green-500 bottom-2 group-hover:bottom-4 right-4">
                                            <PlayIcon className="h-4 w-4 text-white" />
                                        </div>                                        
                                        <img className="h-10 w-10" src={playlist.images[0].url} alt="pic artist" />
                                        <p className="text-base text-white mb-1 w-48 truncate">{playlist.name}</p>
                                        <p className="text-sm text-neutral-400 mb-2 w-48 truncate">Playlist</p>
                                    </div>
                        })
                    }                        
                </div>
            </div>
            <div className="space-y-4 mb-28">
                <h2 className="text-xl font-bold">Albums</h2>
                <div className="flex flex-wrap gap-4">
                    {
                        albums.items.slice(0, 8).map((album) => {
                            return  <div key={album.id} className="cursor-pointer relative group w-48 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4">                                       
                                        <img className="h-10 w-10" src={album.images[0].url} alt="pic artist" />
                                        <p className="text-base text-white mb-1 w-48 truncate">{album.name}</p>
                                        <p className="text-sm text-neutral-400 mb-2 w-48 truncate">Album</p>
                                    </div>
                        })
                    }                        
                </div>
            </div>
        </div>
    )
}

export default SearchResult