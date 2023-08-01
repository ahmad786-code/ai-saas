'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { ZapIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

type SubscriptionButtonProps = {
    isPro: boolean
};

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ isPro = false }) => {
    const [loading, setloading] = useState(false)
    const onClick = async () => {
        try {
            setloading(true)
            const response = await axios.get('/api/stripe')
            window.location.href = await response.data.url


        } catch (error) {
            toast.error('Something went wrong')
            console.log(error, 'Billing error');

        } finally {
            setloading(true)
        }
    }

    return (
        <Button disabled={loading} variant={isPro ? 'default' : 'premium'} onClick={onClick}>
            {isPro ? 'Mange Subsription' : 'Upgrade'}
            {!isPro && <ZapIcon className='w-4 h-4 ml-2 fill-white' />}
        </Button>
    )
}
export default SubscriptionButton;