

const DynamicScreen = ({children, className=""}) => {

    return(
        <div className={`w-full md:w-[85%] lg:w-[85%] p-6 ${className}`}>
            {children}
        </div>
    )
}

export default DynamicScreen;