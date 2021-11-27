import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PendingIcon(props) {
    const size = props.size || 21
    const color = props.color || '#D9B455'
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.338.048C4.668.048.07 4.595.07 10.203s4.597 10.154 10.267 10.154c5.67 0 10.266-4.546 10.266-10.154S16.008.048 10.338.048zm3.73 15.036l-5.253-4.091a1.025 1.025 0 01-.237-.431 1.026 1.026 0 01.197-1.138l3.48-3.977a1.056 1.056 0 011.722.293 1.03 1.03 0 01-.198 1.138l-2.854 3.325 4.7 3.486a1.032 1.032 0 01-.075 1.466 1.057 1.057 0 01-1.482-.07z"
        fill={color}
      />
    </Svg>
  )
}

export default PendingIcon
