import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { signJwtAccessToken } from "@/app/utils/jwt";

const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      const accessToken = signJwtAccessToken({
        email: token.email,
        name: token.name,
      });

      return {
        token: accessToken,
        email: token.email,
        name: token.name,
      };
    },
    async session({ session, token, user }) {
      return {
        ...session,
        token: token.token,
        ...user,
      };
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
