import * as React from 'react'
import Svg, { Path } from 'react-native-Svg'

function HamburgerMenuIcon (props) {
  const size = props.size || 21
  const color = props.color || '#000'
  return (
    <Svg
      height={size}
      width={size}
      xmlns='http://www.w3.org/2000/Svg'
      preserveAspectRatio='none'
      viewBox='0 0 100 100'
      {...props}
    >
      <Path d='M83.5 53.5v-7h-67v7h67m0 30v-7h-67v7h67m0-60v-7h-67v7h67z' fill={color} />
    </Svg>
  )
}

export default HamburgerMenuIcon
