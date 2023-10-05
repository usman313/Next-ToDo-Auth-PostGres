import CredentialsProvider from "next-auth/providers/credentials";

const options = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { 
          label: "Password", 
          type: "password" 
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const foundUser = await fetch(`http://127.0.0.1:3000/api/find-user?email=${credentials?.email}&password=${credentials.password}`)
        if (foundUser) {
          const customResponse = {
            success: true,
            message: "Authentication successful",
            foundUser,
          };

          return customResponse;
        }
        return null
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
    signIn: "http://127.0.0.1:3000/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

module.exports = { options };
