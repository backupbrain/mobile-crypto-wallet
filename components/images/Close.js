import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function Close (props) {
  const size = props.size || 100
  const color = props.color || '#000'
  return (
    <Svg
      height={size}
      width={size}
      xmlns='http://www.w3.org/2000/Svg'
      viewBox='-949 951 100 100'
      {...props}
    >
      <Path d='M-851.5 964.3l-10.8-10.8-36.7 36.7-36.7-36.7-10.8 10.8 36.7 36.7-36.7 36.7 10.8 10.8 36.7-36.7 36.7 36.7 10.8-10.8-36.7-36.7z' fill={color} />
    </Svg>
  )
}

export default Close
