
interface acessElementProps {
    label: string,
    placeholder: string,
    id?: string
    value:string
    onChange: (text: string) => void
}

export default function AcessElementForm(props: acessElementProps) {
    return (
        <div className="grid gap-1">
            {props.label && (
                <label
                    htmlFor={props.id}
                    className='text-gray-800'
                >
                    {props.label}
                </label>
            )}
            <input
                type="text"
                id={props.id}
                value={props.value}
                placeholder={props.placeholder}
                onChange={(e) => props.onChange(e.target.value)}
                className='p-2 placeholder-zinc-400 text-gray-900'
            />
        </div>
    )
}