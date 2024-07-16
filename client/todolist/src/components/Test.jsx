import React, { useEffect, useState } from 'react'

const Test = () => {

    const [check,setCheck]=useState({
        value:""
    })

   const handleClick=()=>{
    alert("hii")
   }

  return (
    <>
       <button onClick={handleClick} className='h-10 m-2 w-20 border border-black'>Click ME</button>
       <button onClick={handleClick} className='h-10 m-2 w-20 border border-black'>Click ME1</button>
    </>
  )
}

export default Test
