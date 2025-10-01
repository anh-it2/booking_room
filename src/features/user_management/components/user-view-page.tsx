'use client'
import { baseUrl } from '@/config/baseUrl';
import { User } from '@/constants/apiUsers';
import { getApi } from '@/lib/apiFetch';
import { useEffect, useState } from 'react';
import UserForm from './user-form';

type TUserViewPageProps = {
  userId: string;
};

export default function UserViewPage({
  userId
}: TUserViewPageProps) {

  const [user, setUser] = useState<User>()
  const [pageTitle, setPageTitle] = useState<string>('')
  const [confirmBtn, setConfirmBtn] = useState<string>('')

  useEffect(() =>{
    async function fetchUserById(id: number){
      const res = await getApi(`${baseUrl}/api/admin/users/${id}`)
      const json = await res.json()
      const data = json.data as User
      setUser(data)
      setPageTitle('Edit User')
      setConfirmBtn('Confirm Edit')
    }
    if(userId !== 'new'){
      fetchUserById(Number(userId))
    }else{
      setPageTitle('Create New User')
      setConfirmBtn('Add User')
    }
  },[])

  return <UserForm initialData={user} pageTitle={pageTitle} confirmBtn={confirmBtn} id={Number(userId)}/>
  
}
