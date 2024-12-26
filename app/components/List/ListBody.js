

export default function ListBody( { children } ) {
    return (
        <ul role="list" className="mt-4 divide-y divide-gray-100">
            {children}
        </ul>
    );
}