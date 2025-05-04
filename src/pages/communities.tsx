import {Link, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";

type Community = {
    id: number,
    name: string,
}

const defaultCommunities: Community[] = [
    {id:1,name:'Reformers'},
    {id:2,name:'Consultations'},
    {id:3,name:'Revenues'},

]

export default function CommunitiesPage() {
    const [communities, setCommunities] = useState<Community[]>([])

    useEffect(() => {
        setCommunities(defaultCommunities)
    },[])

    return (
        <div>
            <div className="h-screen bg-gray-100 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-blue-500">Hello, Tailwind!</h1>
            </div>
            <div>
                {communities.map(community => (
                    <Link key={community.id} to={`/communities/${community.id}`}>
                        {community.name}
                    </Link>
                ))}
            </div>




            <div>
                {<Outlet/>}
            </div>
        </div>
    )
}
