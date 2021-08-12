import React from 'react'

function PasteIcon (props) {
  const size = props.size || 21
  const color = props.color || '#000'
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 21 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7 9.533c-.552 0-1 .409-1 .913 0 .505.448.913 1 .913h7.96c.552 0 1-.409 1-.913s-.448-.913-1-.913H7zM7.04 13.246c-.552 0-1 .409-1 .913s.448.913 1 .913H15c.552 0 1-.409 1-.913s-.448-.913-1-.913H7.04z'
        fill={color}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4 2.229c-1.105 0-2 .818-2 1.826v12.783c0 1.008.895 1.826 2 1.826h14c1.105 0 2-.818 2-1.826V4.055c0-1.008-.895-1.826-2-1.826H4zm2 1.826H4v12.783h14V4.055h-2v.913c0 1.513-1.343 2.74-3 2.74H9c-1.657 0-3-1.227-3-2.74v-.913zm2 0v.913c0 .504.448.913 1 .913h4c.552 0 1-.409 1-.913v-.913H8z'
        fill={color}
      />
    </svg>
  )
}

export default PasteIcon
