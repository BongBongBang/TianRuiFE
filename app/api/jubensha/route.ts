import { NextResponse } from "next/server"
import OpenAI from 'openai'
import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
  
export const runtime = 'edge'

export async function POST(req: Request) {
    const json = await req.json()
    const { idGt, idLt } = json
    console.log('start request', Date.now());
    const result = (await fetch(`http://go.1jtec.com/fetch_comment?idGt=${idGt}&idLt=${idLt}`, {method: 'GET'}));
    const array = await result.json();
    console.log('end request', Date.now());

    // for (let i = 0; i < array.length; i++) {

    //     const item = array[i]

    //     const messages : any = [{role:'user', content: item.EvaluateTextContent}];
    //     const res = await openai.chat.completions.create({
    //         model: 'gpt-3.5-turbo',
    //         messages,
    //         temperature: 0.7,
    //         stream: false
    //     })

    //     const convertedContent = res['choices'][0]['message']['content']
    //     const body : any = [{
    //         "scriptEvaluateId": item.ScriptEvaluateId,
    //         "scriptId": item.ScriptId,
    //         "evaluateTextContent": convertedContent
    //     }]
    //     const result = await fetch(`http://go.1jtec.com/save_converts`, {
    //         method: 'POST',
    //         body: JSON.stringify(body)
    //     });
    //     if (result.ok) {
    //         await kv.set('latest', item.ScriptEvaluateId)
    //     }
    //     console.log('Success ', item.ScriptEvaluateId); 
    // }

    return NextResponse.json({});
}
