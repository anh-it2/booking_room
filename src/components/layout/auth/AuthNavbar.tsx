'use client'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import Link from 'next/link'
import { useState } from 'react'
import styles from './Header.module.css'
import NavMenu from './NavMenu/NavMenu'
import ProductionMenuDetail from './NavMenu/ProductionMenu/ProductionMenuDetail'
import ResourcesMenuDetail from './NavMenu/ResourcesMenu/ResourcesMenuDetail'
import SolutionsMenuDetail from './NavMenu/SolutionsMenu/SolutionsMenuDetail'
const AuthNavbar = ({path, link}:{
  path: string,
  link: string
}) => {

  const [active, setActive] = useState('') 
  
  const handleMouseEnter = (menuName: string) =>{
      setActive(menuName)
  }
  
  const handleMouseLeave = () =>{
      setActive('')
  }

  return (
    <div onMouseLeave={handleMouseLeave}>
      <div className={styles.navbar}>
          <Avatar className='flex gap-2 items-center'>
            <AvatarImage src='/facebook-logo.png' width={50} height={50} alt='logo'/>
            <div className={styles.name}>Calendy</div>
          </Avatar>
          <NavMenu active={active} onMouseEnter={handleMouseEnter}/>
          <Link className={cn(buttonVariants(),'bg-blue-500 hover:bg-blue-600')} href={link}>{path}</Link>
      </div>
      {active === 'production' && <ProductionMenuDetail active={active} onMouseEnter={handleMouseEnter}/>}
      {active ==='resources' && <ResourcesMenuDetail active={active} onMouseEnter={handleMouseEnter} />} 
      {active === 'solutions' && <SolutionsMenuDetail active={active} onMouseEnter={handleMouseEnter} />}
    </div>
  )
}

export default AuthNavbar