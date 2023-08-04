import Image from 'next/image'
import { BuildingLibraryIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusCircleIcon, RssIcon } from '@heroicons/react/24/outline'
import Logo from '../../public/Logo.png'
import { useSession } from 'next-auth/react'
import { User as NextAuthUser } from 'next-auth'; // Importa la interfaz User de next-auth
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { authOptions } from '@/lib/auth';
import axios from 'axios';

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

export interface Image {
  url: string
  height: number
  width: number
}

export interface Owner {
  external_urls: ExternalUrls2
  followers: Followers
  href: string
  id: string
  type: string
  uri: string
  display_name: string
}

export interface ExternalUrls2 {
  spotify: string
}

export interface Followers {
  href: string
  total: number
}

export interface Tracks {
  href: string
  total: number
}

type sidebarProps = {
    view: string;
    setView: Dispatch<SetStateAction<string>>;
    setGlobalPlaylistId: Dispatch<SetStateAction<string>>;
}


const Sidebar = ({view, setView, setGlobalPlaylistId}: sidebarProps) => {
    const { data: session, status, update } = useSession()
    const [playlists, setPlaylists] = useState<Array<ResponsePlaylist>>([])

    const API_URL:string = "https://localhost:7291";

    const _session = session as SessionType;  // Usa el casting para decirle a TypeScript que token es de tipo JwtToken

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    return(
        <div className='W-64 grow-0 shrink-0 h-screen overflow-y-scroll border-r border-neutral-900 p-5  text-sm hidden md:inline-flex bg-white'>            
            <div className='space-y-4'>
                <div className='flex items-center space-x-2'>
                    <Image
                        src={Logo}
                        alt='Logo'
                        width={25}
                        height={25}     
                        
                    />
                    <p className='text-green-600'>SPOTIFY CB</p>
                </div>
                <div className='space-y-2'>                
                    <button className='flex items-center space-x-2 hover:text-green-600'>
                        <HomeIcon className='h-5 w-5' />
                        <p>Home</p>
                    </button>
                    <button onClick={() => setView("search")} className={`flex items-center space-x-2 hover:text-green-600 ${view == "search" ? "text-green-600" : null}`}>
                        <MagnifyingGlassIcon className='h-5 w-5' />
                        <p>Search</p>
                    </button>
                    <button onClick={() => setView("library")} className={`flex items-center space-x-2 hover:text-green-600 ${view == "library" ? "text-green-600" : null}`}>
                        <BuildingLibraryIcon className='h-5 w-5' />
                        <p>Your Library</p>
                    </button>
                    <hr className='border-black' />
                    <button className='flex items-center space-x-2 hover:text-green-600'>
                        <PlusCircleIcon className='h-5 w-5' />
                        <p>Create Playlist</p>
                    </button>
                    <button className='flex items-center space-x-2 hover:text-green-600'>
                        <HeartIcon className='h-5 w-5' />
                        <p>Liked Songs</p>
                    </button>
                    <hr className='border-neutral-900' />
                    {
                        playlists.map((playlist) => {
                            return  <p 
                                        onClick={() => {
                                            setView("playlist")
                                            setGlobalPlaylistId(playlist.id)
                                        }}
                                        key={playlist.id} 
                                        className='cursor-default hover:text-green-600 w-52 truncate'>
                                        { playlist.name }
                                    </p>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar