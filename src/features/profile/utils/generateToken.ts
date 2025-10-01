'use client'

import { app } from "@/config/firebase"
import { getMessaging, getToken } from "firebase/messaging"


export async function generateToken(){

    const messaging = getMessaging(app)

    const permission = await Notification.requestPermission()
    if(permission ==='granted'){
        const token = await getToken(messaging,{
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY
        })
        sessionStorage.setItem('deviceToken:',token)
        return token
    }
    else {
        alert('Not have permission to notify')
    }
}