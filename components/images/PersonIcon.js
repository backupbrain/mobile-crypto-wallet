import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function PersonIcon (props) {
  const size = props.size || 21
  const color = props.color || '#000'
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 21 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15 5a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0zM15 13a1 1 0 00-1-1H8a1 1 0 00-1 1v6H5v-6a3 3 0 013-3h6a3 3 0 013 3v6h-2v-6z'
        fill={color}
      />
    </Svg>
  )
}

export default PersonIcon
