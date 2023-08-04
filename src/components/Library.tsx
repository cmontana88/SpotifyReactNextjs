import { ChevronDownIcon, PlayIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
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

export interface Playlist {    
    collaborative: boolean
    description: string
    //external_urls: ExternalUrls
    //followers: Followers
    href: string
    id: string
    images: Image[]
    name: string
    owner: Owner
    public: boolean
    snapshot_id: string
    //tracks: Tracks
    type: string
    uri: string
}

export interface Image {
    url: string
    height: number
    width: number
}

export interface Owner {
    //external_urls: ExternalUrls2
    //followers: Followers2
    href: string
    id: string
    type: string
    uri: string
    display_name: string
}

type libraryProps = {    
    setView: Dispatch<SetStateAction<string>>,
    setGlobalPlaylistId: Dispatch<SetStateAction<string>>
}

const Library = ({ setView, setGlobalPlaylistId }: libraryProps) => {
    const { data: session } = useSession()
    const [playlists, setPlaylists] = useState<Array<Playlist>>([])
    
    const _session = session as SessionType;  // Usa el casting para decirle a TypeScript que token es de tipo JwtToken

    const API_URL:string = "https://localhost:7291";

    const selectPlaylist = (playlist: Playlist) => {
        setView("playlist")
        setGlobalPlaylistId(playlist.id)
    }

    const getData = async () => {        
        if(_session && _session.user.accessToken){
            //const { data } = await axios.get(API_URL + "/v1/me/playlists", 
            const { data } = await axios.get(API_URL + "/api/Spotify/me/playlists", 
            {
                headers: {
                    Authorization: "Bearer " + _session.user.accessToken
                }
            }); 
            
            setPlaylists(data.items);
        }
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="flex-grow h-screen">
            <header className="text-white sticky top-0 h-20 z-10 text-4xl">
            </header>
            <div onClick={() => signOut()} className='absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                <img className='rounded-full w-7 h-7' src={_session.user.image} alt="profile pic" />
                <p className='text-sm'>Logout</p>
                <ChevronDownIcon className='h5- w-5' />
            </div>
            <div className="flex flex-col gap-4 px-8 h-screen overflow-y-scroll">
                <h2 className="text-xl font-bold">Playlists</h2>
                <div className="flex flex-wrap gap-6 mb-48">
                    {
                        playlists.map((playlist) => {
                            return  <div key={playlist.id} onClick={() => selectPlaylist(playlist)} className="cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4">
                                        <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6">
                                            <PlayIcon className="h6 w6 text-white" />
                                        </div>                                                                           
                                        <img className="w-48 h-48 mb-4" src={playlist.images[0].url} alt="" />     
                                        <p className="text-base text-white mb-1 w-48 truncate">{playlist.name}</p>
                                        <p className="text-sm text-neutral-400 mb-8 w-48 truncate">{playlist.owner.display_name}</p>
                                        <p></p>
                                    </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Library;