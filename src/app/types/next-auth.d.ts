import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    expires: string;
    token: string;
  }
}
