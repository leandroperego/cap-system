

export default function ListItem( { children } ){
    return (
        <li className="flex flex-col justify-between gap-x-6">
            {children}
        </li>
    );
}