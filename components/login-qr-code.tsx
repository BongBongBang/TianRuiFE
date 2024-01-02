import { cn } from '@/lib/utils'

export function LoginQrCode({
    className,
    qrCode,
    ...props
}: Partial<HTMLImageElement> & {qrCode: string}) {

    return (
        <img src={qrCode} className={cn(className)}/>
    );
};