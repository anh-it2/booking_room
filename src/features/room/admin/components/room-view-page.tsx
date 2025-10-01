'use client';
import { baseUrl } from '@/config/baseUrl';
import { Room } from '@/constants/apiRoom';
import { getApi } from '@/lib/apiFetch';
import { useLoadingState } from '@/store/useLoadingState';
import { useEffect, useState } from 'react';
import RoomForm from './room-form';

type TRoomViewPageProps = {
  roomId: string;
};

export default function RoomViewPage({ roomId }: TRoomViewPageProps) {
  const [room, setRoom] = useState<Room>();
  const loading = useLoadingState((state) => state.loading);
  const setLoading = useLoadingState((state) => state.setLoading);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [confirmBtn, setConfirmBtn] = useState<string>('');

  useEffect(() => {
    async function fetchRoomById(id: number) {
      setLoading(true);
      const res = await getApi(`${baseUrl}/api/rooms/${id}`);
      const json = await res.json();
      const data = json.data as Room;
      setRoom(data);
      setLoading(false);
    }
    if (roomId !== 'new') {
      fetchRoomById(Number(roomId));
      setPageTitle('Edit Meeting Room');
      setConfirmBtn('Confirm Edit');
    } else {
      setPageTitle('Add New Meeting Room');
      setConfirmBtn('Confirm Add');
    }
  }, []);

  return (
    <RoomForm
      initialData={room}
      pageTitle={pageTitle}
      confirmBtn={confirmBtn}
    />
  );
}
