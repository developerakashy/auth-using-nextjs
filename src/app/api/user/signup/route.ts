import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"
import bcrypt from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, username, password} = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error: 'User already exist'}, {status: 400})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            username,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            data: savedUser
        })


    } catch (error: any) {
        console.log('SignUp error: ', error)
        return NextResponse.json({error: error?.message}, {status: 400})
    }
}
