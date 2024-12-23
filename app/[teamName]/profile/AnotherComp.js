

export default function AnotherComp({CrazyComp, crazyCompProps}){

    return(

        <div className="bg-red-500">
            <CrazyComp {...crazyCompProps}/>
        </div>
    )
}