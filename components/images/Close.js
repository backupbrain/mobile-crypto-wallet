import * as React from 'react'

function Close (props) {
  const size = props.size || 100
  const color = props.color || '#000'
  return (
    <svg
      height={size}
      width={size}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='-949 951 100 100'
      {...props}
    >
      <switch>
        <g>
          <path d='M-851.5 964.3l-10.8-10.8-36.7 36.7-36.7-36.7-10.8 10.8 36.7 36.7-36.7 36.7 10.8 10.8 36.7-36.7 36.7 36.7 10.8-10.8-36.7-36.7z' fill={color} />
        </g>
      </switch>
    </svg>
  )
}

export default Close
