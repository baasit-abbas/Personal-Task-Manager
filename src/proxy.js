import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware";



export default withAuth(
  function middleware(req){
    return NextResponse.next()
  },
  {
    callbacks:{
      authorized({req,token}){
        const pathname = req.nextUrl.pathname
        if (pathname === '/login' || pathname === '/register'){
          return !token
        }
        else if (pathname === '/'){
          return true
        }
        return !!token
      }
    }
  }
)



export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}