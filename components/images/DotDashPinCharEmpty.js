import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function DotDashPinCharEmpty (props) {
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
    </Svg>
  )
}

export default DotDashPinCharEmpty
