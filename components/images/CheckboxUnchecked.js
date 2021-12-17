import React from 'react'
import Svg, { Path } from 'react-native-svg'

function CheckboxUnchecked (props) {
  const size = props.size || 24
  const color = props.color || '#000'
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'
    >
      <Path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z'
      />
    </Svg>
  )
}

export default CheckboxUnchecked
