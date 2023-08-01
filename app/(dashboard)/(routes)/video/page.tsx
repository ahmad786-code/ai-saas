"use client"
import React, { useState } from 'react'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import { useForm } from 'react-hook-form'
import {   Video } from 'lucide-react'
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
 
 

const VideoPage = () => {
    const proModal = useProModal()
    const [video, setVideo] = useState<string>()
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
            setVideo(undefined)
             
             const response = await axios.post('/api/video', values)

             setVideo(response.data[0])
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
            <Heading title='Video Generation' description='Turn your prompt into video. ' icon={Video}
                iconColor='text-orange-700'
                bgColor='bg-orange-700/10'
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
                                            <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' placeholder='Clown fish swimming around a coral reef' disabled={isLoading} {...field} />
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
                    {!video  && !isLoading &&(
                        <Empty label='No video generated.'/>
                    )}
                   {video && (
                    <video controls className='w-full aspect-video rounded-lg border bg-black mt-8'>
                        <source src={video}/>
                    </video>
                   )}
                </div>
            </div>
        </div>
    )
}

export default VideoPage