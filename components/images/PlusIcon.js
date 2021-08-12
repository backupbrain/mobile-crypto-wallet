import * as React from 'react'

function PlusIcon (props) {
  const size = props.size || 21
  const color = props.color || '#000'
  return (
    <svg
      height={size}
      width={size}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 100'
      {...props}
    >
      <path
        d='M46 14v32H14v8h32v32h8V54h32v-8H54V14z'
        style={{
          textIndent: 0,
          textTransform: 'none',
          blockProgression: 'tb'
        }}
        overflow='visible'
        color={color}
      />
    </svg>
  )
}

export default PlusIcon
