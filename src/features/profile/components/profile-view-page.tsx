'use client'
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { baseUrl } from "@/config/baseUrl";
import { Profile } from "@/constants/apiProfile";
import { getApi } from "@/lib/apiFetch";
import { useLoadingState } from "@/store/useLoadingState";
import { useEffect, useState } from "react";
import UserProfile from "./user-profile-form";

export default function ProfileViewPage() {

  const [profile, setProfile] = useState<Profile>()
  const loading = useLoadingState((state) => state.loading)
  const setLoading = useLoadingState((state) => state.setLoading)
  useEffect(() =>{
    const fetchProfile = async () =>{
      setLoading(true)
      const res = await getApi(`${baseUrl}/api/profile/my`)
      const json = await res.json()
      setProfile(json.data)
      setLoading(false)
    }
    fetchProfile()
  },[])

  return (
    <>
      {loading? <DataTableSkeleton columnCount={2} rowCount={4} filterCount={1} />
      :<UserProfile initData={profile}/>}
    </>
)
}
