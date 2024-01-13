"use client"

import React from 'react';
import { ServerResult } from '@/lib/types';
import { BASE_URL, cn } from '@/lib/utils'
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import * as Tabs from '@radix-ui/react-tabs';
import { WechatOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth/types';

type FetchQrCodeResult = {
    ticket: string,
    url: string,
    sceneId: string
};

type CheckScanStateResult = {
    state: number
};

export function LoginQrCodeForm({
    className,
    width,
    height,
    ...props
}: Partial<HTMLImageElement>) {
    const timer = useRef<number>();
    const [qrCode, setQrCode] = useState("");
    const router = useRouter();
    const { update, status } = useSession();

    console.log('status', status);

    useEffect(() => {

        const initQrCode = async () => {

            const response = await fetch(`${BASE_URL}/fetch_qr_code`, {
                method: 'GET'
            })
            const result: ServerResult<FetchQrCodeResult> = await response.json();

            if (result.code == 0) {
                setQrCode(result.data.url);
                const _timer = window.setInterval(async () => {
                    const scanStateResult: ServerResult<CheckScanStateResult> = await (await fetch(`${BASE_URL}/check_scan_state?sceneId=${result.data.sceneId}`)).json();
                    // 扫码成功，跳转首页
                    if (scanStateResult.data.state == 1) {
                        window.clearInterval(timer?.current);
                        router.push('/');
                        update({name: 'AAron'})
                    }
                }, 3000);
                timer.current = _timer;
            }
        };

        initQrCode();

        return () => {
            window.clearInterval(timer.current);
        };
    }, []);

    return (
        <div className='flex-row  justify-center'>
            <Tabs.Root defaultValue='official-account-qr-code'>
                <Tabs.List className='justify-center flex border-b mb-4'>
                    <Tabs.Trigger value='official-account-qr-code' className='flex items-center p-2 space-x-2 border-b-2 border-indigo-500 text-indigo-500'>
                        <WechatOutlined />
                        <span>微信扫码登录</span>
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value='official-account-qr-code'>
                    <Image src={qrCode} width={width} height={height} alt="Picture of the author" className={cn(className)} />
                </Tabs.Content>
            </Tabs.Root>
            {/* 说明 */}
            <div className='text-center text-grey-500 mt-4'>扫码关注公众号登录</div>
        </div>
    );
};