'use client'
import { Location } from '@/constants/apiLocation';
import { useEffect, useState } from 'react';

import { baseUrl } from '@/config/baseUrl';
import { getApi } from '@/lib/apiFetch';
import LocationForm from './location-form';


type TLocationViewPageProps = {
  locationId: string;
};

export default function LocationViewPage({
  locationId
}: TLocationViewPageProps) {

  const [location, setLocation] = useState<Location>()
  const [pageTitle, setPageTitle] = useState<string>('')
  const [confirmBtn, setConfirmBtn] = useState<string>('')

  useEffect(() =>{
    async function fetchLocationById(id: number){
      const res = await getApi(`${baseUrl}/api/locations/${id}`)
      const json = await res.json()
      const data = json.data as Location
      setLocation(data)
      setPageTitle('Edit Location')
      setConfirmBtn('Confirm Edit')
    }
    if(locationId !== 'new'){
      fetchLocationById(Number(locationId))
    }else{
      setPageTitle('Create Location')
      setConfirmBtn('Add Location')
    }
  },[])

  return <LocationForm initialData={location} pageTitle={pageTitle} confirmBtn={confirmBtn} id={Number(locationId)}/>
  
}
