import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  const isGoingToRoot = request.nextUrl.pathname === '/';

  if (userId && isGoingToRoot) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!userId && request.nextUrl.pathname.startsWith('/dashboard')){
    return NextResponse.redirect(new URL('/', request.url));
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};