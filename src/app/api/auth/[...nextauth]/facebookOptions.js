import FacebookProvider from "next-auth/providers/facebook";

const FACEBOOK_OPTIONS = {
    providers: [
        FacebookProvider({
          clientId: process.env.FACEBOOK_CLIENT_ID,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        })
    ],
    callbacks:{
        async signIn({account, profile}){
            // check Sign in here
        },
        async session({token, user}){
            //handle session here
        }
    }
}