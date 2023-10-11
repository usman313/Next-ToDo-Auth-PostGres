import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { createClient  } from "@vercel/postgres";
import { toast } from "react-toastify";
import { encryptPassword } from "@/helpers/bcryptPassword";

const options = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { 
          label: "Password", 
          type: "password",
          placeholder: 'Enter Password'
        },
      },
      async authorize(credentials) {
        console.log('credentials: ', credentials)
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try{
          const foundUser = await fetch(`http://127.0.0.1:3000/api/find-user?email=${credentials?.email}&password=${credentials.password}`)
          const result = await foundUser.json()

          if (foundUser.status === 200) {
            const customResponse = {
              success: true,
              message: "Authentication successful",
              ...result,
            };
            return customResponse;
          }
        }catch(error){
          console.log("Error in login");
          return null
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ profile, credentials }) {
      // console.log('asdfa sdf asd fa sdf ads ')
      if(credentials){
        return true
      }else if(profile){
        try{
          const client = createClient();
          await client.connect();
          const foundUser = await client.sql`SELECT * from students WHERE email = ${profile.email}`
          // console.log('found user query: ', foundUser?.rowCount)
          if(foundUser?.rowCount === 0){
            const encPassword = await encryptPassword('password')
            const addUser = await client.sql`INSERT INTO students (std_id, username, email, password) 
                                            VALUES (
                                              ${profile?.sub} ,${profile?.name}, 
                                              ${profile?.email}, ${encPassword});`
            if(addUser?.rows?.length){
              toast.success("User Added Successfully", {autoClose: 1000})
            }
            return(true)
          }else{
            // console.log('sadfasdf')
            const dbUser = await client.sql`SELECT * FROM students WHERE email = ${profile.email}`
            return true
          }
        }catch(error){
          console.log('error found:', error)
          return false
        }
      }
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      // console.log('session data: ', session)
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

module.exports = { options };
