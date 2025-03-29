import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()

        const { username, password } = reqBody
        console.log(reqBody)

        const user = await User.findOne({username})

        if(!user){
            return NextResponse.json({error: 'user does not exist'}, {status: 400})
        }

        const matchPassword = await bcrypt.compare(password, user?.password)

        if(!matchPassword){
            return NextResponse.json({error: 'password invalid'}, {status: 400})
        }

        const tokenData = {
            _id: user?._id,
            username: user?.username,
            email: user?.email
        }

        const token = jwt.sign(tokenData,
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d"
            }
        )

        const response = NextResponse.json({
            message: 'Login successfull',
            success: true,
            data: user
        })

        response.cookies.set('token', token,  {
            httpOnly: true
        })

        return response


    } catch (error: any) {
        console.log(error)

        return NextResponse.json({error: error.message}, {status: 400})
    }
}
