'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { buttonVariants } from './button'
import { toast } from 'sonner'
import { IconPlus } from '@tabler/icons-react'

const AddNewButton = ({text}:{text: string}) => {
  return (
    <div className={cn(buttonVariants(),'text-xs md:text-sm cursor-pointer')} onClick={() => toast.warning(`${text}`)}>
       <IconPlus className='mr-2 h-4 w-4' />  Add New
    </div>
  )
}

export default AddNewButton