import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function DotDashPinCharEmpty (props) {
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
      <Path
        d='M2 77h64M28.5 39h11'
        stroke={color}
        strokeWidth={3}
        strokeLinecap='square'
      />
    </Svg>
  )
}

export default DotDashPinCharEmpty
