import React, { ReactNode } from 'react'

type Props = {
    className?: string,
    children?: ReactNode
}

const Card = (props: Props) => {
  return (
    <div className={' bg-white border border-gray-200 m-2 rounded-sm shadow-md ' + props.className}>
        {props.children}
    </div>
  )
}

export default Card