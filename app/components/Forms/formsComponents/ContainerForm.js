

export default function ContainerForm( { title, titleProps, containerProps, children } ){

    let classContainerString = `flex flex-col gap-6 mb-10 ${containerProps?.className}`;
    let classLabelString = `text-blue-gray-700 ${titleProps?.className}`

    return (
        <section className={classContainerString}>
            <h3 className={classLabelString}>{title}</h3>
            {children}
        </section>
    );
}