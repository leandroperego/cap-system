
// If sizeTransformRow is null, it will be a column
export default function RowForm( { children, containerProps } ){

    let classString = `w-full min-w-[200px] flex flex-wrap gap-6 ${containerProps?.className}`;

    return (
        <div className={classString}>
            {children}
        </div>
    );
}