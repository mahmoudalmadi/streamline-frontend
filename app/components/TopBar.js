import StreamlineLogo from '../../public/streamlineLogo.svg'

const TopBar = () => {

    return (
        <div className='flex justify-between items-center'>
            <button>
            <StreamlineLogo className="w-[130px] h-[50px]"/>
            </button>

            <div className='flex flex-row space-x-4 items-center'>
                <button>
                <div className=' text-streamlineBlue text-[14px] font-semibold'>
                    Log In
                </div>
                </button>

                <button>
                <div 
                className=
                'text-white bg-streamlineBlue px-2 py-2 text-[14px] rounded-xl font-semibold'
                >
                    Sign Up
                </div>
                </button>
            </div>        
        </div>
    )

}


export default TopBar