import { useEffect, useState } from 'react';

import mycryptofolio from "../../assets/mycryptofolio.png"

export default function Loading({ children, ...props }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    return (<>
        {isLoading ? <div className='flex items-center h-full w-full dark:bg-black bg-white'>
            <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div className="w-28 h-28 border-8 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-black rounded-full">
                    <img src={mycryptofolio} alt="Loading" width={250} height={150} className="brightness-0 invert-0 dark:brightness-100 dark:invert-100 animate-pulse" />
                </div>
            </div>
        </div> : children
        }
    </>)
}