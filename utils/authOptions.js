import CredentialsProvider from "next-auth/providers/credentials"; 
import GoogleProvider from "next-auth/providers/google"
import User from "@/models/user"; 
import bcrypt from "bcryptjs"; 
//import dbConnect from "@/utils/dbConnect"; 
import GetUserfromSPeedyWebsite from "@/utils/dbConnect"; 
import getSwcSHA1 from "./speedyHash";
 
export const authOptions = { 
  session: { 
    strategy: "jwt", 
  }, 
  providers: [ 
    GoogleProvider({ 
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    }), 
    CredentialsProvider({ 
      async authorize(credentials, req) { 
        const { email, password } = credentials;
        
        const SQLuser = await GetUserfromSPeedyWebsite(email);
        //const user = await User.findOne({ email }); 
 
        if (!SQLuser) { 
          throw new Error("Invalid email or password"); 
        } 
        // If the user has no password (i.e., they signed up via a social network), throw an error 
        //if (!user.password) { 
        //  throw new Error("Please login via the method you used to sign up"); 
        //} 

        
        const hasdedPassword = getSwcSHA1(SQLuser.Token.toLowerCase() +':' +password )
        const isPasswordMatched = hasdedPassword===SQLuser.Password; 
        if (!isPasswordMatched) { 
          throw new Error("Invalid email or password"); 
        } 
        const user = new User({ 
          name : SQLuser.Name, 
          email : SQLuser.Email, 
          password: SQLuser.Password, 
        })
        return user; 
      }, 
    }), 
  ], 
  callbacks: { 
    async signIn({ user }) { 
    /*  dbConnect(); 
   
      const { email } = user; 
   
      // Try to find a user with the provided email 
      let dbUser = await User.findOne({ email }); 
   
      // If the user doesn't exist, create a new one 
      if (!dbUser) { 
        dbUser = await User.create({ 
          email, 
          name: user.name, 
          image: user.image, 
        }); 
      } 
   */
      return true; 
    }, 
    jwt: async ({ token, user }) => { 
      const userByEmail = user;
      token.user = userByEmail; 
      token.password = "";
      console.log(token)
      return token; 
    }, 
    session: async ({ session, token }) => { 
      console.log(token)
      const userByEmail = token;
      session.user = userByEmail; 
      return session; 
    },  
  },
  secret: process.env.NEXTAUTH_SECRET, 
  pages: { 
    signIn: "/login", 
  }, 
};