import StreamlineLogo from '../../public/streamlineLogo.svg'

const TopBar = () => {

    return (
        <div className='flex justify-between items-center'>
            <StreamlineLogo />

            <div className='flex flex-row space-x-4 items-center'>
                <div className=' text-streamlineBlue font-semibold'
                >
                    Log In
                </div>

                <div 
                className=
                'text-white bg-streamlineBlue px-2 py-2 rounded-xl font-semibold'
                >
                    Sign Up
                </div>
            </div>        
        </div>
    )

}


export default TopBar