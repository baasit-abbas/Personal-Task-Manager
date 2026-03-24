import Link from 'next/link'
import React from 'react'
const Links = (props) => {
  return (
    <Link onClick={props.Click} className="flex items-center justify-center h-8 hover:bg-gray-300 transition-all duration-300 w-full rounded-md cursor-pointer" href={`${props.href}`}><li>{props.name}</li></Link>
  )
}

export default Links
