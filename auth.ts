import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google"
import prisma from "./lib/prisma";

const nextAuthOption = {
    providers: [GoogleProvider],
    adapter: PrismaAdapter(prisma),
}

export const { auth, handlers, signIn, signOut} =  NextAuth(nextAuthOption);