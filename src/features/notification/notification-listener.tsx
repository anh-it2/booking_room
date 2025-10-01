'use client'
import { baseUrl } from "@/config/baseUrl"
import { app } from "@/config/firebase"
import { postApi } from "@/lib/apiFetch"
import { getMessaging, onMessage } from "firebase/messaging"
import { useEffect } from "react"
import { toast } from "sonner"
import { generateToken } from "../profile/utils/generateToken"

const NotificationListener = () => {

    useEffect(() =>{
        const sendDeviceToken = async () =>{
            try {
                const deviceToken = await generateToken()
                await postApi(`${baseUrl}/api/user-devices/register`,{},{deviceToken: deviceToken})
            } catch (error) {
                toast.warning(`${error}`)
            }
        }
        sendDeviceToken()
    },[])

     useEffect(() => {
    
    const channel = new BroadcastChannel('notification_broadcast_channel');
    channel.onmessage = (event) => {
        toast.warning(`${event.data.notification.title}`,{
            description: event.data.notification.body
        })
    };
  return () => {channel.close()}
}, []);
    useEffect(() =>{
        const messaging = getMessaging(app)
        const unSbcribe = onMessage(messaging,(payload) =>{
            toast.warning(`${payload.notification?.title}`,{
                description: payload.notification?.body
            })
        })
        return () => unSbcribe()
    },[])
  return null
}

export default NotificationListener