'use client'

import React,{FC, useEffect, useState} from 'react';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Sidebar from './Sidebar';

 
interface Props {
    apiLimitCount: number
    isPro : boolean
}

const MobileSidebar:FC<Props>  = ({apiLimitCount = 0, isPro = false}) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [ ])
    
    if(!mounted) {
        return null
    }

   
    
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant='ghost' size='icon' className='md:hidden'>
                    <MenuIcon />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='p-0'>
                <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
            </SheetContent>
        </Sheet>
    )
}
export default MobileSidebar;