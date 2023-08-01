"use client"
import React, { useState } from 'react'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import { useForm } from 'react-hook-form'
import {  Music } from 'lucide-react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from './constant'
import Heading from '@/components/Heading'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { useProModal } from '@/hooks/useProModal'
import { toast } from 'react-hot-toast'
 
 

const MusicPage = () => {
   const proModal = useProModal()
    const [music, setMusic] = useState<string>()
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined)
             
             const response = await axios.post('/api/music', values)

             setMusic(response.data.audio)
             form.reset()
        } catch (error: any) {
            if(error?.response?.status === 403) {
                proModal.onOpen()
            } else {
                toast.error('Something went wrong')
            }
            console.log(error);
        } finally {
            router.refresh()
        }
        
    }
    return (
        <div>
            <Heading title='Music Generation' description='Turn your prompt into music. ' icon={Music}
                iconColor='text-emerald-500'
                bgColor='bg-emerald-500/10'
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField
                                control={form.control}
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>
                                        <FormControl className='p-0 m-0'>
                                            <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' placeholder='Piano solo' disabled={isLoading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading} type="submit">Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader/>
                        </div>
                    )}
                    {!music  && !isLoading &&(
                        <Empty label='No music generated.'/>
                    )}
                   {music && (
                    <audio controls className='w-full mt-8'>
                        <source src={music}/>
                    </audio>
                   )}
                </div>
            </div>
        </div>
    )
}

export default MusicPage