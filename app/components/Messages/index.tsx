
interface messageProps {
    sender: 'you' | 'other'
    Name?: string
    phone?: string
    text:string
}

export default function Message(props: messageProps) {
    return (
        <div className={`w-1/2 ${props.sender === "other" ? ('bg-slate-100') : ('bg-green-100')} rounded-md p-2`}>
            <div className="flex items-center justify-between">
                <p className="text-slate-900 text-xs">
                    {props.sender === 'other' ? (props.phone) : ('')}
                </p>
                <p className="text-slate-900 text-xs">
                    {props.sender === 'other' ? (props.Name) : ('Você')}
                </p>
            </div>
            <div className="text-sm text-zinc-400 mt-2">
                {props.text}
            </div>
        </div>
    )
}