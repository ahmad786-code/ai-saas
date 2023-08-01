'use client'

import React, { useState } from 'react'
import axios from 'axios'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

import { useProModal } from '@/hooks/useProModal'
import { tools } from '@/app/(dashboard)/(routes)/dashboard/page'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Check, Zap } from 'lucide-react'
import { Button } from './ui/button'

const ProModal = () => {
    const proModal = useProModal()
    const [loading, setloading] = useState(false)

    const onSubscribe = async() => {
        try {
            setloading(true)
            const response = await axios.get('/api/stripe')
            window.location.href = await response.data.url
        } catch (error) {
            console.log(error, 'Stripe Client Errror');
            
        } finally {
            setloading(false)
        }
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade to Genius
                            <Badge className='uppercase text-sm py-1' variant='premium'>
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className='text-center pt-2 font-medium space-y-2 text-zinc-900'>
                        {tools.map((tool) => (
                            <Card key={tool.label} className='p-5 border-black/5 flex items-center justify-between'>
                                <div className="flex items-center gap-x-4">
                                    <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                                        < tool.icon className={cn("w-6 h-6 ml-2", tool.color)} />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className='w-5 h-5 text-primary' />
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={loading} onClick={onSubscribe} size='lg' variant='premium' className='w-full'>
                        Upgrade
                        <Zap className='h-4 w-4 ml-2 fill-white' />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ProModal