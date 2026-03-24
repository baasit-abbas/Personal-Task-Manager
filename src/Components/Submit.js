import React from 'react'

const Submit = (props) => {
  return (
    <button className="w-full py-3 border-none bg-green-500 rounded-full text-white font-bold text-lg cursor-pointer hover:bg-green-400 transition-all duration-300 select-none">{props.name || 'Submit'}</button>
  )
}

export default Submit
