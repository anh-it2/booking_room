
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export default async function middleware(){
  
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refreshToken')

  if(refreshToken !== null){
    NextResponse.next()
  }else{
    redirect('/auth/sign-in')
  }
}

export const config = {
    matcher:[
        '/dashboard/:path*'
    ]
}