import React, { useState } from 'react'

export const Counter = () => {

    const [count, setCount] = useState<number>(10)

    const increaseBy = (value: number) => {
        //setCount(count + value)
        //setCount((current) => current + value)
        //setCount(Math.max(count + value, 0)) // No negativos

        //no negativos usando un if

        //if (count + value >= 0)
        //    setCount(count + value) // No negativos

        setCount(count + value >= 0 ? count + value : 0) // No negativos

    }

    return (
        <>
            <h3 className='text-2xl'>
                Contador: <small className='font-bold'>{count}</small>
            </h3>
            <div>
                <button
                    onClick={() => increaseBy(1)}

                    className='p-2 bg-blue-500 rounded-xl w-10 mx-2 hover:bg-blue-700'>
                    +1
                </button>

                <button
                    onClick={() => increaseBy(-1)}
                    className='p-2 bg-blue-500 rounded-xl w-10 mx-2 hover:bg-blue-700'>
                    -1
                </button>
            </div>
        </>
    )
}
