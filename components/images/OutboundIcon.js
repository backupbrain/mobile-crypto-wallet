import * as React from 'react'
import Svg, { Path } from 'react-native-Svg'

function OutboundIcon (props) {
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
        d='M8.333 21.428H3.571a2.38 2.38 0 01-2.38-2.38V4.761A2.38 2.38 0 013.57 2.38h4.762v2.38H3.571v14.286h4.762v2.381z'
        fill={color}
      />
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.052 19.914l-1.69-1.677 4.665-4.705H7.143a1.19 1.19 0 110-2.381H18.05l-4.738-4.699 1.676-1.69 7.608 7.544-7.544 7.608z'
        fill={color}
      />
    </Svg>
  )
}

export default OutboundIcon
