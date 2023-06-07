interface userProps {
    name: string;
}

export default function UserItem(props: userProps) {
    return (
        <div className="w-full p-3 border-b-2 border-b-gray-200 bg-slate-100 cursor-pointer">
            <p className="text-black text-lg" >
                {props.name}
            </p>
        </div>
    )
}