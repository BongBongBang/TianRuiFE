import { NextResponse } from "next/server"
import OpenAI from 'openai'
import { kv } from '@vercel/kv'

const openai = new OpenAI({
    apiKey: "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"
  })
  
export const runtime = 'edge'

export async function POST(req: Request) {
    const json = await req.json()
    const { idGt, idLt } = json
    console.log('start request', Date.now());
    fetch(`http://go.1jtec.com/fetch_comment?idGt=${idGt}&idLt=${idLt}`, {method: 'GET'})
    .then(response => response.json())
    .then(async array => {
        console.log('end request', Date.now());

        for (let i = 0; i < array.length; i++) {
    
            const item = array[i]
            console.log('converting', Date.now(), item.ScriptEvaluateId);
            const messages : any = [{role:'user', content: item.EvaluateTextContent}];
            const res = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages,
                temperature: 0.7,
                stream: false
            })
            console.log('converted', Date.now(), item.ScriptEvaluateId);
            const convertedContent = res['choices'][0]['message']['content']
            const body : any = [{
                "scriptEvaluateId": item.ScriptEvaluateId,
                "scriptId": item.ScriptId,
                "evaluateTextContent": convertedContent
            }]
            const result = fetch(`http://go.1jtec.com/save_converts`, {
                method: 'POST',
                body: JSON.stringify(body)
            });
            // if (result.ok) {
            //     await kv.set('latest', item.ScriptEvaluateId)
            // }
            console.log('success ', item.ScriptEvaluateId); 
        }
    })
    .catch(error => {
        console.log(error)
    })
    

    return NextResponse.json({});
}
