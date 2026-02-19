// import NextAuth from "next-auth";

// const handler = NextAuth({
//   providers: [
//     {
//       id: "wso2",
//       name: "WSO2",
//       type: "oauth",
//       issuer: process.env.WSO2_ISSUER,
//       clientId: process.env.WSO2_CLIENT_ID,
//       clientSecret: process.env.WSO2_CLIENT_SECRET,
//       wellKnown: `${process.env.WSO2_ISSUER}/.well-known/openid-configuration`,
//       authorization: { params: { scope: "openid profile email" } },
//       idToken: true,
//       client: {
//         token_endpoint_auth_method: "client_secret_post",
//       },
//       profile(profile) {
//         // username and other details find from token
//         return {
//           id: profile.sub,
//           name: profile.username || profile.name,
//           email: profile.email || null,
//         };
//       },
//     },
//   ],
//   callbacks: {
//     async jwt({ token, user, account, profile }) {
//       if (account && profile) {
//         token.id_token = account.id_token;
//         // username set in token from profile
//         token.username = profile.username;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.id_token = token.id_token;
//       // set username in session
//       if (session.user) {
//         session.user.name = token.username;
//       }
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    {
      id: "wso2",
      name: "WSO2",
      type: "oauth",
      issuer: process.env.WSO2_ISSUER,
      clientId: process.env.WSO2_CLIENT_ID,
      clientSecret: process.env.WSO2_CLIENT_SECRET,
      wellKnown: `${process.env.WSO2_ISSUER}/.well-known/openid-configuration`,
      authorization: { params: { scope: "openid profile email" } },
      idToken: true,
      client: {
        token_endpoint_auth_method: "client_secret_post",
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.username || profile.name,
          email: profile.email || null,
        };
      },
    },
  ],

  // update: custom page for login
  pages: {
    signIn: "/", // without login redirect to home
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && profile) {
        token.id_token = account.id_token;
        token.username = profile.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.id_token = token.id_token;
      if (session.user) {
        session.user.name = token.username;
      }
      return session;
    },
    // update: directly redirect to wso2 login page
    async authorized({ token }) {
      // without token, redirect to login page
      return !!token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
