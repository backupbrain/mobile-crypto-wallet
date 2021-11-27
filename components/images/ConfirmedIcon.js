import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ConfirmedIcon(props) {
  const size = props.size || 21
  const color = props.color || '#37B761'
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.267 0C4.597 0 0 4.6 0 10.273s4.596 10.272 10.267 10.272c5.67 0 10.266-4.6 10.266-10.273S15.937 0 10.267 0zm5.024 8.824l-5.25 4.755a1.04 1.04 0 01-.435.236 1.047 1.047 0 01-1.15-.197l-3.232-3.07A1.051 1.051 0 016.67 9.024l2.573 2.443 4.638-4.202a1.05 1.05 0 011.41 1.559z"
        fill="#37B761"
      />
    </Svg>
  )
}

export default ConfirmedIcon
