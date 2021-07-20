import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

function DotDashPinCharFilled (props) {
  return (
    <Svg
      width={68}
      height={79}
      viewBox='0 0 68 79'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <Path
        d='M2 77h64M28.5 39h11'
        stroke='#0F1114'
        strokeWidth={3}
        strokeLinecap='square'
      />
      <Circle cx={34.5} cy={38.5} r={8.5} fill='#0F1114' />
    </Svg>
  )
}

export default DotDashPinCharFilled
