export default function Profile({params}){
    return(
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl">Profile</h1>
            <p className="mt-2 text-2xl">Profile of user <span className="p-2 bg-orange-500 rounded-lg ml-2">{params.id}</span></p>
        </div>
    )
}
