'use client';
import Image from 'next/image'
import Logo from '../../../public/Logo.png'
import { signIn } from "next-auth/react"

const Login = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='m-auto text-center space-y-3'>
                <Image
                    src={Logo}
                    alt='Logo'
                    width={200}
                    height={200}     
                    className='m-auto'                   
                />
                <h2 className='text-[#5b9c53] text-xl'>Login Spotify Constructora Bolivar</h2>
                <button className="text-white px-8 py-2 rounded-full bg-[#5b9c53] font-bold text-lg" onClick={() => signIn('spotify', { callbackUrl: "/" })}>Login spotify</button>
            </div>
        </div>
    );
}

export default Login;
