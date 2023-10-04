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

        const users = [
          {
            id: 1,
            email: "admin@user.com",
            password: "123456",
            name: "Muhammad Usman",
          },
        ];

        const foundUser = users.find((user) => {
          return (
            user.email === credentials.email &&
            user.password === credentials.password
          );
        });
        if (foundUser) {
          const customResponse = {
            success: true,
            message: "Authentication successful",
            foundUser,
          };

          return customResponse;
        } else return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
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