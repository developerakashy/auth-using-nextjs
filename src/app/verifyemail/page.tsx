"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function VerifyEmailPage(){
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyEmail = async () => {
        try {
            const { data } = await axios.post('/api/user/verifyemail', {token})
            console.log(data)
            setVerified(true)

        } catch (error:any) {
            console.log(error)
            setError(true)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || '')
    }, [])


    useEffect(() => {
        if(token.length > 0){
            verifyEmail()
        }
    }, [token])

    return(
        <div className="h-screen flex flex-col items-center justify-center">
            <p className="text-4xl">Email Verification page</p>
            <p className="text-2xl">{token ? token : 'no token'}</p>

            {verified &&
                <div>
                    <p className="text-xl">Email verified</p>
                    <Link href='/login'>
                        Visit Login
                    </Link>
                </div>
            }

            {error &&
                <div>
                    <p className="text-xl">Error</p>
                </div>
            }

        </div>
    )
}
