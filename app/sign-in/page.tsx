import { auth } from '@/auth'
// import { LoginButton } from '@/components/login-button'
import { LoginQrCode } from '@/components/login-qr-code'
import { redirect } from 'next/navigation'
import { BASE_URL } from '@/lib/utils';
import { ServerResult } from '@/lib/types';

type QrCodeResult = {
    url: string,
    sceneId: number,
    ticket: string
}

async function fetchQrCode(): Promise<ServerResult<QrCodeResult>> {
    const response = await fetch(`${BASE_URL}/fetch_qr_qode`, {
        method: 'GET',
        cache: 'no-cache'
      });
      const result = response.json();
      return result as Promise<ServerResult<QrCodeResult>>;
}

export default async function SignInPage() {
  const session = await auth()
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }
  
  const result = await fetchQrCode();
  console.log('Request qr code endpoint result \n', result);

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <LoginQrCode className="w-328" qrCode={result.data.url}/>
    </div>
  )
}
