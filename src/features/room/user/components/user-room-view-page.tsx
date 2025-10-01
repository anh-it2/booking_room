'use client'
import { baseUrl } from '@/config/baseUrl';
import { Room } from '@/constants/apiRoom';
import { getApi } from '@/lib/apiFetch';
import { useLoadingState } from '@/store/useLoadingState';
import { useEffect, useState } from 'react';
import UserRoomForm from './user-room-form';


type TRoomViewPageProps = {
  roomId: string;
};

export default function UserRoomViewPage({
  roomId
}: TRoomViewPageProps) {

  const [room, setRoom] = useState<Room>()
  const loading = useLoadingState((state) => state.loading)
  const setLoading = useLoadingState((state) => state.setLoading)
  const [pageTitle, setPageTitle] = useState<string>('')
  const [confirmBtn, setConfirmBtn] = useState<string>('')

  useEffect(() =>{
    async function fetchLocationById(id: number){
      setLoading(true)
      const res = await getApi(`${baseUrl}/api/rooms/${id}`)
      const json = await res.json()
      const data = json.data as Room
      setRoom(data)
      setLoading(false)
    }
    if(roomId !== 'new') {
      fetchLocationById(Number(roomId))
      setPageTitle('Create New Booking')
      setConfirmBtn('Confirm Add')
    }
    
  },[])

  return <UserRoomForm initialData={room} />
  
}
