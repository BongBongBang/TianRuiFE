import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'

export default function IndexPage() {
  console.log('chat/page\n');
  const id = nanoid()

  return <Chat id={id} />
}
