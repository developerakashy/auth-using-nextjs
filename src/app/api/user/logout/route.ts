import { NextResponse } from "next/server";

export async function GET(){
    try {

        const response = NextResponse.json({
            message: 'Logout successfull',
            success: true
        })

        response.cookies.delete('token')

        return response

    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error?.message}, {status: 400})
    }
}
