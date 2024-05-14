import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            Credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (Credentials, _req) => {

                try {

                    if (!Credentials.username || !Credentials.password) return null

                    const ApiResponse = await fetch("https://dummyjson.com/auth/login", {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: Credentials.username,
                            password: Credentials.password,
                        })
                    })

                    const user = await ApiResponse.json()
                    console.log(user);
                    if (ApiResponse.ok) {
                        return user
                    }
                    return null;

                } catch (error) {
                    console.log("error ---->", error);
                    throw new Error("Invalid login attempt")
                }
            }
        })
    ],

    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user

                return token
            }
            return token
        },

        async session({ session, token }) {

            if (token) {
                session.token = token.user

                return session
            }
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };