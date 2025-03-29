import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()
export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request)
        console.log(userId)
        const user = await User.findById(userId).select('-password')

        return NextResponse.json({
            message: 'user found successfully',
            data: user,
            success: true
        }, {status: 200})

    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error?.message},{status: 400})
    }
}
