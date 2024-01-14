"use client"

import { auth } from '@/auth'
import { LoginQrCodeForm } from '@/components/login-qr-code_form'
import { redirect } from 'next/navigation'
import { BASE_URL } from '@/lib/utils';
import { ServerResult } from '@/lib/types';
import { clearInterval } from 'timers';
import * as Avatar from '@radix-ui/react-avatar';
import { useSession } from 'next-auth/react';

type CheckScanStateResult = {
    state: number
}

export default function SignInPage() {
    const session = useSession();
    // redirect to home if user is already logged in
    if (session?.data?.user) {
        redirect('/')
    }

    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
            <div className='flex flex-row justify-center items-center mb-4'>
                <Avatar.Root className='w-12 h-12 rounded-full truncate'>
                    <Avatar.AvatarImage
                        className='w-full h-full object-cover'
                        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                        alt="Colm Tuite"
                    />
                </Avatar.Root>
                <span className='text-4xl text-slate-950 ml-4 text-justify font-bold leading-[64px]'>
                    天睿 AI
                </span>
            </div>
            <LoginQrCodeForm width={328} height={328} />
        </div>
    )
}
