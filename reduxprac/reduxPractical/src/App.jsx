import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement,increment } from './redux/counterSlice'

const Counter = () => {
    const count=useSelector((state)=>state.counter.value)
    const dispatch=useDispatch()
     const handledec=()=>{
     // if(count>0){
        dispatch(decrement())
    //  }
    }
  return (
    <div>
        <h1>{count}</h1>

        <button onClick={()=>dispatch(increment())}>inc</button>
        <button onClick={()=>dispatch(handledec())}>dec</button>
    </div>
  )
}

export default Counter

