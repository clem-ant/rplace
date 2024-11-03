import prisma from "@/util/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      if (token && token.sub) {
        session.user.id = token.sub;

        // Fetch the pixelCount from the database
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { pixelCount: true },
        });

        // Add pixelCount to the session
        session.user.pixelCount = dbUser?.pixelCount || 0;
      }

      return session;
    },
    async signIn({ user, account, profile }) {
      user.pixelCount = 0;
      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
};

export default authOptions;
