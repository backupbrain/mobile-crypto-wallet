import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

function DotPinFilled (props) {
  const size = props.size || 21
  const color = props.color || '#000'
  return (
    <Svg
      width={size * 0.86}
      height={size}
      viewBox='0 0 68 79'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <Circle cx={34.5} cy={38.5} r={8.5} fill={color} />
    </Svg>
  )
}

export default DotPinFilled
