import authConfig from "./auth.config"
import NextAuth from "next-auth"

export const { auth: middleware } = NextAuth(authConfig)

export const config = {
    matcher: ["/p/:path*", "/create/:path*"],
  }