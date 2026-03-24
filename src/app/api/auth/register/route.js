import User from "@/app/models/user";
import { ConnectToDatabase } from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function POST(req) {
    try{
        const data = await req.json()
        const { username, email, password } = data

        if (!username || !email || !password) {
            return NextResponse.json({ error: 'Username, email and password are required' }, { status: 400 })
        }

        await ConnectToDatabase()

        const exist = await User.findOne({$or:
            [
                { username },
                { email }
            ]
        })

        if (!exist){
            await User.create({ username, email, password })
            return NextResponse.json({message:'User Registered successfully'},{status:201})
        }
        else{
            return NextResponse.json({error:'This Username or Email alreay exists'},{status:400})
        }
    }
    catch(error){
        return NextResponse.json({error:'Failed to Register'},{status:500})
    }

}