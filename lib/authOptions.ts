import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    
    providers: [CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
        

            if (!credentials?.email || !credentials?.password) {
                throw new Error("Please enter email and password");
            }

            try {

                const user = await prisma.user.findUnique({
                where: {
                    email: credentials.email,
                },
            });

            if (!user) {
                return null;
            }

            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

            if (!isPasswordValid) {
                return null;
            }

            return {
                id: user.id,
                email: user.email,
            };

            }catch (error) {
                throw new Error("Something went wrong");
            }

            

            
        },
    })],
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {

        jwt({token, user}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        session({session, token}) {
            if (token) {
                session.user.id = token.id as string;
            }
            return session;
        },
        
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    
}   