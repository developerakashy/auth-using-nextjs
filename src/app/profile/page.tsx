"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProfilePage(){
    const router = useRouter()
    const [username, setUsername] = useState(null)

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout')
            console.log(data)

            router.push('/login')
        } catch (error:any) {
            console.log(error)
        }
    }

    const getUserDetails = async () => {

        try {
            const { data } = await axios.get('/api/user/authenticated')
            console.log(data)
            setUsername(data?.data?.username)
        } catch (error:any) {
            console.log(error)

        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return(
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl">Profile</h1>
            <p className="mt-2 text-2xl">Profile of user</p>
            <p className="text-2xl text-red-500 p-2 bg-yellow-500 rounded-xl">{username}</p>

            <button className="py-2 px-4 mt-2 cursor-pointer bg-red-500 rounded-xl" onClick={logout}>
                Logout
            </button>
        </div>
    )
}
