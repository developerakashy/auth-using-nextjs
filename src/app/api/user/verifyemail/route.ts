import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()

        const {token} = reqBody
        console.log(reqBody)

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: {$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({
                error: 'Token expired, used or Invalid'
            }, {status: 400})
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message: 'Email verified successfully',
            success: true
        })

    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:400})
    }
}
