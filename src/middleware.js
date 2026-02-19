// // src/middleware.js
// export { default } from "next-auth/middleware";

// export const config = {
//   // applies middleware to protected routes
//   matcher: ["/dashboard/:path*", "/profile/:path*"],
//   //   matcher: ["/((?!api|register|_next/static|_next/image|favicon.ico).*)"],
// };

import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // just write the slash
  },
});

// this part make sure which routes are protected
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
