import GoogleProvider from "next-auth/providers/google";

const GOOGLE_OPTIONS = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
          if (account.provider === "google") {
            return profile.email_verified && profile.email.endsWith("@example.com")
          }
          return true
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    }
}

module.exports = {GOOGLE_OPTIONS}