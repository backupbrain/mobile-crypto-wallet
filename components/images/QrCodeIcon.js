import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

function QrCodeIcon (props) {
  const size = props.size || 17
  const color = props.color || '#000'
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.486 4.043H.577V7.77h3.91V4.043zM2.474 0H0v2.358h2.474V0zM9.114.234H6.448v2.538h2.666V.234zM5.153.868H3.82v1.27h1.333V.869zM17 4.529v8.128c0 .308-.065.613-.188.898a2.36 2.36 0 01-.534.76c-.228.217-.5.392-.799.507-.3.119-.617.178-.94.178H6.01V4.53H17z"
        fill={color}
      />
    </Svg>
  )
}

export default QrCodeIcon
