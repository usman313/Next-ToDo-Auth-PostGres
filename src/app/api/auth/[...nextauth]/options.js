import CredentialsProvider from "next-auth/providers/credentials";

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
  ],

  callbacks: {
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
