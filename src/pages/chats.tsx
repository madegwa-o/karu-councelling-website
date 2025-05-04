import {useEffect, useState} from "react";

type Chat = {
    id: string;
    title: string;
    text: string;
    sender: User;
    receiver: User;
}

type User = {
    id: number;
    username: string;
}

const myChats:  Chat[] = [
    {id:"1",title:"news",text:"Hey",sender:{id: 1, username:"Oscar"},receiver:{id: 2,username: "ford"}},
    {id:"2",title:"leisure",text:"sup",sender:{id:1,username: "Becky"},receiver:{id:2,username:"kyle"}}

]

export default function ChatsPage() {
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() =>{
        setChats(myChats);
    },[])

    return (
        <div style={{ height: '100%' }}>
            <ul>
                {chats.map(chat => (
                    <li key={chat.id}>{chat.sender.username}</li>
                ))}
            </ul>

        </div>
    )
}
