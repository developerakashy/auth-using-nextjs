import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ''
        const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET!)
        console.log(decodedToken)
        return decodedToken._id

    } catch (error:any) {
        console.log(error)
        throw new Error(error?.message)
    }
}
