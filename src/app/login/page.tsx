"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"

export default function LoginPage(){
    const router = useRouter()
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const login = async () => {
        try {
            setLoading(true)

            const { data } = await axios.post('/api/user/login', user)
            console.log(data)
            router.push('/profile')

        } catch (error: any) {
            console.log('Something went wrong')
            console.log('Login error: ', error)

        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if(user?.username !== "" && user?.password !== ""){
            setButtonDisabled(false)

        } else {
            setButtonDisabled(true)

        }

    }, [user])

    return(
        <div className="h-screen flex flex-col justify-center items-center text-lg">
            <h1 className="text-xl">{loading ? 'Processing' : 'Login'}</h1>
            <div className="flex flex-col items-center mt-4">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    className="bg-white p-2 rounded-lg text-black outline-orange-600 focus:outline-3"
                    type="text"
                    value={user?.username}
                    placeholder="username"
                    onChange={(e) => setUser((prev) => ({...prev, username: e.target.value}))}
                />
            </div>
            <div className="flex flex-col items-center mt-4">
                <label htmlFor="password">password</label>
                <input
                    id="password"
                    className="bg-white p-2 rounded-lg text-black outline-orange-600 focus:outline-3"
                    type="password"
                    value={user?.password}
                    placeholder="password"
                    onChange={(e) => setUser((prev) => ({...prev, password: e.target.value}))}
                />
            </div>
            <button
                className="py-2 px-5 cursor-pointer bg-blue-500 my-4 rounded-lg"
                onClick={login}
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "No Login" : "Login"}
            </button>

            <Link href='/signup'>Visit signup page</Link>
        </div>
    )
}
