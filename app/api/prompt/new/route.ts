import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
// import { NextApiRequest } from 'next';

export const POST  = async (req: any) => {
    const {userId, prompt, tag} = await req.json();
    // const {userId, prompt, tag} = await req.body;

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId, 
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201});
    } catch (error) {
        return new Response("Failer to create a new prompt", {status: 500})
    }

}