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
                const res = await fetch("http://localhost:3001/signin", {
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

                // return { data };
            },
        })

    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log("jwt", token);
            console.log("data", user);

            if (user) {
                token.accessToken = user.data.token;
                token.id = user.data.user._id;
                token.user = user.data.user;
            }
            return token;
        },
        async session({ session, token }) {

            session.user = token.user;
            console.log("session", session);
            console.log("token", token);
            session.accessToken = token.accessToken;
            return session;
        },
    },
};

export default NextAuth(authOptions);