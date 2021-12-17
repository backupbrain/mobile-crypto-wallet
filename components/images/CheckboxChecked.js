import React from 'react'
import Svg, { Path } from 'react-native-svg'

function CheckboxChecked (props) {
  const size = props.size || 24
  const checkColor = props.checkColor || '#fff'
  const lineColor = props.lineColor || '#000'
  const fillColor = props.fillColor || '#000'
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 25'
    >
      <Path
        fill={fillColor}
        stroke={lineColor}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M19 21.835H5a2 2 0 01-2-2v-14a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z'
      />
      <Path
        stroke={checkColor}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M8.712 13.4l2.193 2.194 4.787-4.788'
      />
    </Svg>
  )
}

export default CheckboxChecked
