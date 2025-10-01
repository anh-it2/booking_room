'use client'
import { Metadata } from 'next';
import { useEffect, useState } from 'react';
import styles from './auth.module.css';
import Card1 from './Card1';
import Card2 from './Card2';
import UserAuthForm from './user-auth-form';
export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {

  const [active, setActive] = useState(0)

    useEffect(() =>{
        const internal = setInterval(() =>{
            setActive((prev) => (prev === 0 ? 1: 0))
        }, 4000)
        return () => clearInterval(internal)
    },[])

  return (  
   <div className={styles.container}>
      <div className={styles.left}>
        <UserAuthForm mode='signin'/>
      </div>

      <div className={styles.right }>
        <Card1 active={active}/>
        <Card2 active={active} />
      </div>
   </div>
  );
}
