import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify'
import jwt from 'jsonwebtoken'

const scopes: string = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-currently-playing",
    "user-modify-playback-state"
].join(",")

const params = {
    scope: scopes
}

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

type JwtToken = {
    accessToken: string;
    refreshToken: string;
    name?: string;
    email?: string;
    accessTokenExpires?: number;
    iat?: number;
}

const refreshAccessToken = async(token: JwtToken) => {
    console.log('entro')
    const params = new URLSearchParams()
    params.append("grant_type", "refresh_token")
    params.append("refresh_token", token.refreshToken)
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_SECRET).toString('base64')
        },          
        body: params
    })
    const data = await response.json()
    return {
        ...token,
        accessToken: data.access_token,
        refreshToken: data.refresh_token ?? token.refreshToken,
        accessTokenExpires: new Date(data.expires_in! * 1000).toISOString()
    }
}

const LOGIN_URL:string = "https://accounts.spotify.com/authorize?" + new URLSearchParams(params).toString();

export const authOptions: AuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_SECRET!,
            authorization: LOGIN_URL
        })
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token: oldToken, account }) {

            const token = oldToken as JwtToken;  // Usa el casting para decirle a TypeScript que token es de tipo JwtToken

            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token!
                token.refreshToken = account.refresh_token!
                token.accessTokenExpires = account.expires_at
                return token
            }
            
            // access token has not expired
            let currentDateTime = new Date(); // Obtén la fecha y hora actuales            
            var dateExpire = new Date(token.accessTokenExpires! * 1000)            
            if (token.accessTokenExpires && currentDateTime < dateExpire ) {
                return token
            }

            // access token has expired
            return await refreshAccessToken(token)
        },
        async session({ session: oldSession, token: oldToken, user }) {
            const token = oldToken as JwtToken;  // Usa el casting para decirle a TypeScript que token es de tipo JwtToken
            const _session = oldSession as SessionType;  // Usa el casting para decirle a TypeScript que token es de tipo JwtToken

            // Send properties to the client, like an access_token from a provider.
            if (_session?.user) {                
                var numDate = new Date(token.accessTokenExpires! * 1000);                

                _session.user.name = token.name!;
                _session.user.email = token.email!;
                _session.user.accessToken = token.accessToken;
                _session.user.refreshToken = token.refreshToken;
                _session.expires = numDate.toISOString();
            }
            
            return _session
        },         
    },
    jwt: {
        async encode({ secret, token }) {
          return jwt.sign(token!, secret)
        },
        async decode({ secret, token }) {            
          const decoded = jwt.verify(token!, secret) as JWT;
          return decoded
        },
      },      
}