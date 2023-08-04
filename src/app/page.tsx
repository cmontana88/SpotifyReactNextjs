'use client';
import Artist from '@/components/Artist';
import Library from '@/components/Library';
import Player from '@/components/Player';
import PlaylistView from '@/components/PlaylistView';
import Search from '@/components/Search';
import Sidebar from '@/components/Sidebar';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter();  
  const [view, setView] = useState("search") // ["search", "library", "playlist", "artist"]
  const [globalPlaylistId, setGlobalPlaylistId] = useState("")
  const [globalArtistId, setGlobalArtistId] = useState(null)
  const [globalCurrentSongId, setGlobalCurrentSongId] = useState<string>()
  const [globalIsTrackPlaying, setGlobalIsTrackPlaying] = useState<boolean>()

  if (status === "unauthenticated") {
    router.push('/login'); 
  }  
  else if (status === "loading") {
    <main className="">        
        <pre>{ status }</pre>     
      </main>
  }  
  else {
    return (
      <>
        <main className="flex w-full h-screen overflow-hidden bg-[#f6da63]">
          <div className='flex w-full'>
            <Sidebar view={view} setView={setView} setGlobalPlaylistId={setGlobalPlaylistId} />
            {view === "playlist" && <PlaylistView
              setView={setView}
              setGlobalArtistId={setGlobalArtistId}
              globalPlaylistId={globalPlaylistId}
              setGlobalCurrentSongId={setGlobalCurrentSongId}
              setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
            />}
            {view === 'search' && <Search setView={setView} setGlobalPlaylistId={setGlobalPlaylistId} />}
            {view === 'library' && <Library setView={setView} setGlobalPlaylistId={setGlobalPlaylistId} />}
            {view === 'artist' && <Artist />}
          </div>
        </main>
        {/*<div className='sticky bottom-0 h-24 w-full'>
          <Player 
            globalCurrentSongId={globalCurrentSongId} 
            setGlobalCurrentSongId={setGlobalCurrentSongId}
            setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
            globalIsTrackPlaying={globalIsTrackPlaying}
          />
        </div>*/}
      </>
    )
  }  
}