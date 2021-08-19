import * as React from 'react'
import Svg, { Path } from 'react-native-Svg'

function InboundIcon (props) {
  const size = props.size || 21
  const color = props.color || '#000'
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 25 25'
      fill='none'
      xmlns='http://www.w3.org/2000/Svg'
      {...props}
    >
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.054 21.674h4.762a2.38 2.38 0 002.381-2.38V5.008a2.381 2.381 0 00-2.38-2.381h-4.763v2.38h4.762v14.287h-4.762v2.38z'
        fill={color}
      />
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.712 19.752l-1.69-1.677 4.665-4.705H1.803a1.19 1.19 0 110-2.381H12.71L7.971 6.29 9.648 4.6l7.608 7.543-7.544 7.609z'
        fill={color}
      />
    </Svg>
  )
}

export default InboundIcon
