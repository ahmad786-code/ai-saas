"use client"
import React, { useState } from 'react'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import { useForm } from 'react-hook-form'
import {   Code } from 'lucide-react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from './constant'
import Heading from '@/components/Heading'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChatCompletionRequestMessage } from 'openai'
import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/UserAvatar'
import BotAvatar from '@/components/BotAvatar'
import ReactMarkDown from 'react-markdown'
import { useProModal } from '@/hooks/useProModal'
import { toast } from 'react-hot-toast'
const CodePage = () => {
    const proModal = useProModal()
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
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
             const userMessage: ChatCompletionRequestMessage = {
                role: 'user',
                content: values.prompt
             }

             const newMessages = [...messages, userMessage]
             
             const response = await axios.post('/api/code', {messages: newMessages})

             setMessages((current) => [...current, userMessage, response.data])

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
            <Heading title='Code Generation' description='Generate code using descraptive text. ' icon={Code}
                iconColor='text-green-700'
                bgColor='bg-green-700/10'
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
                                            <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' placeholder='Simple toggle button using react hooks' disabled={isLoading} {...field} />
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
                    {messages.length === 0 && !isLoading &&(
                        <Empty label='No conversation started.'/>
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div key={message.name}
                            className={cn('p-8 w-full flex items-start gap-x-8 rounded-lg',
                            message.role === 'user' ? 'bg-white bg-black/10' : 'bg-muted')}
                            >
                                {message.role === 'user' ? (
                                    <UserAvatar/>
                                ) : (<BotAvatar/>)}
                                 <ReactMarkDown
                                 components={{
                                    pre: ({node, ...props}) => (
                                        <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                                            <pre {...props}/>
                                        </div>
                                    ),
                                    code: ({node, ...props}) => (
                                        <code className='bg-black/10 rounded-lg p-1' {...props}/>
                                    )
                                 }}
                                 className='text-sm leading-7 overflow-hidden'
                                 >
                                {message.content || ''}
                                 </ReactMarkDown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodePage