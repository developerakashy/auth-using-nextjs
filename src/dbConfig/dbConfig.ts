import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('MongoDB Connected Successfully')
        })

        connection.on('error', (err) => {
            console.log('MonogDb connection error: ', err)
            process.exit()
        })

    } catch (error: any) {
        console.log('Something went wrong')
        console.log('DB Connect Error: ', error)
    }
}
