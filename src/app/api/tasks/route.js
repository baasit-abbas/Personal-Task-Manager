import { authOptions } from "@/app/lib/auth";
import { ConnectToDatabase } from "@/app/lib/db";
import Tasks from "@/app/models/tasks";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req){
    await ConnectToDatabase()
    const session = await getServerSession(authOptions)
    if (!session){
        return NextResponse.json({error:'User is not authentiacted'},{status:401})
    }
    const tasks = await Tasks.find({user:session.id})
    return NextResponse.json(tasks)
}


export async function POST(req){
    await ConnectToDatabase()
    const session = await getServerSession(authOptions)
    if (!session){
        return NextResponse.json({error:'User is not authentiacted'},{status:401})
    }
    const task = await req.json()
    try{
        console.log(task)
        await Tasks.create({user:session.id,...task})
        return NextResponse.json({message:'Created task successfully'},{status:200})
    }
    catch(error){
        return NextResponse.json({error:'Failed to create task'},{status:500})
    }
}

export async function PUT(req){
    await ConnectToDatabase()
    const session = await getServerSession(authOptions)
    if (!session){
        return NextResponse.json({error:'User is not authentiacted'},{status:401})
    }
    const data = await req.json()
    const { id, ...rest } = data
    try{
        await Tasks.updateOne({_id:id , user:session.id},{$set:{...rest}})
        return NextResponse.json({message:'Updated task successfully'},{status:200})
    }
    catch(error){
        return NextResponse.json({error:'Failed to update task'},{status:500})
    }
}

export async function DELETE(req){
    await ConnectToDatabase()
    const data = await req.json()
    const session = await getServerSession(authOptions)
    if (!session){
        return NextResponse.json({error:'User is not authentiacted'},{status:401})
    }
    try{
        await Tasks.deleteOne({_id:data.id,user:session.id})
        return NextResponse.json({message:'Deleted task successfully'},{status:200})
    }
    catch(error){
        return NextResponse.json({error:'Failed to delete task'},{status:500})
    }
}