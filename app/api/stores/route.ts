import prismasdb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
  
  try {
    const {userId} = auth()
    const body = await req.json()
    const {name} = body
    console.log(userId, name)

    if (!userId) {
      return new NextResponse("Authorized", {status: 401})
    }

    if (!name) {
      return new NextResponse("Name is required", {status: 400})
    }

    const store = await prismasdb.store.create({ 
      data: {
        name, 
        userId
      }
    })

    return NextResponse.json(store)
  } catch (error) {
    console.error('[STORE-POST]', error)
    return new NextResponse("Internal error", {status: 500})
  }
}
