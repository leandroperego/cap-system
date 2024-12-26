

export default function CardInput({ children, isInvalided, error, containerProps }) {

    let classString = `min-w-[200px] max-w-full grow ${containerProps?.className}`

    return (
        <section className={classString}>
            {children}
            {
                isInvalided &&
                <p className="ml-1 mt-1 text-sm text-red-500">{error}</p>
            }
        </section>
    );
}