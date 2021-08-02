import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

function ScanQrCodeIcon (props) {
  const size = props.size || 21
  const color = props.color || '#000'
  return (
    <Svg
      height={size}
      width={size}
      xmlns='http://www.w3.org/2000/svg'
      data-name='Layer 1'
      viewBox='0 0 100 100'
      {...props}
    >
      <Path d='M28 46h12a6 6 0 006-6V28a6 6 0 00-6-6H28a6 6 0 00-6 6v12a6 6 0 006 6zm2-16h8v8h-8zM22 72a6 6 0 006 6h12a6 6 0 006-6V60a6 6 0 00-6-6H28a6 6 0 00-6 6zm8-10h8v8h-8zM72 46a6 6 0 006-6V28a6 6 0 00-6-6H60a6 6 0 00-6 6v12a6 6 0 006 6zM62 30h8v8h-8zM62 62h8v8h-8zM70 54h8v8h-8zM54 54h8v8h-8zM70 70h8v8h-8zM54 70h8v8h-8z' fill={color} />
    </Svg>
  )
}

export default ScanQrCodeIcon
