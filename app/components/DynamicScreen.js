

const DynamicScreen = ({children, className=""}) => {

    return(
        <div className={`w-full md:w-5/6 lg:w-5/6 p-3 ${className}`}>
            {children}
        </div>
    )
}

export default DynamicScreen;