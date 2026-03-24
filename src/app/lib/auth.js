import User from "../models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from 'next-auth/providers/github'
import { ConnectToDatabase } from "./db";
import bcrypt from "bcrypt";

await ConnectToDatabase()

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await ConnectToDatabase()
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          return null
        }
        const isValid = await bcrypt.compare(credentials.password,user.password);
        console.log(user)
        console.log(isValid)
        if (!isValid) {
          return null
        }
        
        return {
          name: user.username,
          email: user.email,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await ConnectToDatabase()
      if (account.provider === "github") {
        const exist = await User.findOne({ email: user.email });
        if (!exist) {
          await User.create({
            username: user.name,
            email: user.email,
            password: "GITHUB CLIENT",
          });
        }
      }
      return true
    },
    async jwt({token,user}){
      await ConnectToDatabase()
        if (user){
            const dbuser = await User.findOne({email:user.email})
            token.id = dbuser._id.toString()
            token.name = dbuser.username
            token.email=dbuser.email
        }
        return token
    },
    async session({session,token}){
        if (token){
            session.id = token.id
            session.name = token.name
            session.email=token.email
        }
        return session
    },
  },
  session:{
    strategy:'jwt'
  },
  pages:{
    'signIn':'/login',
    'signOut':'/login',
    'error':'/login',
  }
};
