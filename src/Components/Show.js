"use client"
import React from 'react'


const Show = (props) => {
  return (
    <div className="flex gap-3 items-center font-bold text-green-500 text-lg cursor-pointer">
          <label className="cursor-pointer" htmlFor={props.id}>{props.name}</label>
          <input
           className="cursor-pointer"
            id={props.id}
            name="Show"
            checked={props.selected === props.id}
            onChange={() => props.func(props.id)}
            value={props.id}
            type="radio"
          />
        </div>
  )
}

export default Show
