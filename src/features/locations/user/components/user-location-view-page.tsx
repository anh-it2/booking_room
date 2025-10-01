'use client'
import { baseUrl } from '@/config/baseUrl';
import { Location } from '@/constants/apiLocation';
import { getApi } from '@/lib/apiFetch';
import { useLoadingState } from '@/store/useLoadingState';
import { useEffect, useState } from 'react';
import UserLocationForm from './user-location-form';


type TLocationViewPageProps = {
  locationId: string;
};

export default function UserLocationViewPage({
  locationId
}: TLocationViewPageProps) {

  const [location, setLocation] = useState<Location>()
  const loading = useLoadingState((state) => state.loading)
  const setLoading = useLoadingState((state) => state.setLoading)

  useEffect(() =>{
    async function fetchLocationById(id: number){
      setLoading(true)
      const res = await getApi(`${baseUrl}/api/locations/${id}`)
      const json = await res.json()
      const data = json.data as Location
      setLocation(data)
      setLoading(false)
    }
    fetchLocationById(Number(locationId))
  },[])

  return <UserLocationForm initialData={location}/>
  
}
