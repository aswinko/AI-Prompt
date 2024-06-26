import NextAuth, { NextAuthOptions, Profile, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

// Ensure process.env has the expected properties
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string;
      CLIENT_SECRET: string;
    }
  }
}

// Define the options for NextAuth
const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
        if (session?.user?.email) {
            try {
              await connectToDB(); // Connect to your database
              const sessionUser = await User.findOne({ email: session.user.email });
    
              if (sessionUser) {
                session.user.id = sessionUser._id.toString(); // Assuming _id is of type ObjectId
              }
            } catch (error) {
              console.error('Error retrieving user:', error);
            }
          }
      return session;
    },

    async signIn({ profile }) {
      if (!profile || !profile.email || !profile.name) {
        console.error("Profile is missing required information");
        return false;
      }

      try {
        // Your sign-in logic
        await connectToDB();
        //check if a user is already exist
        const userExists = await User.findOne({
          email: profile.email,
        });
        //if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

// Export the NextAuth handler with options
const handler = NextAuth(options);
export { handler as GET, handler as POST };
