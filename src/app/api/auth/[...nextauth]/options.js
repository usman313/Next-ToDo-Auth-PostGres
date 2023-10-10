import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { createClient  } from "@vercel/postgres";
import { toast } from "react-toastify";

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
    async signIn({ profile }) {
      console.log('profile: ', profile)
      try{
          const client = createClient();
          await client.connect();
          const foundUser = await client.sql`SELECT * from students WHERE email = ${profile.email}`
          console.log('found user query: ', foundUser)
          // if(found?.user?.rowCount === 0){
          //   const addUser = await client.sql`INSERT INTO students (email, password) 
          //                       VALUES (${profile?.email});`
          //   console.log('sql result: ', addUser)
          //   if(addUser?.rows?.length){
          //     toast.success("User Added Successfully", {autoClose: 1000})
          //   }
          //   return(true)
          // }
          return true
      }catch(error){
        console.log('error found:')
      }
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

module.exports = { options };
