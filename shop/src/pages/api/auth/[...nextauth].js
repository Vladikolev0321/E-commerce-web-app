import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const authOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials;
                const res = await fetch(`${process.env.SERVER_URL}/signin`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
                const data = await res.json();
                console.log("Received Data:", data);
                if (res.ok && data) {
                    return { data };
                }

                if (res.status !== 200) {
                    throw new Error(data.message);
                }
            },
        })

    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.data.token;
                token.id = user.data.user._id;
                token.user = user.data.user;
            }
            return token;
        },
        async session({ session, token }) {

            session.user = token.user;
            session.accessToken = token.accessToken;
            return session;
        },
    },
    secret: process.env.SECRET,
};

export default NextAuth(authOptions);